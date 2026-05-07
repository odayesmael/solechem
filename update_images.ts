import fs from 'fs';
import path from 'path';

const constantsPath = path.join(process.cwd(), 'src', 'constants.ts');
let content = fs.readFileSync(constantsPath, 'utf8');

const imageMap: Record<string, string[]> = {
  'Solvents': [
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800', // flask
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800', // drums
    'https://images.unsplash.com/photo-1603126857599-f6e15782fa5d?auto=format&fit=crop&q=80&w=800', // lab
  ],
  'Acids': [
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', // beaker
    'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800', // lab
  ],
  'Salts': [
    'https://images.unsplash.com/photo-1574689211272-bc15e640e74d?auto=format&fit=crop&q=80&w=800', // crystals
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800', // powder
  ],
  'Polymers': [
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80&w=800', // plastic pellets
    'https://images.unsplash.com/photo-1618423835718-20fa16812832?auto=format&fit=crop&q=80&w=800', // polymer
  ],
  'default': [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', // generic lab
    'https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80&w=800', // generic chemical
  ]
};

// We will replace the unsplash URLs in constants.ts with a more deterministic approach based on category
// Actually, it's easier to just replace all imageUrls with a function or just map them.
// Let's parse the file, find the PRODUCTS array, and replace the imageUrls.

const lines = content.split('\n');
let inProducts = false;
let currentCategory = 'default';
let productIndex = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export const PRODUCTS: Product[] = [')) {
    inProducts = true;
  }
  
  if (inProducts) {
    const categoryMatch = lines[i].match(/"category":\s*"([^"]+)"/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1];
    }
    
    if (lines[i].includes('"imageUrl":')) {
      const images = imageMap[currentCategory] || imageMap['default'];
      const imageUrl = images[productIndex % images.length];
      lines[i] = `    "imageUrl": "${imageUrl}",`;
      productIndex++;
    }
  }
  
  if (inProducts && lines[i].startsWith('];')) {
    inProducts = false;
  }
}

fs.writeFileSync(constantsPath, lines.join('\n'));
console.log('Updated constants.ts with new images');
