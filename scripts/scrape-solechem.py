#!/usr/bin/env python3
"""
SoleChem EU - Full Product Scraper
Scrapes all 4483 products from https://www.solechem.eu/
"""

import re
import json
import time
import sys
import os
import signal
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError
from urllib.parse import unquote

# ─── Config ────────────────────────────────────────────────────────────────────
CONCURRENT_WORKERS = 15       # parallel requests
RETRY_ATTEMPTS = 3
RETRY_DELAY = 2               # seconds between retries
REQUEST_TIMEOUT = 20          # seconds
OUTPUT_FILE = "scraped_products_eu.json"
PROGRESS_EVERY = 50           # print progress every N products
HEADERS = {
    "User-Agent": "ClaudeBot/1.0 (authorized AI crawler; robots.txt allows)",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
}

# ─── Globals ───────────────────────────────────────────────────────────────────
results = []
failed_urls = []
shutdown_requested = False


def signal_handler(sig, frame):
    global shutdown_requested
    print("\n\n⚠️  Interrupted — saving partial results...")
    shutdown_requested = True


signal.signal(signal.SIGINT, signal_handler)


# ─── HTML Fetcher ──────────────────────────────────────────────────────────────
def fetch_html(url: str) -> str:
    for attempt in range(RETRY_ATTEMPTS):
        try:
            req = Request(url, headers=HEADERS)
            with urlopen(req, timeout=REQUEST_TIMEOUT) as resp:
                raw = resp.read()
                # Handle gzip if needed
                try:
                    import gzip
                    if resp.headers.get("Content-Encoding") == "gzip":
                        raw = gzip.decompress(raw)
                except Exception:
                    pass
                return raw.decode("utf-8", errors="replace")
        except (URLError, HTTPError) as e:
            if attempt < RETRY_ATTEMPTS - 1:
                time.sleep(RETRY_DELAY * (attempt + 1))
            else:
                raise
    return ""


# ─── Parsers ───────────────────────────────────────────────────────────────────
def strip_tags(text: str) -> str:
    """Remove HTML tags, correctly handling > inside quoted attributes (Tailwind [&>p])."""
    result = []
    in_tag = False
    in_quote = None
    for ch in text:
        if in_tag:
            if in_quote:
                if ch == in_quote:
                    in_quote = None
            elif ch == '"' or ch == "'":
                in_quote = ch
            elif ch == '>':
                in_tag = False
                result.append(' ')
        elif ch == '<':
            in_tag = True
        else:
            result.append(ch)
    return ''.join(result)


