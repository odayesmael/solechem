import * as cheerio from 'cheerio';
import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('all_urls.json', 'utf-8'));

async function fetchProduct(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const html = await res.text();
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
    
    // Extract from table if JSON-LD is missing
    if (!cas) {
      $('.elementor-widget-heading').each((_, el) => {
        const text = $(el).text().trim();
        if (text === 'CAS') {
          cas = $(el).closest('.e-con-child').next('.e-con-child').text().trim();
        } else if (text === 'EC') {
          ec = $(el).closest('.e-con-child').next('.e-con-child').text().trim();
        } else if (text === 'Food Code' || text === 'Gıda Kodu') {
          foodCode = $(el).closest('.e-con-child').next('.e-con-child').text().trim();
        }
      });
    }

    // Extract Other Names from ALTERNATIVE NAMES section if not in JSON-LD
    if (!otherNames) {
      $('.elementor-heading-title').each((_, el) => {
        if ($(el).text().trim() === 'ALTERNATIVE NAMES') {
          otherNames = $(el).closest('.elementor-widget-heading').next('.elementor-widget-text-editor').text().trim();
        }
      });
    }
    
    const description = $('.elementor-widget-text-editor p').first().text().trim();
    
    // Extract Physical Properties (often the technical description)
    const physicalProperties = $('.product-detail-technical .elementor-widget-text-editor').text().trim();

    // Extract Toggles (Applications, Safety, Packaging)
    let applications = '';
    let safetyHandling = '';
    let packaging = '';
    
    $('.elementor-toggle-item').each((_, el) => {
      const title = $(el).find('.elementor-toggle-title').text().trim().toUpperCase();
      const content = $(el).find('.elementor-tab-content').text().trim();
      
      if (title.includes('APPLICATIONS')) {
        applications = content;
      } else if (title.includes('SAFETY') || title.includes('RISK')) {
        safetyHandling = content;
      } else if (title.includes('PACKAGING')) {
        packaging = content;
      }
    });

    // Extract Related Products
    const relatedProducts: string[] = [];
    $('.uh-related-product-title-inner').each((_, el) => {
      relatedProducts.push($(el).text().trim());
    });

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

    // Extract category
    let category = '';
    $('.breadcrumbs a.urunler_category').each((_, el) => {
      category = $(el).text().trim();
    });
    
    // Extract industries from article class
    const industries: string[] = [];
    $('article').each((_, el) => {
      const classes = $(el).attr('class') || '';
      const matches = classes.match(/sector-([a-z0-9-]+)/g);
      if (matches) {
        matches.forEach(m => {
          const sector = m.replace('sector-', '').replace(/-/g, ' ');
          // Capitalize words
          industries.push(sector.replace(/\b\w/g, l => l.toUpperCase()));
        });
      }
    });
    
    // Deduplicate industries
    const uniqueIndustries = [...new Set(industries)];
    
    return {
      name,
      slug: url.split('/').filter(Boolean).pop(),
      cas,
      ec,
      foodCode,
      formula,
      mw,
      otherNames,
      category,
      industry: uniqueIndustries,
      description,
      physicalProperties,
      safetyHandling,
      tradeRegulatory: packaging, // Mapping packaging to tradeRegulatory for now
      relatedProducts,
      url
    };
  } catch (e) {
    console.error(`Error fetching ${url}:`, e);
    return null;
  }
}

async function main() {
  const products = [];
  const batchSize = 20;
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`Processing batch ${i / batchSize + 1} of ${Math.ceil(urls.length / batchSize)}...`);
    const results = await Promise.all(batch.map(async (url) => {
      const product = await fetchProduct(url);
      if (product) console.log(`Scraped: ${product.name}`);
      return product;
    }));
    products.push(...results.filter(Boolean));
  }
  
  fs.writeFileSync('scraped_products.json', JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to scraped_products.json`);
}

main();
