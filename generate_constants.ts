import fs from 'fs';

const scrapedProducts = JSON.parse(fs.readFileSync('scraped_products.json', 'utf-8'));

// Helper to get a random image based on category
function getImageUrl(category: string, index: number) {
  const images = [
    "https://images.unsplash.com/photo-1618423835718-20fa16812832?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1603126857599-f6e15782fa5d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1574689211272-bc15e640e74d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800"
  ];
  return images[index % images.length];
}

// Group products by category for similar products
const productsByCategory: Record<string, string[]> = {};
scrapedProducts.forEach((p: any) => {
  if (!productsByCategory[p.category]) {
    productsByCategory[p.category] = [];
  }
  productsByCategory[p.category].push(p.slug);
});

const products = scrapedProducts.map((p: any, index: number) => {
  // Find similar products (same category, excluding self)
  const categoryProducts = productsByCategory[p.category] || [];
  const similar = categoryProducts.filter((slug: string) => slug !== p.slug).slice(0, 4);

  return {
    id: String(index + 1),
    name: p.name,
    slug: p.slug,
    cas: p.cas || "N/A",
    ec: p.ec || "N/A",
    formula: p.formula || "N/A",
    mw: p.mw || "N/A",
    category: p.category || "General",
    industry: p.industry.length > 0 ? p.industry : ["General"],
    grade: "Standard",
    moq: "Contact for details",
    description: p.description || "No description available.",
    applications: [],
    physicalProperties: p.physicalProperties || "N/A",
    safetyHandling: p.safetyHandling || "N/A",
    tradeRegulatory: p.tradeRegulatory || "N/A",
    otherNames: p.otherNames || "N/A",
    compliance: ["REACH"],
    packing: ["Contact for details"],
    leadTime: "Contact for details",
    imageUrl: getImageUrl(p.category, index),
    similarProducts: p.relatedProducts && p.relatedProducts.length > 0 
      ? p.relatedProducts.map((name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
      : similar
  };
});

const currentConstants = fs.readFileSync('src/constants.ts', 'utf-8');
const industriesMatch = currentConstants.match(/export const INDUSTRIES: any\[\] = \[([\s\S]*?)\];/);
const industriesStr = industriesMatch ? industriesMatch[0] : 'export const INDUSTRIES: any[] = [];';

const newConstants = `export const PRODUCTS: any[] = ${JSON.stringify(products, null, 2)};\n\n${industriesStr}\n`;

fs.writeFileSync('src/constants.ts', newConstants);
console.log('Updated src/constants.ts with ' + products.length + ' products.');
