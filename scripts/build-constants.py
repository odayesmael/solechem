#!/usr/bin/env python3
"""
SoleChem EU — Build constants.ts from scraped_products_eu.json
Normalizes categories, industries, adds IDs/slugs, and writes src/constants.ts
"""

import json
import re
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ─── Standard categories (kept exactly as on solechem.eu, minus garbage) ──────
STANDARD_CATEGORIES = [
    "Agrochemicals",
    "Alcohols & Glycols",
    "Alkalis & Bases",
    "Amines",
    "Amino Acids & Peptides",
    "Catalysts & Catalyst Precursors",
    "Chelating Agents",
    "Flame Retardants",
    "Flavors & Fragrances",
    "Heterocyclic Compounds",
    "Inorganic Acids",
    "Monomers & Building Blocks",
    "Nucleosides & Nucleotides",
    "Oils, Fats & Waxes",
    "Organic Acids",
    "Organometallic Compounds",
    "Oxidizers & Peroxides",
    "Pharmaceutical Intermediates",
    "Pigments & Colorants",
    "Polymers & Resins",
    "Salts & Minerals",
    "Silicones & Silicates",
    "Solvents",
    "Surfactants",
    "Sweeteners & Food Additives",
    "UV Absorbers & Stabilizers",
    "Vitamins & Nutrients",
    "Specialty Chemicals",
]

# ─── Standard industries (from solechem.eu, "Cleaning & Degreasing" merged) ──
STANDARD_INDUSTRIES = [
    "Aerospace & Defense",
    "Agriculture & Feed",
    "Automotive",
    "Biotechnology & Life Sciences",
    "Building & Construction",
    "Coatings, Adhesives, Sealants & Elastomers",
    "Electronics",
    "Food & Nutrition",
    "Home Care & Industrial Cleaning",
    "Lubricants & Metalworking",
    "Mining & Metals",
    "Oil, Gas & Energy",
    "Personal Care & Cosmetics",
    "Pharmaceuticals & Healthcare",
    "Plastics & Polymers",
    "Printing & Packaging",
    "Pulp & Paper",
    "Rubber & Tire",
    "Textile, Leather & Paper",
    "Water Treatment",
]

INDUSTRY_MAP = {
    "Cleaning & Degreasing": "Home Care & Industrial Cleaning",
}

# Category fallback: if scraped category is not in standard list, try to infer
CATEGORY_KEYWORD_MAP = {
    "alcohol": "Alcohols & Glycols",
    "glycol": "Alcohols & Glycols",
    "glycerol": "Alcohols & Glycols",
    "amine": "Amines",
    "amino acid": "Amino Acids & Peptides",
    "peptide": "Amino Acids & Peptides",
    "catalyst": "Catalysts & Catalyst Precursors",
    "chelat": "Chelating Agents",
    "flame retard": "Flame Retardants",
    "flavor": "Flavors & Fragrances",
    "fragrance": "Flavors & Fragrances",
    "aroma": "Flavors & Fragrances",
    "terpene": "Flavors & Fragrances",
    "heterocycl": "Heterocyclic Compounds",
    "acid": "Organic Acids",
    "inorganic acid": "Inorganic Acids",
    "hydrochloric": "Inorganic Acids",
    "sulfuric": "Inorganic Acids",
    "nitric": "Inorganic Acids",
    "monomer": "Monomers & Building Blocks",
    "nucleoside": "Nucleosides & Nucleotides",
    "nucleotide": "Nucleosides & Nucleotides",
    "oil": "Oils, Fats & Waxes",
    "fat": "Oils, Fats & Waxes",
    "wax": "Oils, Fats & Waxes",
    "fatty acid": "Organic Acids",
    "organometallic": "Organometallic Compounds",
    "peroxide": "Oxidizers & Peroxides",
    "oxidiz": "Oxidizers & Peroxides",
    "pigment": "Pigments & Colorants",
    "colorant": "Pigments & Colorants",
    "dye": "Pigments & Colorants",
    "polymer": "Polymers & Resins",
    "resin": "Polymers & Resins",
    "silicone": "Silicones & Silicates",
    "silicate": "Silicones & Silicates",
    "solvent": "Solvents",
    "surfactant": "Surfactants",
    "detergent": "Surfactants",
    "sweetener": "Sweeteners & Food Additives",
    "food additive": "Sweeteners & Food Additives",
    "sugar": "Sweeteners & Food Additives",
    "uv absorber": "UV Absorbers & Stabilizers",
    "stabilizer": "UV Absorbers & Stabilizers",
    "vitamin": "Vitamins & Nutrients",
    "nutrient": "Vitamins & Nutrients",
    "mineral": "Salts & Minerals",
    "salt": "Salts & Minerals",
    "sodium": "Salts & Minerals",
    "potassium": "Salts & Minerals",
    "calcium": "Salts & Minerals",
    "pharmaceutical": "Pharmaceutical Intermediates",
    "agrochemic": "Agrochemicals",
    "pesticide": "Agrochemicals",
    "herbicide": "Agrochemicals",
    "alkali": "Alkalis & Bases",
    "hydroxide": "Alkalis & Bases",
    "carbonate": "Alkalis & Bases",
}

