import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Phone, ClipboardList, Menu, X, ChevronRight, Beaker, Factory, ShieldCheck, Truck, Globe, Leaf, ArrowRight, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { INDUSTRIES } from '@/constants';
import QuoteModal from '@/components/QuoteModal';

// Extract top categories for the mega menu
const TOP_CATEGORIES = [
  "Agrochemicals",
  "Alcohols & Glycols",
  "Alkalis & Bases",
  "Amines",
  "Amino Acids & Peptides",
  "Catalysts & Catalyst Precursors",
  "Chelating Agents",
  "Flame Retardants",
  "Flavors & Fragrances",
  "Heterocyclic Compounds",
  "Inorganic Acids",
  "Monomers & Building Blocks"
];

const MANUFACTURING_SERVICES = [
  { name: "Custom Formulations", icon: Beaker, desc: "Tailored chemical formulations to meet your exact specifications.", link: "/manufacturing" },
  { name: "Toll Manufacturing", icon: Factory, desc: "Efficient production using your raw materials and our advanced facilities.", link: "/manufacturing" },
  { name: "Quality & Compliance", icon: ShieldCheck, desc: "ISO 9001 & ISO 22000 certified with full batch documentation.", link: "/manufacturing" },
  { name: "Blending & Masterbatches", icon: Package, desc: "Precise mixing and blending services for various chemical applications.", link: "/manufacturing" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLightMode = isScrolled || activeMegaMenu !== null || location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMegaMenu(null);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isLightMode ? "bg-white dark:bg-slate-900 shadow-md border-b border-gray-200 dark:border-slate-800" : "bg-transparent"
      )}
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img 
            src={isLightMode ? "https://www.solechem.eu/solechem-logo-small.webp" : "https://www.solechem.eu/solechem-logo-white.webp"} 
            alt="SoleChem Logo" 
            className="h-12 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.insertAdjacentHTML('afterbegin', '<div class="w-12 h-12 bg-orange-600 rounded flex items-center justify-center text-white font-black text-2xl">S</div><span class="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">SOLECHEM<span class="text-orange-600">.EU</span></span>');
            }}
          />
        </Link>

        {/* Search Bar (⌘K) */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search CAS, formula, or product..." 
            className="w-full h-9 pl-10 pr-12 bg-gray-100/50 dark:bg-slate-800 border border-gray-200/50 dark:border-slate-700 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white placeholder:text-gray-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400 border border-gray-200/50 dark:border-slate-700 px-1 rounded">⌘K</div>
        </form>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center h-full">
          {/* Products Mega Menu Trigger */}
          <div 
            className="h-full flex items-center px-4 cursor-pointer"
            onMouseEnter={() => setActiveMegaMenu('products')}
          >
            <Link 
              to="/products" 
              className={cn(
                "text-sm font-semibold transition-colors flex items-center gap-1",
                location.pathname === '/products' ? "text-orange-600" : (isLightMode ? "text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500" : "text-white/80 hover:text-white")
              )}
            >
              Products
            </Link>
          </div>

          {/* Industries Mega Menu Trigger */}
          <div 
            className="h-full flex items-center px-4 cursor-pointer"
            onMouseEnter={() => setActiveMegaMenu('industries')}
          >
            <Link 
              to="/industries" 
              className={cn(
                "text-sm font-semibold transition-colors flex items-center gap-1",
                location.pathname === '/industries' ? "text-orange-600" : (isLightMode ? "text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500" : "text-white/80 hover:text-white")
              )}
            >
              Industries
            </Link>
          </div>

          {/* Manufacturing Mega Menu Trigger */}
          <div 
            className="h-full flex items-center px-4 cursor-pointer"
            onMouseEnter={() => setActiveMegaMenu('manufacturing')}
          >
            <Link 
              to="/manufacturing"
              className={cn(
                "text-sm font-semibold transition-colors flex items-center gap-1",
                location.pathname === '/manufacturing' ? "text-orange-600" : (isLightMode ? "text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500" : "text-white/80 hover:text-white")
              )}
            >
              Manufacturing
            </Link>
          </div>

          <Link 
            to="/about" 
            className={cn(
              "text-sm font-semibold transition-colors px-4",
              location.pathname === '/about' ? "text-orange-600" : (isLightMode ? "text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500" : "text-white/80 hover:text-white")
            )}
            onMouseEnter={() => setActiveMegaMenu(null)}
          >
            About
          </Link>
          
          <Link 
            to="/contact" 
            className={cn(
              "text-sm font-semibold transition-colors px-4",
              location.pathname === '/contact' ? "text-orange-600" : (isLightMode ? "text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500" : "text-white/80 hover:text-white")
            )}
            onMouseEnter={() => setActiveMegaMenu(null)}
          >
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 shrink-0" onMouseEnter={() => setActiveMegaMenu(null)}>
          <a href="tel:+390230556150" className={cn("hidden sm:flex items-center gap-1 text-xs font-bold", isLightMode ? "text-slate-900 dark:text-white" : "text-white")}>
            <Phone className="w-3.5 h-3.5 text-orange-600" />
            +39 02 3055 6150
          </a>
          
          <button 
            onClick={() => setIsQuoteModalOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 h-9 rounded-sm text-xs font-bold transition-all active:scale-95"
          >
            SUBMIT RFQ
          </button>

          <button className={cn("lg:hidden p-2", isLightMode ? "text-slate-600" : "text-white")} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mega Menus Dropdowns */}
      <AnimatePresence>
        {activeMegaMenu === 'products' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex gap-12">
                <div className="w-1/3">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-orange-600" /> Product Categories
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Browse our extensive catalog of over 1,000 high-quality chemical products, meticulously categorized for your convenience.
                  </p>
                  <Link to="/categories" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
                    View All Categories <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-2/3 grid grid-cols-2 gap-x-8 gap-y-4 border-l border-gray-100 pl-12">
                  {TOP_CATEGORIES.map((cat) => (
                    <Link 
                      key={cat} 
                      to={`/products?category=${encodeURIComponent(cat)}`}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 transition-colors"
                    >
                      <span className="text-sm font-bold text-slate-700 group-hover:text-orange-700">{cat}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeMegaMenu === 'industries' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex gap-12">
                <div className="w-1/3">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Factory className="w-5 h-5 text-orange-600" /> Sectors We Serve
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    We provide specialized chemical solutions tailored to the unique requirements and regulatory standards of over 20 global industries.
                  </p>
                  <Link to="/industries" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
                    Explore All Industries <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-2/3 grid grid-cols-2 gap-x-8 gap-y-4 border-l border-gray-100 pl-12">
                  {INDUSTRIES.slice(0, 8).map((ind) => (
                    <Link 
                      key={ind.slug} 
                      to={`/industries/${ind.slug}`}
                      className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-gray-100"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        <img src={ind.imageUrl} alt={ind.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-bold text-slate-900 truncate group-hover:text-orange-600 transition-colors">{ind.name}</span>
                        <span className="block text-xs text-slate-500">{ind.productCount} Products</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeMegaMenu === 'manufacturing' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex gap-12">
                <div className="w-1/3">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Factory className="w-5 h-5 text-orange-600" /> Manufacturing Services
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    More than just a distributor, we are your strategic manufacturing partner. Our comprehensive facilities ensure efficiency, quality, and scalability.
                  </p>
                  <Link to="/manufacturing" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
                    Explore Manufacturing <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-2/3 grid grid-cols-2 gap-6 border-l border-gray-100 pl-12">
                  {MANUFACTURING_SERVICES.map((sol, i) => (
                    <Link key={i} to={sol.link} className="group flex gap-4 p-4 rounded-2xl hover:bg-orange-50/50 transition-colors cursor-pointer border border-transparent hover:border-orange-100">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-600 transition-colors">
                        <sol.icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-orange-700">{sol.name}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{sol.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top duration-300 max-h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search CAS, formula, or product..." 
              className="w-full h-12 pl-10 pr-4 bg-gray-100 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white transition-all text-slate-900"
            />
          </form>

          {/* Quick Actions */}
          <div className="flex items-center justify-between gap-3 py-2">
            <a href="tel:+390230556150" className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-900 py-3 rounded-xl font-bold text-sm">
              <Phone className="w-4 h-4 text-orange-600" />
              Call Us
            </a>
            <button 
              onClick={() => { setIsMenuOpen(false); setIsQuoteModalOpen(true); }}
              className="flex-1 flex items-center justify-center gap-2 bg-orange-50 text-orange-600 py-3 rounded-xl font-bold text-sm relative"
            >
              <ClipboardList className="w-5 h-5" />
              Submit RFQ
            </button>
          </div>

          <div className="h-px bg-gray-100 my-1" />

          {/* Navigation Links */}
          <div className="flex flex-col">
            <Link to="/products" className="text-lg font-bold text-slate-900 py-3 border-b border-gray-50 flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
              Products <ChevronRight className="w-5 h-5 text-gray-300" />
            </Link>
            <Link to="/industries" className="text-lg font-bold text-slate-900 py-3 border-b border-gray-50 flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
              Industries <ChevronRight className="w-5 h-5 text-gray-300" />
            </Link>
            <Link to="/about" className="text-lg font-bold text-slate-900 py-3 border-b border-gray-50 flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
              About Us <ChevronRight className="w-5 h-5 text-gray-300" />
            </Link>
            <Link to="/contact" className="text-lg font-bold text-slate-900 py-3 border-b border-gray-50 flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
              Contact <ChevronRight className="w-5 h-5 text-gray-300" />
            </Link>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </nav>
  );
}
