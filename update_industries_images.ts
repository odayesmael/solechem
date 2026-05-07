import fs from 'fs';

const filePath = './src/constants.ts';
let content = fs.readFileSync(filePath, 'utf8');

const industriesRegex = /export const INDUSTRIES: any\[\] = \[([\s\S]*?)\];/;
const match = content.match(industriesRegex);

if (match) {
  let industriesStr = match[0];
  
  // Replace the imageUrl for each industry
  // E.g. "imageUrl": "https://..." to "imageUrl": `/industries/${name}.webp`
  // A simple way is to parse the array, but since it's inside a TS file with `export const`, we can use regex or eval.
  // Actually, let's just do a string replace if possible, but the names might have ampersands like "Agriculture & Feed"
  
  // Let's replace line by line or parse it.
  // Since the INDUSTRIES array is relatively small, we can extract it, parse it, update it, and stringify it.
  const arrayContent = match[1];
  
  // Instead of full parsing, we can regex replace the imageUrl based on the name.
  // Example block:
  // "name": "Aerospace & Defense",
  // "slug": "aerospace-defense",
  // "description": "...",
  // "imageUrl": "..."
  
  const blockRegex = /"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"description":\s*"([^"]+)",\s*"imageUrl":\s*"([^"]+)"/g;
  
  industriesStr = industriesStr.replace(blockRegex, (match, name, slug, desc, oldUrl) => {
    return `"name": "${name}",\n    "slug": "${slug}",\n    "description": "${desc}",\n    "imageUrl": "/industries/${name}.webp"`;
  });

  content = content.replace(industriesRegex, industriesStr);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated INDUSTRIES in constants.ts');
} else {
  console.error('Could not find INDUSTRIES array in constants.ts');
}
