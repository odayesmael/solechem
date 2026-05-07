import fs from 'fs';

let content = fs.readFileSync('src/constants.ts', 'utf8');

// We need to parse PRODUCTS and INDUSTRIES, but it's a TS file.
// Let's just use a regex to find all industries in PRODUCTS.
const productsSection = content.split('export const INDUSTRIES')[0];
const industriesSection = content.split('export const INDUSTRIES')[1];

if (!productsSection || !industriesSection) {
  console.error("Could not split file");
  process.exit(1);
}

const industryNames = [
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
  "Water Treatment"
];

let newContent = content;

for (const ind of industryNames) {
  // Count how many times this industry appears in the PRODUCTS array
  // We look for `"Industry Name"` inside the PRODUCTS array string
  const regex = new RegExp(`"\\s*${ind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*"`, 'g');
  const matches = productsSection.match(regex);
  const count = matches ? matches.length : 0;
  
  console.log(`${ind}: ${count}`);
  
  // Update the productCount in the INDUSTRIES array
  const indRegex = new RegExp(`("name"\\s*:\\s*"${ind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"productCount"\\s*:\\s*)\\d+`);
  newContent = newContent.replace(indRegex, `$1${count}`);
}

fs.writeFileSync('src/constants.ts', newContent, 'utf8');
console.log("Updated product counts.");
