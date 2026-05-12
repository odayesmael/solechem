import productsData from './products-full.json';
import industriesData from './industries-full.json';
import categoriesData from './categories-full.json';
import type { Product, Industry } from '../types';

export const PRODUCTS: Product[] = productsData as Product[];
export const INDUSTRIES: Industry[] = industriesData as Industry[];
export const CATEGORIES: any[] = categoriesData;
