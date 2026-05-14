import React, { useState, useEffect } from 'react';
import { Search, Phone, ClipboardList, Menu, X, ChevronRight, Beaker, Factory, ShieldCheck, ArrowRight, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import QuoteModal from './QuoteModal';

const INDUSTRIES_MENU = [
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
  { name: "Water Treatment", slug: "water-treatment" },
];

const TOP_CATEGORIES = [
  "Agrochemicals","Alcohols & Glycols","Alkalis & Bases","Amines","Amino Acids & Peptides",
  "Catalysts & Catalyst Precursors","Chelating Agents","Flame Retardants",
  "Flavors & Fragrances","Heterocyclic Compounds","Inorganic Acids","Monomers & Building Blocks",
  "Nucleosides & Nucleotides","Oils, Fats & Waxes","Organic Acids","Organometallic Compounds",
  "Oxidizers & Peroxides","Pharmaceutical Intermediates","Pigments & Colorants",
  "Polymers & Resins","Salts & Minerals","Silicones & Silicates","Solvents",
  "Surfactants","Sweeteners & Food Additives","UV Absorbers & Stabilizers","Vitamins & Nutrients"
];

const MANUFACTURING_SERVICES = [
  { name: "Custom Formulations", icon: Beaker, desc: "Tailored chemical formulations to meet your exact specifications.", link: "/manufacturing" },
  { name: "Toll Manufacturing", icon: Factory, desc: "Efficient production using your raw materials and our advanced facilities.", link: "/manufacturing" },
  { name: "Quality & Compliance", icon: ShieldCheck, desc: "ISO 9001 & ISO 22000 certified with full batch documentation.", link: "/manufacturing" },
  { name: "Blending & Masterbatches", icon: Package, desc: "Precise mixing and blending services for various chemical applications.", link: "/manufacturing" }
];

interface NavbarProps { currentPath?: string; }

export default function Navbar({ currentPath = '/' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const isLightMode = isScrolled || activeMegaMenu !== null || currentPath !== '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
      setIsMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isLightMode ? "bg-white dark:bg-slate-900 shadow-md border-b border-gray-200 dark:border-slate-800" : "bg-transparent")} onMouseLeave={() => setActiveMegaMenu(null)}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src={isLightMode ? "https://www.solechem.eu/solechem-logo-small.webp" : "https://www.solechem.eu/solechem-logo-white.webp"} alt="SoleChem Logo" className="h-12 w-auto object-contain" />
        </a>
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search CAS, formula, or product..." className="w-full h-9 pl-10 pr-12 bg-gray-100/50 dark:bg-slate-800 border border-gray-200/50 dark:border-slate-700 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white placeholder:text-gray-400" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400 border border-gray-200/50 dark:border-slate-700 px-1 rounded">⌘K</div>
        </form>
        <div className="hidden lg:flex items-center h-full">
          <div className="h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => setActiveMegaMenu('products')}>
            <a href="/products" className={cn("text-sm font-semibold transition-colors", currentPath === '/products' ? "text-orange-600" : (isLightMode ? "text-slate-600 dark:text-slate-300 hover:text-orange-600" : "text-white/80 hover:text-white"))}>Products</a>
          </div>
          <div className="h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => setActiveMegaMenu('industries')}>
            <a href="/industries" className={cn("text-sm font-semibold transition-colors", currentPath === '/industries' ? "text-orange-600" : (isLightMode ? "text-slate-600 dark:text-slate-300 hover:text-orange-600" : "text-white/80 hover:text-white"))}>Industries</a>
          </div>
          <div className="h-full flex items-center px-4 cursor-pointer" onMouseEnter={() => setActiveMegaMenu('manufacturing')}>
            <a href="/manufacturing" className={cn("text-sm font-semibold transition-colors", currentPath === '/manufacturing' ? "text-orange-600" : (isLightMode ? "text-slate-600 dark:text-slate-300 hover:text-orange-600" : "text-white/80 hover:text-white"))}>Manufacturing</a>
          </div>
          <a href="/about" className={cn("text-sm font-semibold transition-colors px-4", currentPath === '/about' ? "text-orange-600" : (isLightMode ? "text-slate-600 dark:text-slate-300 hover:text-orange-600" : "text-white/80 hover:text-white"))} onMouseEnter={() => setActiveMegaMenu(null)}>About</a>
          <a href="/contact" className={cn("text-sm font-semibold transition-colors px-4", currentPath === '/contact' ? "text-orange-600" : (isLightMode ? "text-slate-600 dark:text-slate-300 hover:text-orange-600" : "text-white/80 hover:text-white"))} onMouseEnter={() => setActiveMegaMenu(null)}>Contact</a>
        </div>
        <div className="flex items-center gap-4 shrink-0" onMouseEnter={() => setActiveMegaMenu(null)}>
          <button onClick={() => setIsQuoteModalOpen(true)} className="hidden sm:flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 h-9 rounded-sm text-xs font-bold transition-all active:scale-95">SUBMIT RFQ</button>
          <button className={cn("lg:hidden p-2", isLightMode ? "text-slate-600" : "text-white")} onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </div>

      <AnimatePresence>
        {activeMegaMenu === 'products' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-6"><div className="flex gap-8">
              <div className="w-56 shrink-0"><h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2"><Beaker className="w-5 h-5 text-orange-600" /> Categories</h3><p className="text-[13px] text-slate-500 mb-6 leading-relaxed">Browse 27 categories across 4,483+ chemical products.</p><a href="/categories" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">View All <ArrowRight className="w-4 h-4" /></a></div>
              <div className="flex-1 grid grid-cols-3 gap-x-6 gap-y-1 border-l border-gray-100 pl-8">{TOP_CATEGORIES.map(cat => (<a key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className="group flex items-center justify-between py-2 px-3 rounded hover:bg-orange-50 transition-colors"><span className="text-[13px] font-semibold text-slate-700 group-hover:text-orange-700">{cat}</span><ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all" /></a>))}</div>
            </div></div>
          </motion.div>
        )}
        {activeMegaMenu === 'industries' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-6"><div className="flex gap-8">
              <div className="w-56 shrink-0"><h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2"><Factory className="w-5 h-5 text-orange-600" /> Industries</h3><p className="text-[13px] text-slate-500 mb-6 leading-relaxed">Specialized chemical solutions for 20 industrial sectors.</p><a href="/industries" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">Explore All <ArrowRight className="w-4 h-4" /></a></div>
              <div className="flex-1 grid grid-cols-3 gap-x-6 gap-y-1 border-l border-gray-100 pl-8">{INDUSTRIES_MENU.map(ind => (<a key={ind.slug} href={`/industries/${ind.slug}`} className="group flex items-center justify-between py-2 px-3 rounded hover:bg-slate-50 transition-colors"><span className="text-[13px] font-semibold text-slate-700 group-hover:text-orange-600 transition-colors">{ind.name}</span><ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all" /></a>))}</div>
            </div></div>
          </motion.div>
        )}
        {activeMegaMenu === 'manufacturing' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 py-8"><div className="flex gap-12">
              <div className="w-1/3"><h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2"><Factory className="w-5 h-5 text-orange-600" /> Manufacturing Services</h3><p className="text-sm text-slate-500 mb-6 leading-relaxed">More than just a distributor, we are your strategic manufacturing partner.</p><a href="/manufacturing" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">Explore Manufacturing <ArrowRight className="w-4 h-4" /></a></div>
              <div className="w-2/3 grid grid-cols-2 gap-6 border-l border-gray-100 pl-12">{MANUFACTURING_SERVICES.map((sol, i) => (<a key={i} href={sol.link} className="group flex gap-4 p-4 rounded-2xl hover:bg-orange-50/50 transition-colors cursor-pointer border border-transparent hover:border-orange-100"><div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-600 transition-colors"><sol.icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" /></div><div><h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-orange-700">{sol.name}</h4><p className="text-xs text-slate-500 leading-relaxed">{sol.desc}</p></div></a>))}</div>
            </div></div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 p-4 flex flex-col gap-4 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          <form onSubmit={handleSearch} className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search CAS, formula, or product..." className="w-full h-12 pl-10 pr-4 bg-gray-100 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white transition-all text-slate-900" /></form>
          <div className="flex items-center justify-between gap-3 py-2">
            <a href="tel:+390230556150" className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-900 py-3 rounded-xl font-bold text-sm"><Phone className="w-4 h-4 text-orange-600" />Call Us</a>
            <button onClick={() => { setIsMenuOpen(false); setIsQuoteModalOpen(true); }} className="flex-1 flex items-center justify-center gap-2 bg-orange-50 text-orange-600 py-3 rounded-xl font-bold text-sm"><ClipboardList className="w-5 h-5" />Submit RFQ</button>
          </div>
          <div className="h-px bg-gray-100 my-1" />
          <div className="flex flex-col">
            <a href="/products" className="text-lg font-bold text-slate-900 py-3 border-b border-gray-50 flex items-center justify-between">Products <ChevronRight className="w-5 h-5 text-gray-300" /></a>
            <a href="/industries" className="text-lg font-bold text-slate-900 py-3 border-b border-gray-50 flex items-center justify-between">Industries <ChevronRight className="w-5 h-5 text-gray-300" /></a>
            <a href="/about" className="text-lg font-bold text-slate-900 py-3 border-b border-gray-50 flex items-center justify-between">About Us <ChevronRight className="w-5 h-5 text-gray-300" /></a>
            <a href="/contact" className="text-lg font-bold text-slate-900 py-3 border-b border-gray-50 flex items-center justify-between">Contact <ChevronRight className="w-5 h-5 text-gray-300" /></a>
          </div>
        </div>
      )}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </nav>
  );
}
