import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Package, ArrowRight, ShieldCheck, Filter, Search, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INDUSTRIES, PRODUCTS } from '@/constants';
import { cn } from '@/lib/utils';

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = INDUSTRIES.find(i => i.slug === slug);
  
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('list');

  if (!industry) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Industry Not Found</h1>
        <p className="text-slate-500 mb-8">The industry you are looking for does not exist.</p>
        <Link to="/industries" className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors">
          Back to Industries
        </Link>
      </div>
    );
  }

  // Filter products by this industry
  const industryProducts = PRODUCTS.filter(p => 
    p.industry.includes(industry.name) || 
    p.industry.some((ind: string) => ind.toLowerCase() === industry.name.toLowerCase())
  );

  // Apply search filter
  const filteredProducts = industryProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.cas.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50/80 pt-28 pb-16 lg:pt-32 lg:pb-20 mb-12">
        <div className="absolute inset-0 z-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-500 via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-20">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">
            <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/industries" className="hover:text-orange-600 transition-colors">Industries</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900">{industry.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-between">
            <div className="flex-1">
              <h1 className="text-5xl lg:text-7xl font-sans font-bold text-[#0B1528] tracking-tight mb-6">
                {industry.name}
              </h1>
              <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                {industry.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mt-10">
                {(industry.compliance || ['ISO 9001', 'REACH']).map((c: string) => (
                  <span key={c} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-md text-[11px] font-bold tracking-[0.15em] uppercase flex items-center gap-2 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-orange-500" /> {c}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-[320px] lg:w-[420px] aspect-video md:aspect-square lg:aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-md shrink-0 ring-4 ring-white">
              <img 
                src={industry.imageUrl} 
                alt={industry.name} 
                className="w-full h-full object-cover opacity-95 transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-slate-900 p-6 rounded-sm text-white shadow-sm border border-slate-800">
              <h3 className="text-[13px] uppercase tracking-widest font-bold mb-2">Need a Custom Solution?</h3>
              <p className="text-[12px] text-slate-400 mb-6 leading-relaxed font-medium">We offer toll manufacturing and custom blending for the {industry.name} sector.</p>
              <Link to="/contact" className="inline-flex items-center justify-center w-full bg-slate-800 hover:bg-slate-700 text-white gap-2 font-semibold text-[12px] uppercase tracking-widest transition-colors py-2.5 rounded-sm border border-slate-700">
                Discuss Project <ArrowRight className="w-4 h-4" />
              </Link>
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
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
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
                              <Link to={`/products/${product.slug}`} className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors tracking-tight line-clamp-2">
                                {product.name}
                              </Link>
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
                            <Link to={`/products/${product.slug}`} className="w-full flex items-center justify-center gap-1.5 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white h-9 font-bold text-xs transition-colors rounded-sm uppercase tracking-wider">
                              View Details
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <Link to={`/products/${product.slug}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-2 items-center z-10 w-full group">
                          <div className="col-span-1 md:col-span-4">
                            <div className="font-semibold text-[13px] text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">{product.name}</div>
                            <div className="text-[11px] text-slate-500 md:hidden mt-1 font-mono">CAS: {product.cas}</div>
                          </div>
                          <div className="hidden md:block col-span-2 font-mono text-[12px] text-slate-600">
                            {product.cas}
                          </div>
                          <div className="hidden md:block col-span-2 font-mono text-[12px] text-slate-600 line-clamp-1">
                            {product.formula}
                          </div>
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
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
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
    </div>
  );
}
