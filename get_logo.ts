import fs from 'fs';

async function run() {
  const res = await fetch('https://www.solechem.eu/');
  const text = await res.text();
  const matches = text.match(/<img[^>]+logo[^>]+>/gi);
  console.log(matches);
}
run();
