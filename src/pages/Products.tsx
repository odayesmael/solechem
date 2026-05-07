import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Grid, List, ArrowRight, ChevronRight, ChevronLeft, Info, X, ShieldCheck, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '@/constants';
import { cn } from '@/lib/utils';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialIndustry = searchParams.get('industry');

  const [view, setView] = useState<'grid' | 'list'>('list');
  const [search, setSearch] = useState(initialSearch);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filter States
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeIndustries, setActiveIndustries] = useState<string[]>(initialIndustry ? [initialIndustry] : []);
  const [activeGrades, setActiveGrades] = useState<string[]>([]);
  const [activeCompliances, setActiveCompliances] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(() => parseInt(searchParams.get('page') || '1', 10));
  const ITEMS_PER_PAGE = 50;

  // Update state when URL changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearch(q);
    }
    
    const category = searchParams.get('category');
    if (category) {
      setActiveCategory(category);
    }

    const industry = searchParams.get('industry');
    if (industry) {
      setActiveIndustries([industry]);
    }
  }, [searchParams]);

  // Update URL when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  // Extract unique filter options from data
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category))).sort()];
  const industries = Array.from(new Set(PRODUCTS.flatMap(p => p.industry)));
  const grades = Array.from(new Set(PRODUCTS.map(p => p.grade)));
  const compliances = Array.from(new Set(PRODUCTS.flatMap(p => p.compliance || []))).filter(c => c !== "REACH");

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory, activeIndustries, activeGrades, activeCompliances]);

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                           (p.cas || "").includes(search) || 
                           p.category.toLowerCase().includes(search.toLowerCase());
                           
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;

      const matchesIndustry = activeIndustries.length === 0 || activeIndustries.some(i => p.industry.includes(i));
      const matchesGrade = activeGrades.length === 0 || activeGrades.includes(p.grade);
      const matchesCompliance = activeCompliances.length === 0 || activeCompliances.every(c => (p.compliance || []).includes(c));

      return matchesSearch && matchesCategory && matchesIndustry && matchesGrade && matchesCompliance;
    });
  }, [search, activeCategory, activeIndustries, activeGrades, activeCompliances]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFilters = [
    ...(activeCategory !== 'All' ? [{ type: 'category', value: activeCategory, remove: () => setActiveCategory('All') }] : []),
    ...activeIndustries.map(i => ({ type: 'industry', value: i, remove: () => toggleFilter(setActiveIndustries, i) })),
    ...activeGrades.map(g => ({ type: 'grade', value: g, remove: () => toggleFilter(setActiveGrades, g) })),
    ...activeCompliances.map(c => ({ type: 'compliance', value: c, remove: () => toggleFilter(setActiveCompliances, c) }))
  ];

  const clearAllFilters = () => {
    setActiveCategory('All');
    setActiveIndustries([]);
    setActiveGrades([]);
    setActiveCompliances([]);
    setSearch('');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Organic Acids': 'border-l-orange-500',
      'Surfactants': 'border-l-blue-500',
      'Solvents': 'border-l-purple-500',
      'Amines': 'border-l-green-500',
      'Alcohols & Glycols': 'border-l-teal-500',
      'Alkalis': 'border-l-red-500'
    };
    return colors[category] || 'border-l-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white">Products</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={cn(
            "lg:w-72 shrink-0 space-y-6 transition-all duration-300",
            !isSidebarOpen && "lg:w-0 lg:opacity-0 lg:pointer-events-none lg:overflow-hidden"
          )}>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  Filters
                </h3>
                {activeFilters.length > 0 && (
                  <button onClick={clearAllFilters} className="text-xs font-semibold text-slate-500 hover:text-orange-600 dark:hover:text-orange-500 transition-colors">
                    Clear All
                  </button>
                )}
              </div>

              <div className="p-0">
                {/* Category */}
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-3">Categories</h4>
                  <div className="flex flex-col space-y-0.5">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-none text-[13px] font-medium transition-colors border-l-2",
                          activeCategory === cat ? "bg-orange-50/50 text-orange-700 border-orange-500 font-semibold dark:bg-orange-500/10 dark:text-orange-400" : "border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry */}
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-3">Industry</h4>
                  <div className="space-y-2.5">
                    {industries.map(ind => (
                      <label key={ind} className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input 
                            type="checkbox" 
                            checked={activeIndustries.includes(ind)}
                            onChange={() => toggleFilter(setActiveIndustries, ind)}
                            className="peer w-4 h-4 appearance-none rounded-sm border-2 border-slate-300 dark:border-slate-600 checked:bg-orange-500 checked:border-orange-500 bg-white dark:bg-slate-800 transition-all cursor-pointer" 
                          />
                          <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white leading-tight transition-colors">{ind}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Grade/Purity */}
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-3">Grade / Purity</h4>
                  <div className="space-y-2.5">
                    {grades.map(grade => (
                      <label key={grade} className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input 
                            type="checkbox" 
                            checked={activeGrades.includes(grade)}
                            onChange={() => toggleFilter(setActiveGrades, grade)}
                            className="peer w-4 h-4 appearance-none rounded-sm border-2 border-slate-300 dark:border-slate-600 checked:bg-orange-500 checked:border-orange-500 bg-white dark:bg-slate-800 transition-all cursor-pointer" 
                          />
                          <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white leading-tight transition-colors">{grade}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Compliance */}
                <div className="p-5">
                  <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-3">Compliance</h4>
                  <div className="space-y-2.5">
                    {compliances.map(c => (
                      <label key={c} className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                          <input 
                            type="checkbox" 
                            checked={activeCompliances.includes(c)}
                            onChange={() => toggleFilter(setActiveCompliances, c)}
                            className="peer w-4 h-4 appearance-none rounded-sm border-2 border-slate-300 dark:border-slate-600 checked:bg-orange-500 checked:border-orange-500 bg-white dark:bg-slate-800 transition-all cursor-pointer" 
                          />
                          <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white leading-tight transition-colors">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-5">
            {/* Search & Toolbar */}
            <div className="bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative flex-1 w-full flex items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-3">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search by product name, CAS number, or formula..." 
                  className="w-full h-10 pl-3 bg-transparent text-[13px] font-medium focus:outline-none transition-all dark:text-white dark:placeholder-slate-400"
                />
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={cn("p-2 transition-colors", isSidebarOpen ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100")}
                  title="Toggle Filters"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
                <button 
                  onClick={() => setView('grid')}
                  className={cn("p-2 transition-colors", view === 'grid' ? "text-slate-900 bg-slate-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100")}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={cn("p-2 transition-colors", view === 'list' ? "text-slate-900 bg-slate-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100")}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Filters Chips */}
            <AnimatePresence>
              {activeFilters.length > 0 && (
                <motion.div 
                  key="active-filters-container"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 items-center pb-2"
                >
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mr-2">Active Filters:</span>
                  {activeFilters.map((filter, idx) => (
                    <motion.div 
                      key={`${filter.type}-${filter.value}-${idx}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-sm text-xs font-medium shadow-sm"
                    >
                      <span className="opacity-50 capitalize mr-1">{filter.type}:</span>
                      {filter.value}
                      <button onClick={filter.remove} className="ml-1 p-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                  <button onClick={clearAllFilters} className="text-xs font-semibold text-orange-600 hover:text-orange-700 underline ml-2">
                    Clear All
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Info */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800">
              <p className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                <span className="text-slate-900 dark:text-white font-bold">{filteredProducts.length}</span> products matching your criteria
              </p>
              <select className="bg-transparent border-none text-[13px] font-medium text-slate-900 dark:text-white focus:ring-0 cursor-pointer outline-none dark:bg-slate-900 p-0 hover:text-orange-600 transition-colors">
                <option>Sort: Name A–Z</option>
                <option>Sort: Most Requested</option>
                <option>Sort: Newest</option>
              </select>
            </div>

            {/* Product Grid/List */}
            <div className={cn(
              "grid gap-4",
              view === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 gap-0 border-y border-slate-200 dark:border-slate-800"
            )}>
              {view === 'list' && paginatedProducts.length > 0 && (
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <div className="col-span-4">Product</div>
                  <div className="col-span-2">CAS Number</div>
                  <div className="col-span-2">Formula</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>
              )}

              <AnimatePresence mode="popLayout">
                {paginatedProducts.map((product, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    key={`${product.name}-${product.cas}-${currentPage}-${index}`}
                    className={cn(
                      "group relative bg-white dark:bg-slate-900 transition-all duration-300 flex flex-col",
                      view === 'grid' 
                        ? "border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-orange-500/50 hover:-translate-y-1 overflow-hidden" 
                        : "border-b border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    {view === 'grid' ? (
                      <div className="p-4 flex flex-col h-full z-10">
                        <div className="flex-1 space-y-3 relative">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{product.category}</span>
                          </div>
                          
                          <div>
                            <Link to={`/products/${product.slug}`} className="text-base font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:hover:text-orange-400 transition-colors tracking-tight line-clamp-2">
                              {product.name}
                            </Link>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                              <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 uppercase font-semibold">CAS Number</span>
                                <span className="text-[13px] font-mono font-medium text-slate-700 dark:text-slate-300">{product.cas}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 uppercase font-semibold">Formula</span>
                                <span className="text-[13px] font-mono font-medium text-slate-700 dark:text-slate-300">{product.formula}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {(product.compliance || []).filter((c: string) => c !== "REACH").slice(0, 3).map((c: string, cIdx: number) => (
                              <span key={`comp-${c}-${cIdx}`} className="text-[10px] font-semibold border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-slate-50 dark:bg-slate-800">
                                <ShieldCheck className="w-3 h-3 text-slate-400" /> {c}
                              </span>
                            ))}
                            {(product.compliance || []).filter((c: string) => c !== "REACH").length > 3 && (
                              <span className="text-[10px] font-semibold border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800">
                                +{(product.compliance || []).filter((c: string) => c !== "REACH").length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3 relative z-30">
                          <div className="flex flex-col space-y-1 mb-2">
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Primary Industry</span>
                            <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 line-clamp-1">{product.industry[0]}</span>
                          </div>
                          <Link to={`/products/${product.slug}`} className="w-full flex items-center justify-center gap-1.5 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900 h-9 font-bold text-xs transition-colors rounded-sm uppercase tracking-wider">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Link to={`/products/${product.slug}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-2 items-center z-10 w-full group">
                        <div className="col-span-1 md:col-span-4">
                          <div className="font-semibold text-[13px] text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-1">{product.name}</div>
                          <div className="text-[11px] text-slate-500 md:hidden mt-1 font-mono">CAS: {product.cas}</div>
                        </div>
                        <div className="hidden md:block col-span-2 font-mono text-[12px] text-slate-600 dark:text-slate-400">
                          {product.cas}
                        </div>
                        <div className="hidden md:block col-span-2 font-mono text-[12px] text-slate-600 dark:text-slate-400 line-clamp-1">
                          {product.formula}
                        </div>
                        <div className="hidden md:block col-span-2">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[9px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 uppercase tracking-widest line-clamp-1 truncate">
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
            </div>            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 mt-12 mb-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={cn(
                            "w-10 h-10 flex items-center justify-center text-[13px] font-semibold transition-colors border-y border-transparent",
                            currentPage === page 
                              ? "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20" 
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                          )}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page} className="text-slate-400 dark:text-slate-500 px-3 w-10 flex justify-center">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="py-24 text-center space-y-4 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto">
                  <Filter className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">No products found</h4>
                <p className="text-[13px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">We couldn't find any products matching your current filter criteria. Try adjusting your selections or search terms.</p>
                <button onClick={clearAllFilters} className="bg-white border border-slate-200 hover:border-orange-500 text-slate-900 px-6 py-2.5 font-semibold text-[13px] transition-all mt-4 hover:shadow-sm">
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

