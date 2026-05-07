import * as cheerio from 'cheerio';
import fs from 'fs';

async function fetchProduct(filePath: string) {
  try {
    console.log(`Reading ${filePath}...`);
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);
    
    const name = $('h1').text().trim() || $('h2.elementor-heading-title').first().text().trim();
    
    let cas = '';
    let formula = '';
    let ec = '';
    let foodCode = '';
    let mw = '';
    let otherNames = '';
    
    // Extract from JSON-LD
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const data = JSON.parse($(el).html() || '{}');
        if (data['@type'] === 'ChemicalSubstance') {
          if (data.identifier) {
            data.identifier.forEach((id: any) => {
              if (id.name === 'CAS Number') cas = id.value;
              if (id.name === 'EC Number') ec = id.value;
              if (id.name === 'Gıda Kodu' || id.name === 'Food Code') foodCode = id.value;
            });
          }
          if (data.alternateName) {
            otherNames = Array.isArray(data.alternateName) ? data.alternateName.join(', ') : data.alternateName;
          }
        }
      } catch (e) {}
    });
    
    const description = $('.elementor-widget-text-editor p').first().text().trim();
    const physicalProperties = $('.product-detail-technical .elementor-widget-text-editor').text().trim();

    // Try to find Formula and MW in the text if not found
    const commonExclusions = ['CAS', 'EC', 'REACH', 'FDA', 'USP', 'BP', 'EP', 'FCC', 'ISO', 'GMP', 'HACCP', 'HALAL', 'KOSHER', 'JSON', 'HTML', 'UTF', 'PTA', 'MEK', 'MSG', 'AHA', 'V', 'OH', 'STPP', 'TBHQ', 'TBBPA', 'TBAB', 'THPC', 'TKPP', 'TPAB', 'TSPP', 'TEA', 'TCE', 'TOTM', 'TSP', 'BCAA', 'GSH', 'MCP', 'SAMe', 'IMP', 'PBO'];
    
    const findFormula = (text: string) => {
      if (!text) return '';
      // First try with parentheses as it's more reliable
      const parenMatch = text.match(/\((([A-Z][a-z0-9₃₄₂]*)+)\)/);
      if (parenMatch && !commonExclusions.includes(parenMatch[1])) return parenMatch[1];

      // Then try without parentheses but look for chemical-like patterns
      const matches = text.matchAll(/\b([A-Z][a-z0-9₃₄₂]*[A-Z][a-z0-9₃₄₂]*[A-Z0-9a-z0-9₃₄₂]*)\b/g);
      for (const match of matches) {
        const f = match[1];
        if (f.length > 2 && /[0-9₃₄₂]/.test(f) && !commonExclusions.includes(f)) {
          return f;
        }
      }
      return '';
    };

    formula = findFormula(description) || findFormula(physicalProperties) || findFormula(html);

    // Try to find MW in the entire HTML
    const mwRegex = /(?:Molecular Weight|M\.W\.|MW|Molecular Mass)[:\s]*(\d+(?:\.\d+)?)/i;
    const mwMatch = html.match(mwRegex);
    if (mwMatch) {
      mw = mwMatch[1];
    }

    return { name, formula, mw };
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
    return null;
  }
}

async function test() {
  const files = [
    'sodium-bicarbonate.html',
    'acetic-acid.html',
    'melamine.html'
  ];
  
  for (const file of files) {
    const result = await fetchProduct(file);
    console.log(JSON.stringify(result, null, 2));
  }
}

test();