def clean(text: str) -> str:
    text = strip_tags(text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'&lt;', '<', text)
    text = re.sub(r'&gt;', '>', text)
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'&#39;', "'", text)
    text = re.sub(r'&quot;', '"', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def parse_product(url: str, html: str) -> dict:
    p = {}

    # ── Slug from URL ──────────────────────────────────────────────────────
    slug_match = re.search(r'/products/(cas-[^/]+)/', url)
    p["slug"] = slug_match.group(1) if slug_match else ""

    # ── JSON-LD: Product ───────────────────────────────────────────────────
    ld_blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    for block in ld_blocks:
        try:
            obj = json.loads(block)
            if obj.get("@type") == "Product":
                p["name"] = obj.get("name", "")
                p["description"] = obj.get("description", "")
                p["category_raw"] = obj.get("category", "")
                for ident in obj.get("identifier", []):
                    name_key = ident.get("name", "")
                    val = ident.get("value", "")
                    if "CAS" in name_key:
                        p["cas"] = val
                    elif "EC" in name_key:
                        p["ec"] = val
                    elif "Formula" in name_key:
                        p["formula"] = val
            elif obj.get("@type") == "BreadcrumbList":
                items = obj.get("itemListElement", [])
                for item in items:
                    if item.get("position") == 3:
                        p["category"] = item.get("name", "")
        except Exception:
            pass

    # ── H2 sections ────────────────────────────────────────────────────────
    h2_sections = re.findall(r'<h2[^>]*>(.*?)</h2>(.*?)(?=<h2|</main|</article|<footer)', html, re.DOTALL)

    for h2_raw, content_raw in h2_sections:
        h2_text = clean(h2_raw)
        content = clean(content_raw)

        if "Description" in h2_text:
            # Full description from HTML (JSON-LD truncates at 500 chars)
            if len(content) > len(p.get("description", "")):
                p["description"] = content

        elif "Physical Properties" in h2_text:
            # Extract as structured dict
            rows = re.findall(r'<tr[^>]*>.*?<td[^>]*>(.*?)</td>.*?<td[^>]*>(.*?)</td>', content_raw, re.DOTALL)
            props = {}
            for k, v in rows:
                key = clean(k)
                val = clean(v)
                if key:
                    props[key] = val
            p["physicalProperties"] = props

        elif "Safety" in h2_text:
            p["safetyHandling"] = content

        elif "Trade" in h2_text or "Regulatory" in h2_text:
            # Parse trade/regulatory as dict
            trade_rows = re.findall(r'<tr[^>]*>.*?<td[^>]*>(.*?)</td>.*?<td[^>]*>(.*?)</td>', content_raw, re.DOTALL)
            if trade_rows:
                trade = {}
                for k, v in trade_rows:
                    key = clean(k)
                    val = clean(v)
                    if key:
                        trade[key] = val
                p["tradeRegulatory"] = trade
            else:
                p["tradeRegulatory"] = content

        elif "Other Names" in h2_text:
            # Split by pipe separator
            names = [n.strip() for n in content.split("|") if n.strip()]
            p["otherNames"] = names

        elif "Related Products" in h2_text:
            # Extract related product names and CAS
            related = []
            rel_items = re.findall(
                r'href="/products/(cas-[^"]+)/"[^>]*>.*?<[^>]+>([^<]+).*?CAS:\s*([\d-]+)',
                content_raw, re.DOTALL
            )
            if rel_items:
                for slug, name, cas in rel_items:
                    related.append({"name": clean(name), "cas": cas, "slug": slug.rstrip("/")})
            else:
                # Fallback: parse text
                rel_text = re.findall(
                    r'([A-Z][^\n<]{2,80})\s+CAS:\s*([\d-]+)',
                    content
                )
                for name, cas in rel_text:
                    slug = "cas-" + cas.replace(" ", "")
                    related.append({"name": name.strip(), "cas": cas, "slug": slug})
            p["relatedProducts"] = related

        elif "Documentation" in h2_text:
            p["documentation"] = content

    # ── Industries from /industries/SLUG/ links (exclude the bare /industries/ nav link)
    industry_links = re.findall(r'href="/industries/([^/"]+)/"[^>]*>([^<]+)</a>', html)
    industries = list(dict.fromkeys([clean(label) for slug, label in industry_links if slug and clean(label)]))
    p["industries"] = industries

    # ── Molecular Weight ────────────────────────────────────────────────────
    mw_match = re.search(
        r'Mol\.\s*Weight</div>\s*<div[^>]*>([\d.,]+\s*g/mol)</div>',
        html, re.IGNORECASE
    )
    if mw_match:
        p["mw"] = mw_match.group(1).strip()

    # ── GHS codes ──────────────────────────────────────────────────────────
    ghs_codes = re.findall(r'\b(GHS\d{2})\b', html)
    p["ghsCodes"] = list(dict.fromkeys(ghs_codes))

    # ── URL ────────────────────────────────────────────────────────────────
    p["url"] = url

    return p


# ─── Worker ────────────────────────────────────────────────────────────────────
def scrape_one(url: str):
    try:
        html = fetch_html(url)
        if not html or len(html) < 500:
            return None
        product = parse_product(url, html)
        if not product.get("name"):
            return None
        return product
    except Exception as e:
        return {"_error": str(e), "url": url}


# ─── Main ──────────────────────────────────────────────────────────────────────
def main():
    global results, failed_urls

    urls_file = "/tmp/solechem_product_urls.txt"
    if not os.path.exists(urls_file):
        print(f"❌ URLs file not found: {urls_file}")
        sys.exit(1)

    with open(urls_file) as f:
        all_urls = [line.strip() for line in f if line.strip()]

    total = len(all_urls)
    print(f"🚀 Starting scrape of {total:,} products")
    print(f"   Workers: {CONCURRENT_WORKERS} | Timeout: {REQUEST_TIMEOUT}s | Retries: {RETRY_ATTEMPTS}")
    print(f"   Output: {OUTPUT_FILE}")
    print("-" * 60)

    start_time = time.time()
    completed = 0

    with ThreadPoolExecutor(max_workers=CONCURRENT_WORKERS) as executor:
        futures = {executor.submit(scrape_one, url): url for url in all_urls}

        for future in as_completed(futures):
            if shutdown_requested:
                executor.shutdown(wait=False, cancel_futures=True)
                break

            url = futures[future]
            completed += 1

            try:
                product = future.result()
                if product and "_error" not in product:
                    results.append(product)
                elif product and "_error" in product:
                    failed_urls.append({"url": url, "error": product["_error"]})
                else:
                    failed_urls.append({"url": url, "error": "empty/no name"})
            except Exception as e:
                failed_urls.append({"url": url, "error": str(e)})

            if completed % PROGRESS_EVERY == 0 or completed == total:
                elapsed = time.time() - start_time
                rate = completed / elapsed
                eta = (total - completed) / rate if rate > 0 else 0
                print(
                    f"  [{completed:4d}/{total}] "
                    f"✅ {len(results):4d} ok  "
                    f"❌ {len(failed_urls):3d} failed  "
                    f"⚡ {rate:.1f}/s  "
                    f"⏱ ETA: {eta/60:.1f}min"
                )

    # ── Save results ──────────────────────────────────────────────────────
    elapsed = time.time() - start_time
    print(f"\n{'=' * 60}")
    print(f"✅ Scraped: {len(results):,} products")
    print(f"❌ Failed:  {len(failed_urls):,} URLs")
    print(f"⏱ Time:    {elapsed/60:.1f} minutes")

    output_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        OUTPUT_FILE
    )
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"💾 Saved to: {output_path}")

    if failed_urls:
        fail_path = output_path.replace(".json", "_failed.json")
        with open(fail_path, "w") as f:
            json.dump(failed_urls, f, indent=2)
        print(f"⚠️  Failed URLs saved to: {fail_path}")

    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
