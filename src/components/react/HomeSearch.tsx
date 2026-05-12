import { useState } from 'react';
import { Search, ArrowRight, Factory, ChevronRight } from 'lucide-react';
import type { Product, Industry } from '../../types';

interface Props {
  industries: { slug: string; name: string }[];
  products: { id: number; name: string; cas: string; slug: string; category: string }[];
}

export default function HomeSearch({ industries, products }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('q', searchQuery.trim());
    if (selectedIndustry) params.append('industry', selectedIndustry);
    window.location.href = `/products?${params.toString()}`;
  };

  const searchSuggestions = products.filter(p =>
    searchQuery.trim() && (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cas.includes(searchQuery)
    )
  ).slice(0, 5);

  return (
    <div className="pt-8 pb-4 w-full max-w-5xl mx-auto relative z-30 flex justify-center">
      <form onSubmit={handleSearch} className="bg-white p-2 md:p-3 rounded flex flex-col md:flex-row gap-2 shadow-2xl text-left relative w-full">
        <div className="relative w-full group flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-slate-800 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search by CAS, Formula, or Name..."
            className="w-full h-14 pl-12 pr-4 bg-slate-50 hover:bg-slate-100 text-slate-900 placeholder:text-slate-500 outline-none focus:bg-slate-100 rounded transition-all border border-transparent focus:border-slate-300"
          />
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded shadow-2xl border border-slate-200 overflow-hidden z-50">
              {searchSuggestions.map(product => (
                <a
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-slate-900">{product.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5 font-mono">CAS: {product.cas} <span className="mx-1 font-sans">•</span> {product.category}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="w-px bg-slate-200 hidden md:block mx-1" />

        <div className="relative md:w-64 group shrink-0">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Factory className="w-5 h-5 text-slate-400 group-focus-within:text-slate-800 transition-colors" />
          </div>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full h-14 pl-12 pr-10 bg-slate-50 hover:bg-slate-100 text-slate-900 outline-none focus:bg-slate-100 rounded transition-all appearance-none cursor-pointer border border-transparent focus:border-slate-300 font-medium"
          >
            <option value="">All Industries</option>
            {industries.map(ind => (
              <option key={ind.slug} value={ind.name}>{ind.name}</option>
            ))}
          </select>
          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90 pointer-events-none" />
        </div>

        <button
          type="submit"
          aria-label="Search"
          className="bg-orange-600 hover:bg-orange-700 text-white w-full md:w-32 h-14 rounded flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0 font-medium"
        >
          <Search className="w-5 h-5" />
          <span className="md:hidden">Search</span>
        </button>
      </form>
    </div>
  );
}
