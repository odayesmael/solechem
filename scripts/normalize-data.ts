import * as fs from 'fs';
import * as path from 'path';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  industry: string[];
  [key: string]: any;
}

// Mapping for standardizing similar categories and industries
const CATEGORY_NORMALIZE_MAP: Record<string, string> = {
  'Essential Chemicals': 'Industrial Chemicals',
  'Pharmaceutical Chemicals': 'Healthcare & Pharmaceuticals',
  'Food Additives': 'Sweeteners & Food Additives',
  'Antioxidants': 'Specialty Chemicals',
  'Antifoams': 'Specialty Chemicals',
  'Cellulose Ethers': 'Polymers & Resins',
  'Cosmetic Raw Materials': 'Cosmetics & Personal Care',
  'Demulsifiers and H2S Scavengers': 'Specialty Chemicals',
  'Process Chemicals': 'Industrial Chemicals',
  'Activated Carbons': 'Industrial Chemicals',
  'Agricultural Chemicals': 'Agrochemicals',
  'Feed Additives and Premixes': 'Agrochemicals',
};

const INDUSTRY_NORMALIZE_MAP: Record<string, string> = {
  'Textiles Leather And Paper': 'Textile, Leather & Paper',
  'Textile, Leather & Paper': 'Textile, Leather & Paper',
  'Pharmaceutical And Health': 'Healthcare & Pharmaceuticals',
  'Personal Care And Cosmetics': 'Cosmetics & Personal Care',
  'Plastic And Rubber': 'Plastics & Polymers',
  'Oil Gas': 'Oil & Gas',
  'Water And Air Purification': 'Water Treatment',
  'Case Construction': 'Building & Construction',
  'Space Aviation And Defense': 'Aerospace & Defense',
  'Battery Electronics Energy': 'Electronics',
  'Mining & Minerals': 'Mining',
  'Animal Nutrition': 'Agriculture',
  'Food Nutrition': 'Food & Beverage',
};

const STANDARD_CATEGORIES = [
  'Agrochemicals',
  'Alcohols & Glycols',
  'Alkalis & Bases',
  'Amines',
  'Amino Acids & Peptides',
  'Catalysts & Catalyst Precursors',
  'Chelating Agents',
  'Flame Retardants',
  'Flavors & Fragrances',
  'Heterocyclic Compounds',
  'Inorganic Acids',
  'Monomers & Building Blocks',
  'Nucleosides & Nucleotides',
  'Oils, Fats & Waxes',
  'Organic Acids',
  'Oxidizers & Peroxides',
  'Pharmaceutical Intermediates',
  'Pigments & Colorants',
  'Polymers & Resins',
  'Salts & Minerals',
  'Silicones & Silicates',
  'Solvents',
  'Specialty Chemicals',
  'Surfactants',
  'Sweeteners & Food Additives',
  'UV Absorbers & Stabilizers',
  'Vitamins & Nutrients',
  'Industrial Chemicals',
  'Cosmetics & Personal Care',
  'Healthcare & Pharmaceuticals',
];

const STANDARD_INDUSTRIES = [
  'Agrochemicals',
  'Automotive',
  'Cosmetics & Personal Care',
  'Electronics',
  'Food & Beverage',
  'Healthcare & Pharmaceuticals',
  'Metal Treatment',
  'Mining',
  'Oil & Gas',
  'Paints & Coatings',
  'Plastics & Polymers',
  'Textile, Leather & Paper',
  'Water Treatment',
  'Manufacturing',
  'Building & Construction',
  'Aerospace & Defense',
];

function normalizeCategory(cat: string): string {
  const normalized = CATEGORY_NORMALIZE_MAP[cat];
  if (normalized) return normalized;

  // Check if it's already in standard list
  if (STANDARD_CATEGORIES.includes(cat)) return cat;

  // Try to match similar names
  const lower = cat.toLowerCase();
  for (const std of STANDARD_CATEGORIES) {
    if (std.toLowerCase().includes(lower) || lower.includes(std.toLowerCase())) {
      return std;
    }
  }

  return 'Industrial Chemicals'; // Default
}

