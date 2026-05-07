import fs from 'fs';

const fileContent = fs.readFileSync('src/constants.ts', 'utf-8');

// We can extract the PRODUCTS array and INDUSTRIES array by evaluating the file
// But since it has exports, we can just import it!
import { PRODUCTS, INDUSTRIES } from './src/constants.ts';

const categoryMap = {
  'Essential Chemicals': 'Monomers & Building Blocks',
  'Cellulose Ethers': 'Polymers & Resins',
  'Pharmaceutical Chemicals': 'Pharmaceutical Intermediates',
  'Feed Additives and Premixes': 'Vitamins & Nutrients',
  'Food Additives': 'Sweeteners & Food Additives',
  'Specialty Chemicals': 'Catalysts & Catalyst Precursors',
  'Demulsifiers and H2S Scavengers': 'Surfactants',
  'Agricultural Chemicals': 'Agrochemicals',
  'Acids': 'Organic Acids',
  'Water Treatment Chemicals': 'Chelating Agents',
  'Flavors & Fragrances': 'Flavors & Fragrances',
  'Vitamins': 'Vitamins & Nutrients',
  'Surfactants': 'Surfactants',
  'Cosmetic Raw Materials': 'Oils, Fats & Waxes',
  'General': 'Monomers & Building Blocks',
  'Process Chemicals': 'Solvents',
  'Antifoams': 'Silicones & Silicates',
  'Plasticizers': 'Polymers & Resins',
  'Antioxidants': 'UV Absorbers & Stabilizers',
  'Amino Acids': 'Amino Acids & Peptides',
  'Activated Carbons': 'Salts & Minerals'
};

const industryMap = {
  'Textiles Leather And Paper': 'Textile, Leather & Paper',
  'Pharmaceutical And Health': 'Pharmaceuticals & Healthcare',
  'Food Nutrition': 'Food & Nutrition',
  'Personal Care And Cosmetics': 'Personal Care & Cosmetics',
  'Automotive': 'Automotive',
  'Oil Gas': 'Oil, Gas & Energy',
  'Plastic And Rubber': 'Plastics & Polymers',
  'Agriculture': 'Agriculture & Feed',
  'Water And Air Purification': 'Water Treatment',
  'Battery Electronics Energy': 'Electronics',
  'Animal Nutrition': 'Agriculture & Feed',
  'Case Construction': 'Building & Construction',
  'General': 'Building & Construction',
  'Space Aviation And Defense': 'Aerospace & Defense',
  'Mining': 'Mining & Metals'
};

const newIndustriesArray = [
  { name: 'Aerospace & Defense', slug: 'aerospace-defense', description: 'Advanced chemicals for aerospace and defense applications.', imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800' },
  { name: 'Agriculture & Feed', slug: 'agriculture-feed', description: 'High-quality agrochemicals and feed additives.', imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800' },
  { name: 'Automotive', slug: 'automotive', description: 'Chemicals for automotive manufacturing and maintenance.', imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800' },
  { name: 'Biotechnology & Life Sciences', slug: 'biotechnology-life-sciences', description: 'Reagents and chemicals for biotech and life sciences.', imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800' },
  { name: 'Building & Construction', slug: 'building-construction', description: 'Construction chemicals, additives, and materials.', imageUrl: 'https://images.unsplash.com/photo-1541888087425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' },
  { name: 'Coatings, Adhesives, Sealants & Elastomers', slug: 'case', description: 'CASE industry chemicals and raw materials.', imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800' },
  { name: 'Electronics', slug: 'electronics', description: 'High-purity chemicals for electronics and battery manufacturing.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
  { name: 'Food & Nutrition', slug: 'food-nutrition', description: 'Food-grade additives, sweeteners, and nutritional ingredients.', imageUrl: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&q=80&w=800' },
  { name: 'Home Care & Industrial Cleaning', slug: 'home-care-industrial-cleaning', description: 'Surfactants and cleaning agents for home and industrial use.', imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&q=80&w=800' },
  { name: 'Lubricants & Metalworking', slug: 'lubricants-metalworking', description: 'Additives for lubricants and metalworking fluids.', imageUrl: 'https://images.unsplash.com/photo-1580982327559-c1202864ee05?auto=format&fit=crop&q=80&w=800' },
  { name: 'Mining & Metals', slug: 'mining-metals', description: 'Chemicals for mineral processing and metal extraction.', imageUrl: 'https://images.unsplash.com/photo-1518534237887-1ba351d38221?auto=format&fit=crop&q=80&w=800' },
  { name: 'Oil, Gas & Energy', slug: 'oil-gas-energy', description: 'Chemicals for oilfield, refining, and energy sectors.', imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800' },
  { name: 'Personal Care & Cosmetics', slug: 'personal-care-cosmetics', rawMaterials: true, description: 'Raw materials for cosmetics and personal care products.', imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800' },
  { name: 'Pharmaceuticals & Healthcare', slug: 'pharmaceuticals-healthcare', description: 'APIs, intermediates, and excipients for pharmaceuticals.', imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800' },
  { name: 'Plastics & Polymers', slug: 'plastics-polymers', description: 'Additives, resins, and monomers for plastics.', imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=800' },
  { name: 'Printing & Packaging', slug: 'printing-packaging', description: 'Chemicals for inks, printing, and packaging materials.', imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' },
  { name: 'Pulp & Paper', slug: 'pulp-paper', description: 'Chemicals for paper manufacturing and processing.', imageUrl: 'https://images.unsplash.com/photo-1595425970377-c9703bc48b2d?auto=format&fit=crop&q=80&w=800' },
  { name: 'Rubber & Tire', slug: 'rubber-tire', description: 'Chemicals and additives for rubber and tire production.', imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800' },
  { name: 'Textile, Leather & Paper', slug: 'textile-leather-paper', description: 'Dyes, auxiliaries, and treatments for textiles and leather.', imageUrl: 'https://images.unsplash.com/photo-1528255915607-9012fda0f838?auto=format&fit=crop&q=80&w=800' },
  { name: 'Water Treatment', slug: 'water-treatment', description: 'Chemicals for water purification and wastewater treatment.', imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800' }
];

PRODUCTS.forEach(p => {
  if (categoryMap[p.category]) {
    p.category = categoryMap[p.category];
  }
  if (p.industry && Array.isArray(p.industry)) {
    p.industry = p.industry.map(i => industryMap[i] || i);
  }
});

const newFileContent = `export const PRODUCTS: any[] = ${JSON.stringify(PRODUCTS, null, 2)};\n\nexport const INDUSTRIES = ${JSON.stringify(newIndustriesArray, null, 2)};\n`;

fs.writeFileSync('src/constants.ts', newFileContent);
console.log('Successfully updated constants.ts');
