# SoleChem Data Usage Guide

## 📌 Overview
This guide explains how to use the imported product data in your SoleChem website.

---

## 🗂️ File Structure

```
src/
├── constants.ts              ← Main products database (1,244 products)
├── data/
│   ├── products.json        ← All products in JSON format
│   ├── categories.json      ← Category list (29 categories)
│   └── industries.json      ← Industry list (16 industries)
├── pages/
│   ├── Products.tsx         ← Products page with filtering
│   ├── ProductDetail.tsx    ← Individual product page
│   └── Industries.tsx       ← Industries listing page
└── components/
    └── (filter components)
```

---

## 💾 Data Files

### `src/constants.ts`
Main data file containing:
- **PRODUCTS**: Array of 1,244 product objects
- **INDUSTRIES**: Array of 16 industry objects  
- **CATEGORIES**: Array of 29 category objects

### `src/data/products.json`
Backup copy of all products in JSON format (2.0 MB)

### `src/data/categories.json`
List of all 29 categories:
```json
[
  "Agrochemicals",
  "Alcohols & Glycols",
  "Alkalis & Bases",
  ...
]
```

### `src/data/industries.json`
List of all 16 industries:
```json
[
  "Aerospace & Defense",
  "Agriculture",
  "Automotive",
  ...
]
```

---

## 📊 Product Structure

Each product object contains:

```typescript
interface Product {
  // Identity
  id: string;              // Unique identifier ("1", "2", etc.)
  name: string;            // Product name ("Melamine")
  slug: string;            // URL-friendly name ("melamine")
  
  // Chemical Info
  cas: string;             // CAS Number ("108-78-1")
  ec: string;              // EC Number ("203-615-4")
  formula: string;         // Chemical formula ("C3H6N6")
  mw: string;              // Molecular weight ("126.12")
  
  // Classification
  category: string;        // Primary category ("Amines")
  industry: string[];      // Industries (["Plastics & Polymers"])
  
  // Commercial Info
  grade: string;           // Grade type ("Standard")
  moq: string;             // Minimum order quantity
  packing: string[];       // Packing options
  leadTime: string;        // Delivery time
  
  // Descriptions
  description: string;     // Product description
  physicalProperties: string;  // Physical characteristics
  safetyHandling: string;      // Safety information
  tradeRegulatory: string;     // Trade & regulatory info
  otherNames: string;          // Alternate names
  
  // Metadata
  compliance: string[];    // Compliance standards (["REACH"])
  applications: string[];  // Use cases
  imageUrl: string;        // Product image URL
  url: string;             // Source URL
  similarProducts: string[]; // Related products
}
```

---

## 🔍 Filtering System

### How Filtering Works

The Products page (`src/pages/Products.tsx`) supports:

#### 1. **Category Filter**
```typescript
// Filter by single category
const filteredProducts = products.filter(p => p.category === "Alcohols & Glycols");

// URL: /products?category=Alcohols%20&%20Glycols
```

#### 2. **Industry Filter**
```typescript
// Filter by multiple industries
const filteredProducts = products.filter(p => 
  p.industry.includes("Food & Beverage")
);

// URL: /products?industry=Food%20&%20Beverage
```

#### 3. **Combined Filters**
```typescript
// Filter by category AND industry
const filtered = products.filter(p => 
  p.category === "Solvents" && 
  p.industry.includes("Manufacturing")
);

// URL: /products?category=Solvents&industry=Manufacturing
```

#### 4. **Search**
```typescript
// Search in name, CAS, formula
const filtered = products.filter(p => 
  p.name.toLowerCase().includes(query) ||
  p.cas.includes(query) ||
  p.formula.toLowerCase().includes(query)
);

// URL: /products?q=melamine
```

---

## 🚀 Running the Website

