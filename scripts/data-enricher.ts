import * as fs from 'fs';
import * as path from 'path';

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

const CATEGORIES = [
  'Agrochemicals', 'Alcohols & Glycols', 'Alkalis & Bases', 'Amines',
  'Amino Acids & Peptides', 'Catalysts & Catalyst Precursors', 'Chelating Agents',
  'Flame Retardants', 'Flavors & Fragrances', 'Heterocyclic Compounds',
  'Inorganic Acids', 'Monomers & Building Blocks', 'Nucleosides & Nucleotides',
  'Oils, Fats & Waxes', 'Organic Acids', 'Organometallic Compounds',
  'Oxidizers & Peroxides', 'Pharmaceutical Intermediates', 'Pigments & Colorants',
  'Polymers & Resins', 'Salts & Minerals', 'Silicones & Silicates', 'Solvents',
  'Surfactants', 'Sweeteners & Food Additives', 'UV Absorbers & Stabilizers',
  'Vitamins & Nutrients', 'Essential Chemicals', 'Industrial Chemicals'
];

const INDUSTRIES = [
  'Agriculture', 'Automotive', 'Cosmetics & Personal Care', 'Electronics',
  'Food & Beverage', 'Healthcare & Pharmaceuticals', 'Metal Treatment',
  'Mining & Minerals', 'Oil & Gas', 'Paints & Coatings', 'Plastics & Polymers',
  'Textile, Leather & Paper', 'Water Treatment', 'Manufacturing', 'Textile, Leather And Paper',
  'Pharmaceutical And Health', 'Home Care & Industrial Cleaning'
];

function categorizeProduct(product: Product): string {
  const nameAndDesc = `${product.name} ${product.description || ''}`.toLowerCase();

  // Check for specific keywords
  const keywordMap: Record<string, string> = {
    'alcohol': 'Alcohols & Glycols',
    'glycol': 'Alcohols & Glycols',
    'hydroxide': 'Alkalis & Bases',
    'carbonate': 'Alkalis & Bases',
    'base': 'Alkalis & Bases',
    'amine': 'Amines',
    'amino acid': 'Amino Acids & Peptides',
    'catalyst': 'Catalysts & Catalyst Precursors',
    'chelating': 'Chelating Agents',
    'flame retardant': 'Flame Retardants',
    'flavor': 'Flavors & Fragrances',
    'fragrance': 'Flavors & Fragrances',
    'heterocyclic': 'Heterocyclic Compounds',
    'inorganic acid': 'Inorganic Acids',
    'monomer': 'Monomers & Building Blocks',
    'building block': 'Monomers & Building Blocks',
    'nucleoside': 'Nucleosides & Nucleotides',
    'nucleotide': 'Nucleosides & Nucleotides',
    'oil': 'Oils, Fats & Waxes',
    'fat': 'Oils, Fats & Waxes',
    'wax': 'Oils, Fats & Waxes',
    'organic acid': 'Organic Acids',
    'acid': 'Organic Acids',
    'organometallic': 'Organometallic Compounds',
    'oxidizer': 'Oxidizers & Peroxides',
    'peroxide': 'Oxidizers & Peroxides',
    'pharmaceutical intermediate': 'Pharmaceutical Intermediates',
    'pigment': 'Pigments & Colorants',
    'colorant': 'Pigments & Colorants',
    'dye': 'Pigments & Colorants',
    'resin': 'Polymers & Resins',
    'polymer': 'Polymers & Resins',
    'salt': 'Salts & Minerals',
    'mineral': 'Salts & Minerals',
    'silicone': 'Silicones & Silicates',
    'silicate': 'Silicones & Silicates',
    'solvent': 'Solvents',
    'surfactant': 'Surfactants',
    'sweetener': 'Sweeteners & Food Additives',
    'food additive': 'Sweeteners & Food Additives',
    'uv absorber': 'UV Absorbers & Stabilizers',
    'stabilizer': 'UV Absorbers & Stabilizers',
    'vitamin': 'Vitamins & Nutrients',
    'nutrient': 'Vitamins & Nutrients'
  };

  for (const [keyword, category] of Object.entries(keywordMap)) {
    if (nameAndDesc.includes(keyword)) {
      return category;
    }
  }

  return product.category || 'Industrial Chemicals';
}

