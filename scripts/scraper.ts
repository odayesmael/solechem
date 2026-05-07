import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://www.solechem.eu';
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data');
const PRODUCTS_FILE = path.join(OUTPUT_DIR, 'products.json');
const CATEGORIES_FILE = path.join(OUTPUT_DIR, 'categories.json');
const INDUSTRIES_FILE = path.join(OUTPUT_DIR, 'industries.json');

interface Product {
  id: string;
  name: string;
  slug: string;
  cas?: string;
  ec?: string;
  formula?: string;
  mw?: string;
  category: string;
  industry: string[];
  grade?: string;
  moq?: string;
  description: string;
  applications?: string[];
  physicalProperties?: string;
  safetyHandling?: string;
  tradeRegulatory?: string;
  otherNames?: string;
  compliance?: string[];
  packing?: string[];
  leadTime?: string;
  imageUrl?: string;
  similarProducts?: string[];
  url: string;
  [key: string]: any;
}

class SolechemScraper {
  private products: Product[] = [];
  private categories: Set<string> = new Set();
  private industries: Set<string> = new Set();
  private processedUrls: Set<string> = new Set();
  private failedUrls: string[] = [];
  private headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  };

  async delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchPage(url: string, retries = 3): Promise<string | null> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: this.headers,
          timeout: 10000,
        });
        if (response.ok) {
          return await response.text();
        }
      } catch (error) {
        console.log(`  Retry ${i + 1}/${retries} for ${url}`);
        if (i < retries - 1) {
          await this.delay(1000 * (i + 1));
        }
      }
    }
    this.failedUrls.push(url);
    return null;
  }

  parseProductList(html: string): string[] {
    const productLinks: string[] = [];
    const linkRegex = /href="([^"]*\/product\/[^"]+)"/g;
    let match;

    while ((match = linkRegex.exec(html)) !== null) {
      const link = match[1];
      if (!link.includes('product/') || productLinks.includes(link)) continue;
      productLinks.push(link);
    }

    return productLinks;
  }

  extractText(html: string, selector: string): string {
    const regex = new RegExp(`<[^>]*class="[^"]*${selector}[^"]*"[^>]*>([^<]*)<`, 's');
    const match = regex.exec(html);
    return match ? match[1].trim() : '';
  }

  parseProductDetails(html: string, url: string): Product | null {
    try {
      // Extract name
      const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
      const name = nameMatch ? nameMatch[1].trim() : '';
      if (!name) return null;

      // Extract key properties
      const casMatch = html.match(/CAS[:\s]+([0-9\-]+)/i);
      const ecMatch = html.match(/EC[:\s]+([0-9\-]+)/i);
      const formulaMatch = html.match(/Formula[:\s]+([^<\n]+)/i);
      const mwMatch = html.match(/(?:Molecular Weight|MW)[:\s]+([0-9.]+)/i);

      // Extract category and industry from structured data or content
      let category = this.extractCategory(html, name);
      let industry = this.extractIndustry(html, name);

      // Extract sections
      const description = this.extractSection(html, 'description') || this.extractSection(html, 'overview') || '';
      const physicalProperties = this.extractSection(html, 'physical') || '';
      const safetyHandling = this.extractSection(html, 'safety') || '';
      const tradeRegulatory = this.extractSection(html, 'regulatory|trade') || '';

      // Extract other details
      const otherNames = this.extractOtherNames(html);
      const compliance = this.extractCompliance(html);
      const packing = this.extractPacking(html);
      const leadTime = this.extractLeadTime(html);
      const imageUrl = this.extractImageUrl(html);
      const similarProducts = this.extractSimilarProducts(html);

      const slug = name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      const product: Product = {
        id: String(this.products.length + 1),
        name,
        slug,
        cas: casMatch ? casMatch[1].trim() : undefined,
        ec: ecMatch ? ecMatch[1].trim() : undefined,
        formula: formulaMatch ? formulaMatch[1].trim() : undefined,
        mw: mwMatch ? mwMatch[1].trim() : undefined,
        category: category || 'Other',
        industry: Array.isArray(industry) ? industry : [industry || 'General'],
        grade: this.extractGrade(html) || 'Standard',
        moq: 'Contact for details',
        description: description.substring(0, 500) || `${name} - Industrial Chemical`,
        applications: [],
        physicalProperties: physicalProperties.substring(0, 500) || '',
        safetyHandling: safetyHandling.substring(0, 500) || '',
        tradeRegulatory: tradeRegulatory.substring(0, 500) || '',
        otherNames: otherNames || '',
        compliance: compliance.length > 0 ? compliance : ['REACH'],
        packing: packing.length > 0 ? packing : ['Contact for details'],
        leadTime: leadTime || 'Contact for details',
        imageUrl: imageUrl || `https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80&w=800`,
        similarProducts: similarProducts || [],
        url,
      };

      this.categories.add(product.category);
      product.industry.forEach(ind => this.industries.add(ind));

      return product;
    } catch (error) {
      console.error(`Error parsing product from ${url}:`, error);
      return null;
    }
  }

  private extractSection(html: string, sectionNames: string): string {
    const names = sectionNames.split('|');
    for (const name of names) {
      const regex = new RegExp(
        `<(?:h2|h3|div)[^>]*>\\s*${name}[^<]*<\\/(?:h2|h3|div)>\\s*<(?:p|div)[^>]*>([^<]+)<\\/(?:p|div)>`,
        'is'
      );
      const match = regex.exec(html);
      if (match) return match[1].trim().substring(0, 500);
    }
    return '';
  }

  private extractCategory(html: string, name: string): string {
    const categories = [
      'Agrochemicals', 'Alcohols & Glycols', 'Alkalis & Bases', 'Amines',
      'Amino Acids & Peptides', 'Catalysts & Catalyst Precursors', 'Chelating Agents',
      'Flame Retardants', 'Flavors & Fragrances', 'Heterocyclic Compounds',
      'Inorganic Acids', 'Monomers & Building Blocks', 'Nucleosides & Nucleotides',
      'Oils, Fats & Waxes', 'Organic Acids', 'Organometallic Compounds',
      'Oxidizers & Peroxides', 'Pharmaceutical Intermediates', 'Pigments & Colorants',
      'Polymers & Resins', 'Salts & Minerals', 'Silicones & Silicates', 'Solvents',
      'Surfactants', 'Sweeteners & Food Additives', 'UV Absorbers & Stabilizers',
      'Vitamins & Nutrients',
    ];

    const lowerName = name.toLowerCase();
    for (const cat of categories) {
      if (lowerName.includes(cat.toLowerCase()) || html.toLowerCase().includes(cat.toLowerCase())) {
        return cat;
      }
    }

    // Default categorization based on keywords
    if (lowerName.includes('alcohol') || lowerName.includes('glycol')) return 'Alcohols & Glycols';
    if (lowerName.includes('acid')) return 'Organic Acids';
    if (lowerName.includes('base') || lowerName.includes('hydroxide')) return 'Alkalis & Bases';
    if (lowerName.includes('amine')) return 'Amines';
    if (lowerName.includes('acid') && lowerName.includes('inorganic')) return 'Inorganic Acids';
    if (lowerName.includes('solvent')) return 'Solvents';
    if (lowerName.includes('pigment') || lowerName.includes('dye')) return 'Pigments & Colorants';
    if (lowerName.includes('resin') || lowerName.includes('polymer')) return 'Polymers & Resins';
    if (lowerName.includes('salt') || lowerName.includes('mineral')) return 'Salts & Minerals';

    return 'Monomers & Building Blocks';
  }

  private extractIndustry(html: string, name: string): string[] {
    const industries = [
      'Agriculture', 'Automotive', 'Cosmetics & Personal Care', 'Electronics',
      'Food & Beverage', 'Healthcare & Pharmaceuticals', 'Metal Treatment',
      'Mining & Minerals', 'Oil & Gas', 'Paints & Coatings', 'Plastics & Polymers',
      'Textiles, Leather & Paper', 'Water Treatment', 'Manufacturing',
    ];

    const found: string[] = [];
    const combined = `${name} ${html}`.toLowerCase();

    for (const industry of industries) {
      if (combined.includes(industry.toLowerCase())) {
        found.push(industry);
      }
    }

    if (found.length === 0) {
      // Default industries based on product type
      if (name.toLowerCase().includes('textile') || name.toLowerCase().includes('leather')) {
        found.push('Textiles, Leather & Paper');
      } else {
        found.push('Manufacturing');
      }
    }

    return found;
  }

  private extractOtherNames(html: string): string {
    const match = html.match(/(?:Also known as|Other names?)[:\s]+([^<\n]+)/i);
    return match ? match[1].trim() : '';
  }

  private extractCompliance(html: string): string[] {
    const compliances: string[] = [];
    if (html.includes('REACH')) compliances.push('REACH');
    if (html.includes('RoHS')) compliances.push('RoHS');
    if (html.includes('TSCA')) compliances.push('TSCA');
    if (html.includes('CLP')) compliances.push('CLP');
    return compliances;
  }

  private extractPacking(html: string): string[] {
    const packings: string[] = [];
    const packingMatch = html.match(/Packing[:\s]+([^<\n]+)/i);
    if (packingMatch) {
      packings.push(packingMatch[1].trim());
    }
    return packings;
  }

  private extractLeadTime(html: string): string {
    const match = html.match(/Lead time[:\s]+([^<\n]+)/i);
    return match ? match[1].trim() : 'Contact for details';
  }

  private extractGrade(html: string): string {
    if (html.includes('technical')) return 'Technical Grade';
    if (html.includes('pharma')) return 'Pharmaceutical Grade';
    if (html.includes('food')) return 'Food Grade';
    if (html.includes('industrial')) return 'Industrial Grade';
    return 'Standard';
  }

  private extractImageUrl(html: string): string {
    const matches = html.match(/src="([^"]*\.(?:jpg|jpeg|png|webp))[^"]*"/i);
    if (matches) {
      let url = matches[1];
      if (!url.startsWith('http')) {
        url = BASE_URL + (url.startsWith('/') ? url : '/' + url);
      }
      return url;
    }
    return '';
  }

  private extractSimilarProducts(html: string): string[] {
    const similar: string[] = [];
    const match = html.match(/Related products?[^<]*(?:<[^>]*>)*([^<]*(?:,\s*[^<,]+)*)/i);
    if (match) {
      const products = match[1].split(',').map(p => p.trim().toLowerCase().replace(/\s+/g, '-'));
      return products.filter(p => p.length > 0).slice(0, 5);
    }
    return [];
  }

  async scrapeAllProducts() {
    console.log('🚀 Starting SoleChem Web Scraper\n');

    let page = 1;
    let totalProducts = 0;
    const maxPages = 100; // Safety limit

    while (page <= maxPages) {
      console.log(`📄 Scraping page ${page}...`);

      const pageUrl = page === 1 ? `${BASE_URL}/products/` : `${BASE_URL}/products/${page}/`;
      const html = await this.fetchPage(pageUrl);

      if (!html) {
        console.log(`⚠️  Failed to fetch page ${page}, stopping.\n`);
        break;
      }

      const productLinks = this.parseProductList(html);

      if (productLinks.length === 0) {
        console.log(`✅ No more products found. Stopping at page ${page}.\n`);
        break;
      }

      console.log(`   Found ${productLinks.length} products on this page`);

      for (const link of productLinks) {
        const fullUrl = link.startsWith('http') ? link : BASE_URL + link;

        if (this.processedUrls.has(fullUrl)) {
          continue;
        }

        const productHtml = await this.fetchPage(fullUrl);

        if (productHtml) {
          const product = this.parseProductDetails(productHtml, fullUrl);
          if (product) {
            this.products.push(product);
            totalProducts++;
            console.log(`   ✓ ${product.name}`);
          }
        }

        this.processedUrls.add(fullUrl);
        await this.delay(300);
      }

      console.log(`   Total products so far: ${totalProducts}\n`);
      page++;
      await this.delay(1000);
    }

    console.log(`\n✅ Scraping completed!`);
    console.log(`📊 Total products scraped: ${totalProducts}`);
    console.log(`📂 Categories found: ${this.categories.size}`);
    console.log(`🏭 Industries found: ${this.industries.size}`);
    console.log(`❌ Failed URLs: ${this.failedUrls.length}\n`);

    return {
      products: this.products,
      categories: Array.from(this.categories).sort(),
      industries: Array.from(this.industries).sort(),
      failedUrls: this.failedUrls,
    };
  }

  saveData(
    products: Product[],
    categories: string[],
    industries: string[]
  ) {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log('💾 Saving data to files...\n');

    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log(`✅ Saved ${products.length} products to ${PRODUCTS_FILE}`);

    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
    console.log(`✅ Saved ${categories.length} categories to ${CATEGORIES_FILE}`);

    fs.writeFileSync(INDUSTRIES_FILE, JSON.stringify(industries, null, 2));
    console.log(`✅ Saved ${industries.length} industries to ${INDUSTRIES_FILE}`);
  }
}

async function main() {
  const scraper = new SolechemScraper();
  const { products, categories, industries, failedUrls } = await scraper.scrapeAllProducts();

  scraper.saveData(products, categories, industries);

  if (failedUrls.length > 0) {
    console.log('\n⚠️  Failed URLs:');
    failedUrls.forEach(url => console.log(`  - ${url}`));
  }

  console.log('\n✨ Data scraping completed successfully!');
}

main().catch(console.error);
