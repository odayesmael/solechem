import fs from 'fs';
import https from 'https';

const productsToAdd = [
  "Ammonia borane",
  "Argon",
  "Borane dimethyl sulfide complex",
  "Borax decahydrate",
  "Borax pentahydrate",
  "Butylene carbonate",
  "Cyclohexane",
  "Cyclopentane",
  "Decyldimethyloctylammonium chloride",
  "Dibasic ester",
  "Dioctyldimethylammonium chloride",
  "Ethoxylated stearylamine",
  "Ethyl methyl carbonate",
  "Fused silica",
  "Helium",
  "N-Isopropylhydroxyamine",
  "n,n-Diethylaniline borane",
  "Pinacolborane",
  "Propylene glycol monopropyl ether",
  "Pyridine",
  "Sodium 1-octanesulfonate",
  "Tetrahydrofuran",
  "Tin(IV) oxide",
  "Trans-1,2-dichloroethylene",
  "Zinc bromide",
  "1,2-Dimethoxypropane",
  "3-Methoxy-3-methyl-1-butanol",
  "9-Borabicyclo[3.3.1]nonane",
  "9-Methoxy-9-BBN"
];

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

let content = fs.readFileSync('src/constants.ts', 'utf8');

const newProducts = productsToAdd.map(name => {
  return `  {
    "name": "${name}",
    "slug": "${slugify(name)}",
    "cas": "",
    "ec": "",
    "formula": "",
    "mw": "",
    "category": "Industrial Chemicals",
    "industry": [
      "Home Care & Industrial Cleaning"
    ],
    "grade": "Standard",
    "moq": "Contact for details",
    "description": "${name} for Home Care & Industrial Cleaning applications.",
    "physicalProperties": "Contact us for detailed physical properties and specifications."
  }`;
});

const productsString = newProducts.join(',\n');

// Insert before the end of the PRODUCTS array
const insertIndex = content.lastIndexOf('];\n\nexport const INDUSTRIES');
if (insertIndex !== -1) {
  content = content.slice(0, insertIndex) + ',\n' + productsString + '\n' + content.slice(insertIndex);
  fs.writeFileSync('src/constants.ts', content, 'utf8');
  console.log("Added new products.");
} else {
  console.error("Could not find insertion point.");
}
