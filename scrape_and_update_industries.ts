import fs from 'fs';
import https from 'https';

const INDUSTRIES = [
  { name: "Aerospace & Defense", slug: "aerospace-defense" },
  { name: "Agriculture & Feed", slug: "agriculture-feed" },
  { name: "Automotive", slug: "automotive" },
  { name: "Biotechnology & Life Sciences", slug: "biotechnology-life-sciences" },
  { name: "Building & Construction", slug: "building-construction" },
  { name: "Coatings, Adhesives, Sealants & Elastomers", slug: "coatings-adhesives-sealants-elastomers" },
  { name: "Electronics", slug: "electronics" },
  { name: "Food & Nutrition", slug: "food-nutrition" },
  { name: "Home Care & Industrial Cleaning", slug: "home-care-industrial-cleaning" },
  { name: "Lubricants & Metalworking", slug: "lubricants-metalworking" },
  { name: "Mining & Metals", slug: "mining-metals" },
  { name: "Oil, Gas & Energy", slug: "oil-gas-energy" },
  { name: "Personal Care & Cosmetics", slug: "personal-care-cosmetics" },
  { name: "Pharmaceuticals & Healthcare", slug: "pharmaceuticals-healthcare" },
  { name: "Plastics & Polymers", slug: "plastics-polymers" },
  { name: "Printing & Packaging", slug: "printing-packaging" },
  { name: "Pulp & Paper", slug: "pulp-paper" },
  { name: "Rubber & Tire", slug: "rubber-tire" },
  { name: "Textile, Leather & Paper", slug: "textile-leather-paper" },
  { name: "Water Treatment", slug: "water-treatment" }
];

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const industryProducts: Record<string, string[]> = {};

  for (const industry of INDUSTRIES) {
    console.log(`Fetching ${industry.name}...`);
    try {
      // The website has pagination, we might need to fetch multiple pages.
      // Let's check if there's pagination by fetching the first page.
      let page = 1;
      let hasMore = true;
      industryProducts[industry.name] = [];

      while (hasMore) {
        const url = `https://www.solechem.eu/industries/${industry.slug}?page=${page}`;
        const html = await fetchUrl(url);
        
        // Extract products using regex. The products are usually in an <a> tag with class "product-card" or similar, 
        // or <h3 class="product-name">...</h3>
        const regex = /<h3[^>]*>([^<]+)<\/h3>/g;
        let match;
        let foundOnPage = 0;
        while ((match = regex.exec(html)) !== null) {
          const productName = match[1].trim();
          // Filter out some common non-product h3s if any, but usually they are products.
          if (productName && !productName.includes("Quick Links") && !productName.includes("Company")) {
            industryProducts[industry.name].push(productName);
            foundOnPage++;
          }
        }
        
        // Check if there's a "Next" page link or if foundOnPage is 0
        if (foundOnPage === 0 || !html.includes('rel="next"')) {
          hasMore = false;
        } else {
          page++;
        }
      }
      console.log(`Found ${industryProducts[industry.name].length} products for ${industry.name}`);
    } catch (e) {
      console.error(`Error fetching ${industry.name}:`, e);
    }
  }

  fs.writeFileSync('industry_products.json', JSON.stringify(industryProducts, null, 2));
  console.log("Done fetching.");
}

main();
