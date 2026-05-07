import fs from 'fs';

const productsToUpdate = [
  "Acetone",
  "Activated carbon",
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
  "Dipropylene glycol dimethyl ether",
  "Ethoxylated stearylamine",
  "Ethyl methyl carbonate",
  "Fused silica",
  "Helium",
  "Isopropyl alcohol",
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

const targetIndustry = "Home Care & Industrial Cleaning";

let content = fs.readFileSync('src/constants.ts', 'utf8');

for (const productName of productsToUpdate) {
  const regex = new RegExp(`("name"\\s*:\\s*"${productName.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\$&')}"[\\s\\S]*?"industry"\\s*:\\s*\\[)([^\\]]*)(\\])`, 'i');
  
  content = content.replace(regex, (match, p1, p2, p3) => {
    if (p2.includes(targetIndustry)) {
      return match;
    }
    const separator = p2.trim() === '' ? '' : ',\n      ';
    return `${p1}${p2}${separator}"${targetIndustry}"${p3}`;
  });
}

fs.writeFileSync('src/constants.ts', content, 'utf8');
console.log("Done");