UNSPLASH_IMAGES = [
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1628863353691-0071c8c1eeaa?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578496780896-7259c4808de4?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1548407260-da850faa41e3?auto=format&fit=crop&q=80",
]


def make_slug(name: str, cas: str) -> str:
    if cas:
        return "cas-" + cas.replace(" ", "")
    s = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    return s[:60]


def normalize_category(cat: str, name: str, desc: str) -> str:
    if cat in STANDARD_CATEGORIES:
        return cat
    # Try keyword match on category string first
    cat_l = cat.lower()
    for kw, mapped in CATEGORY_KEYWORD_MAP.items():
        if kw in cat_l:
            return mapped
    # Try keyword match on product name + description
    text = (name + " " + desc).lower()
    for kw, mapped in CATEGORY_KEYWORD_MAP.items():
        if kw in text:
            return mapped
    return "Specialty Chemicals"


def normalize_industry(ind: str) -> str:
    return INDUSTRY_MAP.get(ind, ind if ind in STANDARD_INDUSTRIES else None)


def phys_dict_to_text(props: dict) -> str:
    if not props:
        return ""
    return "; ".join(f"{k}: {v}" for k, v in props.items())


def trade_to_text(trade) -> str:
    if isinstance(trade, dict):
        return "; ".join(f"{k}: {v}" for k, v in trade.items())
    return str(trade) if trade else ""


def extract_hs_code(trade) -> str:
    if isinstance(trade, dict):
        return trade.get("HS Code", "")
    return ""


