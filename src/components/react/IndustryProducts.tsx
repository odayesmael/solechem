import { useState } from 'react';
import { ChevronRight, Package, ArrowRight, ShieldCheck, Search, Grid, List } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Product, Industry } from '../../types';

interface Props {
  industry: Industry;
  products: Product[];
}

export default function IndustryProducts({ industry, products }: Props) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('list');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.cas.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-20">
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="bg-slate-900 p-6 rounded-sm text-white shadow-sm border border-slate-800">
            <h3 className="text-[13px] uppercase tracking-widest font-bold mb-2">Need a Custom Solution?</h3>
            <p className="text-[12px] text-slate-400 mb-6 leading-relaxed font-medium">We offer toll manufacturing and custom blending for the {industry.name} sector.</p>
            <a href="/contact" className="inline-flex items-center justify-center w-full bg-slate-800 hover:bg-slate-700 text-white gap-2 font-semibold text-[12px] uppercase tracking-widest transition-colors py-2.5 rounded-sm border border-slate-700">
              Discuss Project <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 w-full space-y-5">
          <div className="bg-white p-3 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full flex items-center bg-slate-50 border border-slate-200 px-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${industry.name} products...`}
                className="w-full h-10 pl-3 bg-transparent text-[13px] font-medium focus:outline-none transition-all text-slate-900 placeholder-slate-400"
              />
            </div>
            <div className="flex items-center gap-1 shrink-0 px-2">
              <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />
              <button
                onClick={() => setView('grid')}
                className={cn("p-2 transition-colors hidden sm:block", view === 'grid' ? "text-slate-900 bg-slate-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100")}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={cn("p-2 transition-colors hidden sm:block", view === 'list' ? "text-slate-900 bg-slate-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100")}
              >
                <List className="w-4 h-4" />
              </button>
              <div className="text-[13px] font-medium text-slate-600 ml-2">
                <span className="font-bold text-slate-900">{filteredProducts.length}</span> Products
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={cn(
              "grid gap-4",
              view === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 gap-0 border-y border-slate-200"
            )}>
              {view === 'list' && (
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <div className="col-span-4">Product</div>
                  <div className="col-span-2">CAS Number</div>
                  <div className="col-span-2">Formula</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>
              )}
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={cn(
                    "group relative bg-white transition-all duration-300 flex flex-col",
                    view === 'grid'
                      ? "border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-500/50 hover:-translate-y-1 overflow-hidden"
                      : "border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  )}
                >
                  {view === 'grid' ? (
                    <div className="p-4 flex flex-col h-full z-10">
                      <div className="flex-1 space-y-3 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{product.category}</span>
                        </div>
                        <div>
                          <a href={`/products/${product.slug}`} className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors tracking-tight line-clamp-2">
                            {product.name}
                          </a>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-400 uppercase font-semibold">CAS Number</span>
                              <span className="text-[13px] font-mono font-medium text-slate-700">{product.cas}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[12px] text-slate-500 font-medium line-clamp-2">{product.description}</p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3 relative z-30">
                        <a href={`/products/${product.slug}`} className="w-full flex items-center justify-center gap-1.5 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white h-9 font-bold text-xs transition-colors rounded-sm uppercase tracking-wider">
                          View Details
                        </a>
                      </div>
                    </div>
                  ) : (
                    <a href={`/products/${product.slug}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-2 items-center z-10 w-full group">
                      <div className="col-span-1 md:col-span-4">
                        <div className="font-semibold text-[13px] text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">{product.name}</div>
                        <div className="text-[11px] text-slate-500 md:hidden mt-1 font-mono">CAS: {product.cas}</div>
                      </div>
                      <div className="hidden md:block col-span-2 font-mono text-[12px] text-slate-600">{product.cas}</div>
                      <div className="hidden md:block col-span-2 font-mono text-[12px] text-slate-600 line-clamp-1">{product.formula}</div>
                      <div className="hidden md:block col-span-2">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[9px] font-semibold bg-slate-100 text-slate-600 uppercase tracking-widest line-clamp-1 truncate">
                          {product.category}
                        </span>
                      </div>
                      <div className="hidden md:flex col-span-2 justify-end">
                        <div className="flex items-center justify-center gap-1 text-slate-400 group-hover:text-orange-600 transition-colors font-medium text-[12px]">
                          <span className="md:hidden lg:inline">Details</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-slate-300 p-16 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4 rounded-sm shadow-sm">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Products Found</h3>
              <p className="text-[13px] text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                We couldn't find any products matching your search criteria in this industry.
              </p>
              <button
                onClick={() => setSearch('')}
                className="mt-6 text-[12px] text-orange-600 font-semibold uppercase tracking-widest hover:text-orange-700 underline transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
