import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Award, Globe, ClipboardList, Users, Zap, FlaskConical, Scissors, Pill, Apple, Sparkles, Car, Flame, Recycle, Tractor, Droplets, Battery, PawPrint, HardHat, Plane, Pickaxe, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INDUSTRIES } from '@/constants';

const iconMap: Record<string, React.ElementType> = {
  Scissors, Pill, Apple, Sparkles, Car, Flame, Recycle, Tractor, Droplets, Battery, PawPrint, HardHat, Plane, Pickaxe
};

export default function Industries() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-300 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 relative z-20">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-sm">
              <span className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                <Factory className="w-3.5 h-3.5 text-orange-600" /> B2B Supply Partner
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-slate-900 tracking-tight leading-[1.1]">
              Chemical Solutions <br />
              <span className="text-orange-600">by Industry</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
              Supplying verified B2B buyers across 50+ countries. We provide tailored chemical formulations with full documentation (CoA, REACH, GMP) for each specific industrial application.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
              {[
                { val: '2,800+', label: 'Products' },
                { val: '20', label: 'Sectors' },
                { val: '50+', label: 'Countries' },
                { val: 'ISO/GMP', label: 'Certified' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl font-bold text-slate-900">{stat.val}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RFQ Strip */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-[13px] flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-orange-500" />
            Looking for a dedicated supply agreement or toll manufacturing partnership?
          </p>
          <Link to="/contact" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-sm font-bold text-[13px] uppercase tracking-wider transition-colors shrink-0">
            Contact Specialist
          </Link>
        </div>
      </div>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry, i) => {
              const Icon = iconMap[industry.icon] || FlaskConical;
              return (
              <Link 
                to={`/industries/${industry.slug}`}
                key={i}
                className="group bg-white border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all duration-300 flex flex-col h-full rounded-sm overflow-hidden"
              >
                <div className="h-48 relative overflow-hidden bg-slate-100">
                  <img 
                    src={industry.imageUrl || `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800`} 
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                     <div className="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-sm flex items-center justify-center border border-slate-200 shadow-sm">
                       <Icon className="w-5 h-5 text-slate-700" />
                     </div>
                  </div>
                  {industry.productCount && (
                    <div className="absolute top-4 right-4 bg-slate-900 border border-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest shadow-sm">
                      {industry.productCount} Products
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col flex-1 p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-3 tracking-tight group-hover:text-orange-600 transition-colors">{industry.name}</h4>
                  <p className="text-[13px] text-slate-600 leading-relaxed line-clamp-3 mb-6">
                    {industry.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(industry.compliance || ['ISO 9001', 'REACH']).map((c: string) => (
                        <span key={c} className="text-[9px] font-bold border border-slate-200 bg-slate-50 px-1.5 py-0.5 rounded-sm text-slate-500 uppercase tracking-widest flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> {c}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-[12px] font-bold text-orange-600 uppercase tracking-widest">
                      Explore Sector
                      <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )})}
          </div>
        </div>
      </section>

      {/* Specialist CTA */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-sm p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl lg:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
                Speak to our Industry Specialists
              </h3>
              <p className="text-slate-600 text-[15px] max-w-xl leading-relaxed">
                Our team consists of qualified chemists and industry veterans who understand your technical requirements. We help you navigate complex regulatory landscapes and fine-tune formulations.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact" className="bg-slate-900 text-white px-6 py-3 rounded-sm font-semibold text-[13px] hover:bg-orange-600 transition-colors uppercase tracking-widest">
                  Book a Consultation
                </Link>
                <Link to="/about" className="bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-sm font-semibold text-[13px] hover:bg-slate-50 transition-colors uppercase tracking-widest">
                  View Laboratory Info
                </Link>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3 grid grid-cols-2 gap-4">
              {[
                { icon: Zap, label: 'Fast Response' },
                { icon: FlaskConical, label: 'Formulation' },
                { icon: Globe, label: 'Global Specs' },
                { icon: Award, label: 'Certified' }
              ].map((item, i) => (
                <div key={i} className="aspect-square bg-white border border-slate-200 rounded-sm flex flex-col items-center justify-center p-4 gap-3 text-center">
                  <item.icon className="w-8 h-8 text-orange-600" />
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
