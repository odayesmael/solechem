import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Beaker, Package } from 'lucide-react';
import { PRODUCTS } from '@/constants';

const CATEGORIES = [
  { name: "Agrochemicals", image: "/categories/Agrochemicals.webp" },
  { name: "Alcohols & Glycols", image: "/categories/Alcohols & Glycols.webp" },
  { name: "Alkalis & Bases", image: "/categories/Alkalis & Bases.webp" },
  { name: "Amines", image: "/categories/Amines.webp" },
  { name: "Amino Acids & Peptides", image: "/categories/Amino Acids & Peptides.webp" },
  { name: "Catalysts & Catalyst Precursors", image: "/categories/Catalysts & Catalyst Precursors.webp" },
  { name: "Chelating Agents", image: "/categories/Chelating Agents.webp" },
  { name: "Flame Retardants", image: "/categories/Flame Retardants.webp" },
  { name: "Flavors & Fragrances", image: "/categories/Flavors & Fragrances.webp" },
  { name: "Heterocyclic Compounds", image: "/categories/Heterocyclic Compounds.webp" },
  { name: "Inorganic Acids", image: "/categories/Inorganic Acids.webp" },
  { name: "Monomers & Building Blocks", image: "/categories/Monomers & Building Blocks.webp" },
  { name: "Nucleosides & Nucleotides", image: "/categories/Nucleosides & Nucleotides.webp" },
  { name: "Oils, Fats & Waxes", image: "/categories/Oils, Fats & Waxes.webp" },
  { name: "Organic Acids", image: "/categories/Organic Acids.webp" },
  { name: "Organometallic Compounds", image: "/categories/Organometallic Compounds.webp" },
  { name: "Oxidizers & Peroxides", image: "/categories/Oxidizers & Peroxides.webp" },
  { name: "Pharmaceutical Intermediates", image: "/categories/Pharmaceutical Intermediates.webp" },
  { name: "Pigments & Colorants", image: "/categories/Pigments & Colorants.webp" },
  { name: "Polymers & Resins", image: "/categories/Polymers & Resins.webp" },
  { name: "Salts & Minerals", image: "/categories/Salts & Minerals.webp" },
  { name: "Silicones & Silicates", image: "/categories/Silicones & Silicates.webp" },
  { name: "Solvents", image: "/categories/Solvents.webp" },
  { name: "Surfactants", image: "/categories/Surfactants.webp" },
  { name: "Sweeteners & Food Additives", image: "/categories/Sweeteners & Food Additives.webp" },
  { name: "UV Absorbers & Stabilizers", image: "/categories/UV Absorbers & Stabilizers.webp" },
  { name: "Vitamins & Nutrients", image: "/categories/Vitamins & Nutrients.webp" }
];

export default function Categories() {
  // Count products per category
  const getCategoryCount = (categoryName: string) => {
    return PRODUCTS.filter(p => p.category === categoryName).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white">Categories</span>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Chemical <span className="text-orange-600">Categories</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-[15px] leading-relaxed max-w-2xl">
            Browse our comprehensive catalog of {PRODUCTS.length.toLocaleString()}+ high-quality chemical products, organized by category.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 mb-8 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-orange-600" />
            <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
              <span className="text-slate-900 dark:text-white font-bold">{CATEGORIES.length}</span> Categories
            </span>
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <Beaker className="w-4 h-4 text-orange-600" />
            <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
              <span className="text-slate-900 dark:text-white font-bold">{PRODUCTS.length.toLocaleString()}</span> Products
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((category, index) => {
            const count = getCategoryCount(category.name);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
              >
                <Link 
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group block rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 dark:hover:border-orange-500/30 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    {count > 0 && (
                      <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        {count} Products
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-slate-400 group-hover:text-orange-500 transition-colors uppercase tracking-wider">
                      Browse Products
                      <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
