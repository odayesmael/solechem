import fs from 'fs';

async function main() {
  try {
    const res = await fetch('https://solechem.com/page-sitemap.xml');
    const text = await res.text();
    const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    console.log(`Page URLs: ${urls.length}`);
    console.log(urls.slice(0, 20));
  } catch (e) {
    console.error(e);
  }
}

main();