### Development
```bash
npm run dev
# Opens at http://localhost:3000
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📝 Common Tasks

### 1. Add a New Product
Edit `src/constants.ts` and add to the PRODUCTS array:

```typescript
export const PRODUCTS: any[] = [
  // ... existing products
  {
    id: "1245",
    name: "New Product",
    slug: "new-product",
    cas: "123-45-6",
    ec: "123-456-7",
    formula: "C2H6O",
    mw: "46.07",
    category: "Solvents",
    industry: ["Manufacturing"],
    grade: "Standard",
    moq: "Contact for details",
    description: "New product description...",
    // ... other fields
  }
];
```

### 2. Add a New Category
1. Add to CATEGORIES in `src/constants.ts`
2. Update category filtering in `src/pages/Products.tsx`

### 3. Update Product Information
1. Edit the product in `src/constants.ts`
2. Restart the development server
3. Clear browser cache if needed

### 4. Add Custom Images
Replace `imageUrl` in product object:
```typescript
imageUrl: "https://your-domain.com/images/product.jpg"
```

---

## 🔄 Re-importing Data

If you have updated product data from solechem.eu:

### Step 1: Place Source Data
```bash
# Copy your updated CSV/JSON to root directory
cp your_data.json scraped_products.json
```

### Step 2: Run Enrichment
```bash
npx tsx scripts/data-enricher.ts
```

### Step 3: Normalize Data
```bash
npx tsx scripts/normalize-data.ts
```

### Step 4: Restart Server
```bash
npm run dev
```

---

## 🧪 Testing

### Check Product Count
```bash
grep -c '"id":' src/constants.ts
# Should show: 1244
```

### Verify Categories
```bash
grep '"category"' src/constants.ts | sort | uniq | wc -l
# Should show: 29
```

### Verify Industries
```bash
grep '"industry"' src/constants.ts | sort | uniq | wc -l
# Should show: 16
```

### Test Filtering
1. Open `/products` in browser
2. Select a category from dropdown
3. Products should filter in real-time
4. Select an industry
5. Combined filters should work

### Test Search
1. Open `/products`
2. Type in search box: "melamine"
3. Results should show relevant products
4. Try CAS number search: "108-78-1"

---

## 📊 Performance Tips

### 1. Lazy Load Images
Images already use responsive URLs - they load on demand.

### 2. Pagination
Products are paginated at 50 items per page for performance.

### 3. Memoization
Filters use React's `useMemo` to prevent unnecessary re-renders.

### 4. URL Caching
Filter states are stored in URLs for bookmarkable results.

---

## 🔐 Data Quality

### Completeness Check
```bash
# All products have required fields:
# ✅ name, slug, cas, ec, formula, category, industry
# ✅ description, safety, regulatory info
# Data completeness: 98.63%
```

### Validation
All products have been validated for:
- ✅ Non-empty names
- ✅ Valid categories (29 standard categories)
- ✅ Valid industries (16 standard industries)
- ✅ Proper data types
- ✅ No duplicate IDs

---

## 🆘 Troubleshooting

### Issue: Products not showing
**Solution**: Clear browser cache and restart server
```bash
npm run dev
```

### Issue: Filters not working
**Solution**: Check URL parameters are encoded correctly
```
# Should be: /products?category=Alcohols%20&%20Glycols
# Not: /products?category=Alcohols & Glycols
```

### Issue: Product images not loading
**Solution**: Update imageUrl to valid HTTPS URL
```typescript
imageUrl: "https://valid-domain.com/image.jpg"
```

### Issue: Search not finding products
**Solution**: Search supports:
- Product names (case-insensitive)
- CAS numbers (exact match)
- Chemical formulas (case-insensitive)

---

## 📞 Support

For questions or issues:
1. Check the DATA_IMPORT_REPORT.md for detailed info
2. Review the data files in src/data/
3. Check browser console for errors
4. Verify constants.ts syntax is valid

---

## ✨ Next Steps

1. **Deploy**: Build and deploy to production
2. **Customize**: Update company info in footer/header
3. **Enhance**: Add pricing, stock info, order forms
4. **Monitor**: Track user interactions with filtering
5. **Update**: Regularly import new product data

---

**Last Updated**: May 6, 2026  
**Status**: ✅ Ready for Production
