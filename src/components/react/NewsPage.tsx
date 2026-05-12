import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Tag, Search, Newspaper } from 'lucide-react';
import { cn } from '../../lib/utils';

const CATEGORIES = ['All', 'Company News', 'Industry Insights', 'Product Updates', 'Events', 'Partnerships'];

const NEWS_ITEMS = [
  {
    id: 1,
    title: 'SoleChem Expands Distribution Network Across the Middle East',
    excerpt: 'We are proud to announce new strategic partnerships in the MENA region, strengthening our supply chain capabilities and enabling faster delivery to clients across the Gulf states.',
    category: 'Partnerships',
    date: '2026-04-28',
    readTime: '4 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'ISO 22000:2018 Certification Successfully Renewed',
    excerpt: 'SoleChem has successfully renewed its ISO 22000:2018 certification, reaffirming our commitment to food safety management across our product lines.',
    category: 'Company News',
    date: '2026-04-15',
    readTime: '3 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'New Product Line: High-Purity Pharmaceutical Intermediates',
    excerpt: 'Introducing our expanded range of pharmaceutical intermediates, manufactured under strict GMP conditions to meet the demanding requirements of the pharma industry.',
    category: 'Product Updates',
    date: '2026-04-02',
    readTime: '5 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    title: 'SoleChem at ChemSpec Europe 2026 – Visit Us in Milan',
    excerpt: 'Join us at ChemSpec Europe 2026 in Milan. Meet our team of technical specialists and discover our latest chemical solutions for your industry.',
    category: 'Events',
    date: '2026-03-20',
    readTime: '2 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    title: 'Sustainability Report 2025: Our Commitment to Green Chemistry',
    excerpt: 'Our annual sustainability report highlights key achievements in reducing carbon emissions, sustainable sourcing practices, and our roadmap for a greener future.',
    category: 'Company News',
    date: '2026-03-10',
    readTime: '6 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    title: 'Global Chemical Market Trends: Q1 2026 Analysis',
    excerpt: 'Our quarterly market analysis covers pricing trends, supply chain disruptions, and demand forecasts for key chemical segments across Europe and Asia.',
    category: 'Industry Insights',
    date: '2026-02-28',
    readTime: '7 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 7,
    title: 'New Warehouse Facility Opens in Southern Italy',
    excerpt: 'Our new 5,000 sqm warehouse in Bari enables faster distribution across Southern Europe and the Mediterranean, reducing delivery times by up to 40%.',
    category: 'Company News',
    date: '2026-02-15',
    readTime: '3 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 8,
    title: 'Strategic Partnership with Leading Asian Manufacturers',
    excerpt: 'SoleChem announces new exclusive distribution agreements with top-tier chemical manufacturers in China and India, expanding our product portfolio significantly.',
    category: 'Partnerships',
    date: '2026-01-30',
    readTime: '4 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
  },
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default function NewsPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = NEWS_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredItems = NEWS_ITEMS.filter(n => n.featured);
  const regularItems = filtered.filter(n => !n.featured || activeCategory !== 'All' || searchQuery);

  return (
    <>
      {activeCategory === 'All' && !searchQuery && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <h2 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.3em] mb-8">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredItems.map((item) => (
                <article key={item.id} className="group relative bg-white rounded-sm border border-slate-200 overflow-hidden hover:border-orange-500 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">{item.category}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white leading-tight group-hover:text-orange-200 transition-colors">{item.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-[14px] text-slate-600 leading-relaxed font-medium line-clamp-2">{item.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(item.date)}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {item.readTime}</span>
                      </div>
                      <span className="text-orange-600 font-bold text-[12px] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-8 bg-slate-50 border-y border-slate-200 sticky top-[72px] z-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={cn("px-4 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all border", activeCategory === cat ? "bg-orange-600 text-white border-orange-600" : "bg-white text-slate-600 border-slate-200 hover:border-orange-500 hover:text-orange-600")}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search articles..." className="w-full h-10 bg-white border border-slate-200 rounded-sm pl-10 pr-4 text-[13px] text-slate-900 placeholder:text-slate-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {regularItems.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">No articles found</h3>
              <p className="text-[14px] text-slate-500 font-medium">Try adjusting your search or filter criteria.</p>
              <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="text-orange-600 font-bold text-[12px] uppercase tracking-widest hover:text-orange-700 transition-colors">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularItems.map((item) => (
                <article key={item.id} className="group bg-white rounded-sm border border-slate-200 overflow-hidden hover:border-orange-500 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-slate-200 flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-orange-600" /> {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(item.date)}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="text-[16px] font-bold text-slate-900 leading-snug mb-3 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium line-clamp-3 flex-1">{item.excerpt}</p>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <span className="text-orange-600 font-bold text-[11px] uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-3 transition-all">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
