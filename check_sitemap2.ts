import fs from 'fs';

async function main() {
  try {
    const res = await fetch('https://solechem.com/product-sitemap.xml');
    console.log('Status:', res.status);
    if (res.ok) {
      const text = await res.text();
      console.log(text.substring(0, 500));
    }
  } catch (e) {
    console.error(e);
  }
}

main();
