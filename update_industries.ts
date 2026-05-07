import fs from 'fs';
import { PRODUCTS, INDUSTRIES } from './src/constants.ts';

const iconMap: Record<string, string> = {
  'Aerospace & Defense': 'Plane',
  'Agriculture & Feed': 'Tractor',
  'Automotive': 'Car',
  'Biotechnology & Life Sciences': 'FlaskConical',
  'Building & Construction': 'HardHat',
  'Coatings, Adhesives, Sealants & Elastomers': 'Sparkles',
  'Electronics': 'Battery',
  'Food & Nutrition': 'Apple',
  'Home Care & Industrial Cleaning': 'Sparkles',
  'Lubricants & Metalworking': 'Flame',
  'Mining & Metals': 'Pickaxe',
  'Oil, Gas & Energy': 'Flame',
  'Personal Care & Cosmetics': 'Sparkles',
  'Pharmaceuticals & Healthcare': 'Pill',
  'Plastics & Polymers': 'Recycle',
  'Printing & Packaging': 'ClipboardList',
  'Pulp & Paper': 'ClipboardList',
  'Rubber & Tire': 'Car',
  'Textile, Leather & Paper': 'Scissors',
  'Water Treatment': 'Droplets'
};

const updatedIndustries = INDUSTRIES.map(ind => {
  const industryProducts = PRODUCTS.filter(p => p.industry && p.industry.includes(ind.name));
  
  // Extract unique categories for this industry to use as subcategories
  const subcategories = Array.from(new Set(industryProducts.map(p => p.category))).slice(0, 3);
  
  return {
    ...ind,
    icon: iconMap[ind.name] || 'FlaskConical',
    productCount: industryProducts.length,
    subcategories: subcategories.length > 0 ? subcategories : ['General Chemicals']
  };
});

const fileContent = fs.readFileSync('src/constants.ts', 'utf-8');
const newFileContent = fileContent.replace(/export const INDUSTRIES = \[[\s\S]*?\];/, "export const INDUSTRIES = " + JSON.stringify(updatedIndustries, null, 2) + ";");

fs.writeFileSync('src/constants.ts', newFileContent);
console.log('Successfully updated INDUSTRIES in constants.ts');