function categorizeIndustry(product: Product): string[] {
  const nameAndDesc = `${product.name} ${product.description || ''}`.toLowerCase();
  const found: string[] = [];

  const keywordMap: Record<string, string[]> = {
    'textile': ['Textile, Leather & Paper'],
    'leather': ['Textile, Leather & Paper'],
    'paper': ['Textile, Leather & Paper'],
    'pharmaceutical': ['Healthcare & Pharmaceuticals'],
    'pharma': ['Healthcare & Pharmaceuticals'],
    'drug': ['Healthcare & Pharmaceuticals'],
    'medicine': ['Healthcare & Pharmaceuticals'],
    'health': ['Healthcare & Pharmaceuticals'],
    'food': ['Food & Beverage'],
    'beverage': ['Food & Beverage'],
    'cosmetic': ['Cosmetics & Personal Care'],
    'beauty': ['Cosmetics & Personal Care'],
    'skincare': ['Cosmetics & Personal Care'],
    'personal care': ['Cosmetics & Personal Care'],
    'electronics': ['Electronics'],
    'semiconductor': ['Electronics'],
    'automotive': ['Automotive'],
    'vehicle': ['Automotive'],
    'car': ['Automotive'],
    'oil': ['Oil & Gas'],
    'gas': ['Oil & Gas'],
    'energy': ['Oil & Gas'],
    'plastic': ['Plastics & Polymers'],
    'polymer': ['Plastics & Polymers'],
    'coating': ['Paints & Coatings'],
    'paint': ['Paints & Coatings'],
    'water treatment': ['Water Treatment'],
    'purification': ['Water Treatment'],
    'mining': ['Mining & Minerals'],
    'metal treatment': ['Metal Treatment'],
    'metal': ['Metal Treatment'],
    'cleaning': ['Home Care & Industrial Cleaning'],
    'detergent': ['Home Care & Industrial Cleaning'],
    'agriculture': ['Agriculture'],
    'fertilizer': ['Agriculture']
  };

  for (const [keyword, industries] of Object.entries(keywordMap)) {
    if (nameAndDesc.includes(keyword)) {
      industries.forEach(ind => {
        if (!found.includes(ind)) {
          found.push(ind);
        }
      });
    }
  }

  if (found.length === 0) {
    return product.industry && product.industry.length > 0 ? product.industry : ['Manufacturing'];
  }

  return found;
}

function enrichProduct(product: Product, index: number): Product {
  return {
    ...product,
    id: String(index + 1),
    slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    category: categorizeProduct(product),
    industry: categorizeIndustry(product),
    grade: product.grade || 'Standard',
    moq: product.moq || 'Contact for details',
    compliance: product.compliance || ['REACH'],
    packing: product.packing || ['Contact for details'],
    leadTime: product.leadTime || 'Contact for details',
    imageUrl: product.imageUrl || `https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800`,
    applications: product.applications || [],
  };
}

async function main() {
  console.log('🔧 Starting Data Enrichment Process\n');

  const productsFile = path.join(process.cwd(), 'scraped_products.json');

  if (!fs.existsSync(productsFile)) {
    console.error(`❌ File not found: ${productsFile}`);
    process.exit(1);
  }

  console.log(`📖 Reading ${productsFile}...`);
  const rawProducts = JSON.parse(fs.readFileSync(productsFile, 'utf-8'));
  console.log(`✅ Loaded ${rawProducts.length} products\n`);

  console.log('🔄 Enriching and normalizing data...');
  const enrichedProducts = rawProducts.map((product: Product, index: number) => enrichProduct(product, index));
  console.log(`✅ Enriched ${enrichedProducts.length} products\n`);

  // Extract categories and industries
  const categories = Array.from(new Set(enrichedProducts.map((p: Product) => p.category))).sort();
  const industries = Array.from(new Set(enrichedProducts.flatMap((p: Product) => p.industry))).sort();

  console.log(`📊 Statistics:`);
  console.log(`   Total Products: ${enrichedProducts.length}`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Industries: ${industries.length}\n`);

  console.log('📝 Categories:');
  categories.forEach(cat => console.log(`   - ${cat}`));

  console.log('\n🏭 Industries:');
  industries.forEach(ind => console.log(`   - ${ind}`));

  // Create output directory
  const outputDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save enriched products
  const productsJsonPath = path.join(outputDir, 'products.json');
  fs.writeFileSync(productsJsonPath, JSON.stringify(enrichedProducts, null, 2));
  console.log(`\n✅ Saved enriched products to ${productsJsonPath}`);

  // Save categories
  const categoriesPath = path.join(outputDir, 'categories.json');
  fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
  console.log(`✅ Saved categories to ${categoriesPath}`);

  // Save industries
  const industriesPath = path.join(outputDir, 'industries.json');
  fs.writeFileSync(industriesPath, JSON.stringify(industries, null, 2));
  console.log(`✅ Saved industries to ${industriesPath}`);

  // Update constants.ts
  console.log(`\n🔧 Updating src/constants.ts...`);
  const constantsPath = path.join(process.cwd(), 'src', 'constants.ts');

  const industriesData = industries.map((ind, idx) => ({
    id: String(idx + 1),
    name: ind,
    slug: ind.toLowerCase().replace(/\s+/g, '-'),
    description: 'Chemicals for industrial applications.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80'
  }));

  const categoriesData = categories.map((cat, idx) => ({
    id: String(idx + 1),
    name: cat,
    slug: cat.toLowerCase().replace(/\s+/g, '-'),
    count: enrichedProducts.filter((p: Product) => p.category === cat).length
  }));

  const constantsContent =
    'export const PRODUCTS: any[] = ' + JSON.stringify(enrichedProducts, null, 2) + ';\n\n' +
    'export const INDUSTRIES: any[] = ' + JSON.stringify(industriesData, null, 2) + ';\n\n' +
    'export const CATEGORIES: any[] = ' + JSON.stringify(categoriesData, null, 2) + ';';

  fs.writeFileSync(constantsPath, constantsContent);
  console.log(`✅ Updated src/constants.ts\n`);

  console.log('✨ Data enrichment completed successfully!');
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ ${enrichedProducts.length} products ready`);
  console.log(`   ✅ ${categories.length} categories defined`);
  console.log(`   ✅ ${industries.length} industries defined`);
}

main().catch(console.error);
