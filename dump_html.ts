import fs from 'fs';

async function dump(url: string, filename: string) {
  const res = await fetch(url);
  const html = await res.text();
  fs.writeFileSync(filename, html);
  console.log(`Dumped ${url} to ${filename}`);
}

dump('https://solechem.com/melamine/', 'melamine.html');
dump('https://solechem.com/acetic-acid/', 'acetic-acid.html');
dump('https://solechem.com/sodium-bicarbonate/', 'sodium-bicarbonate.html');
