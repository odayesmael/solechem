import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { ArrowRight, ShieldCheck, Globe, FlaskConical, Package, Users, Award, Zap, CheckCircle2, Factory, Scale, Thermometer, Droplets, Leaf, Search, Filter, ChevronLeft, ChevronRight, Hexagon, Clock, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { INDUSTRIES, PRODUCTS } from '@/constants';
import QuoteModal from '@/components/QuoteModal';

const FLOATING_ELEMENTS = [
  { id: 1, type: 'icon', top: '15%', left: '10%', size: 80, duration: 15, delay: 0 },
  { id: 2, type: 'text', text: 'H₂O', top: '25%', left: '80%', size: 64, duration: 18, delay: 2 },
  { id: 3, type: 'icon', top: '65%', left: '15%', size: 120, duration: 20, delay: 1 },
  { id: 4, type: 'text', text: 'CO₂', top: '75%', left: '85%', size: 72, duration: 16, delay: 3 },
  { id: 5, type: 'icon', top: '40%', left: '50%', size: 60, duration: 14, delay: 0.5 },
  { id: 6, type: 'text', text: 'CH₄', top: '15%', left: '60%', size: 56, duration: 22, delay: 1.5 },
  { id: 7, type: 'icon', top: '80%', left: '35%', size: 90, duration: 17, delay: 2.5 },
  { id: 8, type: 'text', text: 'NH₃', top: '45%', left: '20%', size: 48, duration: 19, delay: 0.8 },
  { id: 9, type: 'icon', top: '20%', left: '40%', size: 40, duration: 12, delay: 1.2 },
  { id: 10, type: 'text', text: 'O₂', top: '60%', left: '70%', size: 50, duration: 25, delay: 0.2 },
];

const TRUSTED_LOGOS = [
  { src: '/logos/1-removebg-preview.png', alt: 'Partner 1' },
  { src: '/logos/2-removebg-preview.png', alt: 'Partner 2' },
  { src: '/logos/4-removebg-preview.png', alt: 'Partner 4' },
  { src: '/logos/5-removebg-preview.png', alt: 'Partner 5' },
  { src: '/logos/6-removebg-preview.png', alt: 'Partner 6' },
  { src: '/logos/7-removebg-preview.png', alt: 'Partner 7' },
  { src: '/logos/8-removebg-preview.png', alt: 'Partner 8' },
];

const FEATURED_CATEGORIES = [
  { name: "Agrochemicals", image: "/categories/Agrochemicals.webp", count: "45+ Products" },
  { name: "Alcohols & Glycols", image: "/categories/Alcohols & Glycols.webp", count: "120+ Products" },
  { name: "Alkalis & Bases", image: "/categories/Alkalis & Bases.webp", count: "85+ Products" },
  { name: "Amines", image: "/categories/Amines.webp", count: "150+ Products" },
  { name: "Amino Acids & Peptides", image: "/categories/Amino Acids & Peptides.webp", count: "60+ Products" },
  { name: "Catalysts & Catalyst Precursors", image: "/categories/Catalysts & Catalyst Precursors.webp", count: "90+ Products" },
  { name: "Chelating Agents", image: "/categories/Chelating Agents.webp", count: "110+ Products" },
  { name: "Flame Retardants", image: "/categories/Flame Retardants.webp", count: "45+ Products" },
  { name: "Flavors & Fragrances", image: "/categories/Flavors & Fragrances.webp", count: "20+ Products" },
  { name: "Heterocyclic Compounds", image: "/categories/Heterocyclic Compounds.webp", count: "35+ Products" },
  { name: "Inorganic Acids", image: "/categories/Inorganic Acids.webp", count: "50+ Products" },
  { name: "Monomers & Building Blocks", image: "/categories/Monomers & Building Blocks.webp", count: "75+ Products" }
];

function Counter({ from, to, duration = 2, suffix = "", useGrouping = true }: { from: number, to: number, duration?: number, suffix?: string, useGrouping?: boolean }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString(undefined, { useGrouping }) + suffix);

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut" });
    return controls.stop;
  }, [count, to, duration]);

  return <motion.span>{rounded}</motion.span>;
}

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 40; // -20 to 20
    const y = (clientY / window.innerHeight - 0.5) * 40;
    setMousePos({ x, y });
  };

  const showChemicals = isHeroHovered || hasScrolled;

    // Removed custom JS marquee logic in favor of CSS animation

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('q', searchQuery.trim());
    if (selectedIndustry) params.append('industry', selectedIndustry);
    if (selectedCategory) params.append('category', selectedCategory);
    navigate(`/products?${params.toString()}`);
  };

  const categories = [
    "Agrochemicals", "Alcohols & Glycols", "Alkalis & Bases", "Amines", 
    "Amino Acids & Peptides", "Catalysts & Catalyst Precursors", "Chelating Agents", 
    "Flame Retardants", "Flavors & Fragrances", "Heterocyclic Compounds", 
    "Inorganic Acids", "Monomers & Building Blocks", "Nucleosides & Nucleotides", 
    "Oils, Fats & Waxes", "Organic Acids", "Organometallic Compounds", 
    "Oxidizers & Peroxides", "Pharmaceutical Intermediates", "Pigments & Colorants", 
    "Polymers & Resins", "Salts & Minerals", "Silicones & Silicates", "Solvents", 
    "Surfactants", "Sweeteners & Food Additives", "UV Absorbers & Stabilizers", 
    "Vitamins & Nutrients"
  ];
  
  const searchSuggestions = PRODUCTS.filter(p => 
    searchQuery.trim() && (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.cas.includes(searchQuery)
    )
  ).slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative min-h-[95vh] flex items-center pt-20 bg-slate-950 z-20"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        onMouseMove={handleHeroMouseMove}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-slate-950/10 z-10" />
          <motion.img 
            initial={{ scale: 1.0, x: "0%", y: "0%" }}
            animate={{ scale: 1.15, x: "-2%", y: "-1%" }}
            transition={{ 
              duration: 30, 
              ease: "linear", 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            src="/slider.webp" 
            alt="SoleChem Industrial Plant" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          {/* Decorative Elements */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] z-10 pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] z-10 pointer-events-none" />
          
          {/* Floating Chemical Elements */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none transition-transform duration-700 ease-out"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            {FLOATING_ELEMENTS.map((el) => (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: showChemicals ? 0.15 : 0,
                  scale: showChemicals ? 1 : 0.8,
                  y: showChemicals ? [0, -40, 0] : 0,
                  rotate: showChemicals ? [0, 15, -15, 0] : 0
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: { duration: el.duration, repeat: Infinity, ease: "easeInOut", delay: el.delay },
                  rotate: { duration: el.duration * 1.2, repeat: Infinity, ease: "easeInOut", delay: el.delay }
                }}
                className="absolute text-white flex items-center justify-center"
                style={{ top: el.top, left: el.left }}
              >
                {el.type === 'icon' ? (
                  <Hexagon size={el.size} strokeWidth={1} className="text-white" />
                ) : (
                  <span className="font-black tracking-tighter" style={{ fontSize: el.size }}>{el.text}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-20 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-6xl space-y-8 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-sm backdrop-blur-md border px-2 border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-white/80 font-semibold text-[10px] uppercase tracking-[0.25em]">European Chemical Distribution</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-sans font-bold text-white leading-[1.05] tracking-tight">
              Trusted Chemical <br />
              <span className="text-orange-500">Solutions.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl font-light">
              SoleChem S.R.L. — your strategic partner for industrial chemicals since 2013. Sourcing and delivering over 2,800+ products globally.
            </p>

            {/* Professional Search Filter */}
            <div className="pt-8 pb-4 w-full max-w-5xl mx-auto relative z-30 flex justify-center">
              <form onSubmit={handleSearch} className="bg-white p-2 md:p-3 rounded flex flex-col md:flex-row gap-2 shadow-2xl text-left relative w-full">
                
                {/* Search Input */}
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
                  
                  {/* Suggestions Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded shadow-2xl border border-slate-200 overflow-hidden z-50">
                    {searchSuggestions.map(product => (
                      <Link 
                        key={product.id}
                        to={`/products/${product.slug}`}
                        className="flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-slate-900">{product.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5 font-mono">CAS: {product.cas} <span className="mx-1 font-sans">•</span> {product.category}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px bg-slate-200 hidden md:block mx-1" />

              {/* Industry Dropdown */}
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
                  {INDUSTRIES.map(ind => (
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-16 w-full text-center max-w-5xl">
            <div>
              <div className="text-3xl md:text-4xl font-sans font-bold text-white">
                <Counter from={0} to={2800} suffix="+" />
              </div>
              <div className="text-[10px] text-white/50 uppercase font-semibold tracking-widest mt-2">Products</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-sans font-bold text-white">ISO</div>
              <div className="text-[10px] text-white/50 uppercase font-semibold tracking-widest mt-2">9001 & 22000</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-sans font-bold text-white">
                <Counter from={2000} to={2013} duration={1.5} useGrouping={false} />
              </div>
              <div className="text-[10px] text-white/50 uppercase font-semibold tracking-widest mt-2">Established</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-sans font-bold text-white">
                50+
              </div>
              <div className="text-[10px] text-white/50 uppercase font-semibold tracking-widest mt-2">Countries</div>
            </div>
          </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-slate-900 py-6 border-b border-slate-800 relative overflow-hidden transition-colors duration-300">
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {[
              { icon: ShieldCheck, text: "ISO 9001:2015" },
              { icon: Globe, text: "Global Sourcing" },
              { icon: Clock, text: "Fast Fulfillment" },
              { icon: MapPin, text: "HQ in Milan, Italy" }
            ].map((item, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 group cursor-default"
              >
                <item.icon className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" strokeWidth={1.5} />
                <span className="text-slate-300 font-medium text-[13px] tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Capabilities Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="mb-16 space-y-3">
            <h2 className="text-[10px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-[0.25em]">Our Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">Enterprise Solutions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Reliability & Scale",
                desc: "We run complex supply chains with consistency. From drum quantities to full ISO tanks.",
                icon: <ShieldCheck className="w-5 h-5 text-slate-700 transition-colors group-hover:text-white" />
              },
              {
                title: "Technical Excellence",
                desc: "Laboratory-backed support ensuring quality control and strict specifications.",
                icon: <FlaskConical className="w-5 h-5 text-slate-700 transition-colors group-hover:text-white" />
              },
              {
                title: "Compliance First",
                desc: "REACH, GMP, ISO. We guarantee traceability across all global shipments.",
                icon: <Award className="w-5 h-5 text-slate-700 transition-colors group-hover:text-white" />
              },
              {
                title: "Strategic Partner",
                desc: "Your dedicated contact for market insights, forecasting, and joint development.",
                icon: <Users className="w-5 h-5 text-slate-700 transition-colors group-hover:text-white" />
              }
            ].map((value, i) => (
              <div 
                key={i}
                className="bg-white border border-slate-200 p-8 hover:bg-orange-600 group transition-colors duration-300 ease-out"
              >
                <div className="w-10 h-10 bg-slate-100 group-hover:bg-orange-500 rounded flex items-center justify-center mb-10 transition-colors">
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-white mb-2 transition-colors">{value.title}</h4>
                <p className="text-slate-600 text-[13px] leading-relaxed group-hover:text-white/80 transition-colors">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xs font-black text-orange-600 uppercase tracking-[0.3em]">Why SoleChem</h2>
                <h3 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-[1.1]">
                  Your Strategic <br />B2B Partner
                </h3>
                <p className="text-slate-500 text-lg max-w-lg leading-relaxed">
                  We don't just sell chemicals; we provide supply chain continuity and technical expertise tailored to your industry needs.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                {[
                  {
                    icon: <Factory className="w-6 h-6 text-orange-600" />,
                    title: "Manufacturing & Custom Blends",
                    desc: "In-house laboratory for custom formulations, toll manufacturing, and white-label production."
                  },
                  {
                    icon: <Zap className="w-6 h-6 text-orange-600" />,
                    title: "Fast Logistics",
                    desc: "48–72h delivery across Europe from our central hubs. EXW, DAP, and DDP terms available."
                  },
                  {
                    icon: <Users className="w-6 h-6 text-orange-600" />,
                    title: "Technical Support",
                    desc: "Speak directly with qualified chemists and industry specialists. No call centers, just experts."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-sm transform rotate-3 scale-105 opacity-20 blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000" 
                alt="Chemical Laboratory and Beakers" 
                className="relative rounded-sm object-cover w-full h-[600px] shadow-2xl border-4 border-white"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-sm shadow-2xl border border-gray-100 flex items-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">100%</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Quality Assured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-32 bg-slate-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-xs font-black text-orange-600 uppercase tracking-[0.3em]">Product Categories</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter">Browse by Category</h3>
            </div>
            <Link to="/categories" className="text-orange-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All Categories <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_CATEGORIES.map((category, i) => (
              <Link 
                to={`/products?category=${encodeURIComponent(category.name)}`} 
                key={i} 
                className="group bg-white rounded p-3 border border-gray-200 hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-16 h-16 shrink-0 rounded-sm overflow-hidden relative bg-slate-100">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate">{category.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{category.count}</p>
                </div>
                <div className="w-8 h-8 shrink-0 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 transform group-hover:-rotate-45 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Industries */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1558024920-b41e1887dc32?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.03] mix-blend-multiply" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-xs font-black text-orange-600 uppercase tracking-[0.3em]">Browse by Industry</h2>
              <h3 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter">Sectors We Serve</h3>
            </div>
            <Link to="/industries" className="text-orange-600 font-bold flex items-center gap-2 hover:gap-4 transition-all bg-slate-50 px-6 py-3 rounded-xl hover:bg-orange-50 border border-slate-200 hover:border-orange-200">
              View All 20 Sectors <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES.slice(0, 8).map((industry, i) => (
              <Link to={`/industries/${industry.slug}`} key={i} className="group relative h-[320px] rounded overflow-hidden hover:shadow-2xl transition-all">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/20 transition-all duration-500 z-10 mix-blend-overlay" />
                <img 
                  src={industry.imageUrl || `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800`} 
                  alt={industry.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <h4 className="text-xl font-black text-white tracking-tight mb-2">{industry.name}</h4>
                  <p className="text-white/70 text-sm line-clamp-2 mb-4">
                    {industry.description}
                  </p>
                  <div className="flex items-center gap-2 text-orange-400 font-bold text-sm group-hover:text-white transition-colors">
                    Explore Sector <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-slate-50 border-b border-gray-100 overflow-hidden relative group">
        <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Trusted by Industry Leaders</h2>
        </div>
        <div className="relative w-full flex items-center">
          {/* Gradient Masks for smooth fade on edges */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-hidden w-full items-center">
            <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
              {/* Set 1 */}
              <div className="flex shrink-0 items-center gap-16 md:gap-24 px-8 md:px-12">
                {TRUSTED_LOGOS.map((logo, i) => (
                  <img key={`set1-${i}`} src={logo.src} alt={logo.alt} className="h-14 md:h-20 w-auto max-w-[180px] md:max-w-[280px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" referrerPolicy="no-referrer" />
                ))}
              </div>
              {/* Set 2 (Duplicate for seamless loop) */}
              <div className="flex shrink-0 items-center gap-16 md:gap-24 px-8 md:px-12">
                {TRUSTED_LOGOS.map((logo, i) => (
                  <img key={`set2-${i}`} src={logo.src} alt={logo.alt} className="h-14 md:h-20 w-auto max-w-[180px] md:max-w-[280px] object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" referrerPolicy="no-referrer" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SoleChem Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Why SoleChem</h2>
            <div className="w-16 h-1.5 bg-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Manufacturing */}
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-600/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-600 to-orange-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-600 transition-colors duration-500">
                <Factory className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-500">Manufacturing</h3>
              <p className="text-slate-500 leading-relaxed">
                Custom formulations, toll manufacturing, and contract production in ISO-certified facilities.
              </p>
            </div>

            {/* Card 2: Fast Logistics */}
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-600/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-600 to-orange-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out delay-75" />
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-600 transition-colors duration-500">
                <Package className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-500">Fast Logistics</h3>
              <p className="text-slate-500 leading-relaxed">
                Strategic location in Northern Italy. Efficient delivery across Europe within 48–72 hours.
              </p>
            </div>

            {/* Card 3: Technical Support */}
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-600/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-600 to-orange-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out delay-150" />
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-600 transition-colors duration-500">
                <FlaskConical className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-500">Technical Support</h3>
              <p className="text-slate-500 leading-relaxed">
                Experienced chemists providing R&D support, product recommendations, and regulatory guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative z-10">
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">Ready to optimize your chemical supply chain?</h3>
            <p className="text-white/90 text-lg font-medium">Get a quote within 24 hours for any of our 2,800+ products. Dedicated support from industry experts.</p>
          </div>
          <button 
            onClick={() => setIsQuoteModalOpen(true)}
            className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all active:scale-95 shadow-2xl flex items-center gap-3 shrink-0"
          >
            Start an RFQ <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </div>
  );
}