function normalizeIndustry(ind: string): string {
  const normalized = INDUSTRY_NORMALIZE_MAP[ind];
  if (normalized) return normalized;

  // Check if it's already in standard list
  if (STANDARD_INDUSTRIES.includes(ind)) return ind;

  // Try to match similar names
  const lower = ind.toLowerCase();
  for (const std of STANDARD_INDUSTRIES) {
    if (std.toLowerCase().includes(lower) || lower.includes(std.toLowerCase())) {
      return std;
    }
  }

  return 'Manufacturing'; // Default
}

async function main() {
  console.log('🔄 Starting Data Normalization\n');

  const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');

  if (!fs.existsSync(productsPath)) {
    console.error(`❌ File not found: ${productsPath}`);
    process.exit(1);
  }

  console.log(`📖 Reading products...`);
  const products: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  console.log(`✅ Loaded ${products.length} products\n`);

  console.log('🔧 Normalizing categories and industries...');

  const normalizedProducts = products.map(product => ({
    ...product,
    category: normalizeCategory(product.category),
    industry: product.industry
      .map((ind: string) => normalizeIndustry(ind))
      .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index) // Remove duplicates
  }));

  // Extract normalized categories and industries
  const categories = Array.from(new Set(normalizedProducts.map(p => p.category))).sort();
  const industries = Array.from(new Set(normalizedProducts.flatMap(p => p.industry))).sort();

  console.log(`✅ Normalization complete\n`);

  console.log(`📊 Statistics:`);
  console.log(`   Total Products: ${normalizedProducts.length}`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Industries: ${industries.length}\n`);

  console.log('📝 Categories:');
  categories.forEach(cat => {
    const count = normalizedProducts.filter(p => p.category === cat).length;
    console.log(`   - ${cat}: ${count} products`);
  });

  console.log('\n🏭 Industries:');
  industries.forEach(ind => {
    const count = normalizedProducts.filter(p => p.industry.includes(ind)).length;
    console.log(`   - ${ind}: ${count} products`);
  });

  // Save normalized products
  const outputDir = path.join(process.cwd(), 'src', 'data');
  const productsJsonPath = path.join(outputDir, 'products.json');
  fs.writeFileSync(productsJsonPath, JSON.stringify(normalizedProducts, null, 2));
  console.log(`\n✅ Saved normalized products`);

  // Save categories
  const categoriesPath = path.join(outputDir, 'categories.json');
  fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
  console.log(`✅ Saved ${categories.length} categories`);

  // Save industries
  const industriesPath = path.join(outputDir, 'industries.json');
  fs.writeFileSync(industriesPath, JSON.stringify(industries, null, 2));
  console.log(`✅ Saved ${industries.length} industries`);

  // Update constants.ts
  console.log(`\n🔧 Updating src/constants.ts...`);
  const constantsPath = path.join(process.cwd(), 'src', 'constants.ts');

  const industriesData = industries.map((ind, idx) => ({
    id: String(idx + 1),
    name: ind,
    slug: ind.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and'),
    description: 'Chemicals for industry applications.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80'
  }));

  const categoriesData = categories.map((cat, idx) => ({
    id: String(idx + 1),
    name: cat,
    slug: cat.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and'),
    count: normalizedProducts.filter(p => p.category === cat).length
  }));

  const constantsContent =
    'export const PRODUCTS: any[] = ' + JSON.stringify(normalizedProducts, null, 2) + ';\n\n' +
    'export const INDUSTRIES: any[] = ' + JSON.stringify(industriesData, null, 2) + ';\n\n' +
    'export const CATEGORIES: any[] = ' + JSON.stringify(categoriesData, null, 2) + ';';

  fs.writeFileSync(constantsPath, constantsContent);
  console.log(`✅ Updated src/constants.ts\n`);

  console.log('✨ Data normalization completed successfully!');
}

main().catch(console.error);
