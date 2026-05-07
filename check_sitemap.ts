import fs from 'fs';

async function main() {
  try {
    const res = await fetch('https://solechem.com/sitemap_index.xml');
    const text = await res.text();
    console.log(text);
  } catch (e) {
    console.error(e);
  }
}

main();