def main():
    input_path = os.path.join(ROOT, "scraped_products_eu.json")
    print(f"📖 Loading {input_path}...")
    raw_products = json.load(open(input_path, encoding="utf-8"))
    print(f"   {len(raw_products):,} products loaded")

    enriched = []
    skipped = 0
    cat_fixes = 0

    for idx, p in enumerate(raw_products, 1):
        name = (p.get("name") or "").strip()
        cas = (p.get("cas") or "").strip()
        if not name:
            skipped += 1
            continue

        # Category
        raw_cat = p.get("category") or p.get("category_raw") or ""
        desc = p.get("description") or ""
        cat = normalize_category(raw_cat, name, desc)
        if cat != raw_cat:
            cat_fixes += 1

        # Industries
        raw_inds = p.get("industries") or []
        industries = []
        for ind in raw_inds:
            norm = normalize_industry(ind)
            if norm and norm not in industries:
                industries.append(norm)
        if not industries:
            industries = ["Specialty Chemicals"]

        # Physical properties
        phys_raw = p.get("physicalProperties")
        if isinstance(phys_raw, dict):
            phys_text = phys_dict_to_text(phys_raw)
        else:
            phys_text = str(phys_raw) if phys_raw else ""

        # Trade & regulatory
        trade_text = trade_to_text(p.get("tradeRegulatory"))
        hs_code = extract_hs_code(p.get("tradeRegulatory"))

        # Other names
        other_names = p.get("otherNames") or []
        if isinstance(other_names, list):
            other_names_str = " | ".join(other_names)
        else:
            other_names_str = str(other_names)

        # Related products → similarProducts slugs (cas-XXXXX format)
        related = p.get("relatedProducts") or []
        related_slugs = []
        for r in related:
            if isinstance(r, dict) and r.get("cas"):
                related_slugs.append("cas-" + r["cas"].strip())
            elif isinstance(r, dict) and r.get("slug"):
                related_slugs.append(r["slug"].rstrip("/"))

        # Slug
        slug = make_slug(name, cas)

        # Image (cycle through placeholders)
        image_url = UNSPLASH_IMAGES[idx % len(UNSPLASH_IMAGES)]

        product = {
            "id": str(idx),
            "name": name,
            "slug": slug,
            "cas": cas,
            "ec": (p.get("ec") or "").strip(),
            "formula": (p.get("formula") or "").strip(),
            "mw": (p.get("mw") or "").strip(),
            "category": cat,
            "industry": industries,
            "grade": "Standard",
            "moq": "Contact for details",
            "description": desc,
            "physicalProperties": phys_text,
            "safetyHandling": (p.get("safetyHandling") or "").strip(),
            "tradeRegulatory": trade_text,
            "otherNames": other_names_str,
            "compliance": ["REACH"],
            "packing": ["Contact for details"],
            "leadTime": "Contact for details",
            "imageUrl": image_url,
            "applications": [],
            "ghsCodes": p.get("ghsCodes") or [],
            "hsCode": hs_code,
            "similarProducts": related_slugs,
            "url": p.get("url") or "",
        }
        enriched.append(product)

    print(f"\n✅ Enriched: {len(enriched):,} products")
    print(f"⚠️  Skipped:  {skipped} (no name)")
    print(f"🔄 Category fixes: {cat_fixes}")

    # ── Stats ─────────────────────────────────────────────────────────────────
    all_cats = sorted(set(p["category"] for p in enriched))
    all_inds = sorted(set(i for p in enriched for i in p["industry"]))
    print(f"\n📊 Categories ({len(all_cats)}):")
    for c in all_cats:
        cnt = sum(1 for p in enriched if p["category"] == c)
        print(f"   {c}: {cnt}")

    print(f"\n🏭 Industries ({len(all_inds)}):")
    for i in all_inds:
        cnt = sum(1 for p in enriched if i in p["industry"])
        print(f"   {i}: {cnt}")

    # ── Save JSON backup ──────────────────────────────────────────────────────
    data_dir = os.path.join(ROOT, "src", "data")
    os.makedirs(data_dir, exist_ok=True)

    products_json = os.path.join(data_dir, "products.json")
    with open(products_json, "w", encoding="utf-8") as f:
        json.dump(enriched, f, ensure_ascii=False, indent=2)
    print(f"\n💾 Saved products.json ({os.path.getsize(products_json)//1024} KB)")

    cats_json = os.path.join(data_dir, "categories.json")
    with open(cats_json, "w") as f:
        json.dump(all_cats, f, ensure_ascii=False, indent=2)

    inds_json = os.path.join(data_dir, "industries.json")
    with open(inds_json, "w") as f:
        json.dump(all_inds, f, ensure_ascii=False, indent=2)

    # ── Build constants.ts ────────────────────────────────────────────────────
    industries_data = [
        {
            "id": str(i + 1),
            "name": ind,
            "slug": re.sub(r'[^a-z0-9]+', '-', ind.lower()).strip('-'),
            "description": f"Chemical solutions for the {ind} sector.",
            "imageUrl": UNSPLASH_IMAGES[i % len(UNSPLASH_IMAGES)],
        }
        for i, ind in enumerate(all_inds)
    ]

    categories_data = [
        {
            "id": str(i + 1),
            "name": cat,
            "slug": re.sub(r'[^a-z0-9]+', '-', cat.lower()).strip('-'),
            "count": sum(1 for p in enriched if p["category"] == cat),
        }
        for i, cat in enumerate(all_cats)
    ]

    constants_path = os.path.join(ROOT, "src", "constants.ts")
    print(f"🔧 Writing {constants_path}...")
    with open(constants_path, "w", encoding="utf-8") as f:
        f.write("export const PRODUCTS: any[] = ")
        f.write(json.dumps(enriched, ensure_ascii=False, indent=2))
        f.write(";\n\nexport const INDUSTRIES: any[] = ")
        f.write(json.dumps(industries_data, ensure_ascii=False, indent=2))
        f.write(";\n\nexport const CATEGORIES: any[] = ")
        f.write(json.dumps(categories_data, ensure_ascii=False, indent=2))
        f.write(";\n")

    size_kb = os.path.getsize(constants_path) // 1024
    print(f"✅ constants.ts written ({size_kb:,} KB, {len(enriched):,} products)")
    print(f"\n🎉 Done! Run: npm run dev")


if __name__ == "__main__":
    main()
