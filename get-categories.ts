import { PRODUCTS } from './src/constants';
const categories = [...new Set(PRODUCTS.map(p => p.category))];
console.log(JSON.stringify(categories, null, 2));
