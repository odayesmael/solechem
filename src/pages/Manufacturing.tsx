import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Globe, FileText, Lock, ClipboardList, ArrowRight, Zap, FlaskConical, Package, CheckCircle2, Factory } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Manufacturing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 pt-32 pb-20">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-300 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-sm shadow-sm">
              <span className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                <Factory className="w-3.5 h-3.5 text-orange-600" /> B2B Manufacturing Partner
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-slate-900 tracking-tight leading-[1.1]">
              Custom Chemical <br />
              <span className="text-orange-600">Manufacturing</span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
              ISO-certified production facilities in Milan, Italy. We offer custom formulations, toll manufacturing, and white-labeling with full batch documentation and guaranteed quality.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
              {[
                { val: '2013', label: 'Est. Year' },
                { val: '100%', label: 'Traceability' },
                { val: 'NDA', label: 'Secured' },
                { val: 'ISO 9001', label: 'Certified' }
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

      {/* Trust Bar */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-wrap justify-between md:justify-center gap-x-8 gap-y-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-600" /> ISO 9001:2015</span>
          <span className="flex items-center gap-2"><Award className="w-4 h-4 text-orange-600" /> GMP FACILITIES</span>
          <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-orange-600" /> REACH COMPLIANT</span>
          <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-orange-600" /> COA PER BATCH</span>
          <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-orange-600" /> STRICT NDA</span>
        </div>
      </div>

      {/* NDA & Supply Agreement Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 lg:p-12 rounded-sm border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Lock className="w-32 h-32 text-slate-900" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-slate-100 rounded-sm flex items-center justify-center text-slate-700 border border-slate-200">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Confidential B2B Projects</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                We work under strict NDA for custom formulation, toll manufacturing, and white-label projects. Your Intellectual Property is comprehensively protected at every stage of development.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-sm font-semibold text-[13px] hover:bg-slate-800 transition-colors uppercase tracking-widest mt-2">
                Request NDA <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-orange-50 p-10 lg:p-12 rounded-sm border border-orange-200/50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <ClipboardList className="w-32 h-32 text-orange-600" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center text-orange-600 border border-orange-200">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Long-Term Supply Agreements</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                Framework contracts offering fixed pricing, guaranteed manufacturing capacity, priority scheduling, and annual volume planning for approved buyers and partners.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-sm font-semibold text-[13px] hover:bg-orange-700 transition-colors uppercase tracking-widest mt-2">
                Discuss a Contract <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">Our Process</h2>
            <h3 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">From Inquiry to Delivery</h3>
          </div>

          <div className="relative space-y-12 before:absolute before:left-8 lg:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-slate-300 lg:before:-translate-x-1/2">
            {[
              { step: '01', title: 'Inquiry & Technical Assessment', tags: ['RFQ form', 'NDA execution', 'Grade specification'], time: '24h response' },
              { step: '02', title: 'Quotation & Supply Terms', tags: ['EXW · DAP · CIF', 'Net 30/60', 'Volume tiers'], time: 'Pricing strategy' },
              { step: '03', title: 'Production, QC & Documentation', tags: ['CoA per batch', 'ISO/GMP records', 'Traceability'], time: 'Full compliance' },
              { step: '04', title: 'Packaging, Dispatch & Logistics', tags: ['Custom labelling', 'White-label', 'Reorder scheduling'], time: 'Global shipping' }
            ].map((item, i) => (
              <div key={i} className={cn("relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16", i % 2 === 0 ? "lg:flex-row-reverse" : "")}>
                <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-12 h-12 bg-white border border-slate-200 rounded-sm flex items-center justify-center z-10 shadow-sm text-slate-900 font-bold">
                  {item.step}
                </div>
                <div className="w-full lg:w-1/2 pl-20 lg:pl-0">
                  <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm hover:border-orange-500 transition-colors group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                      <h4 className="text-lg font-bold text-slate-900 tracking-tight">{item.title}</h4>
                      <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest bg-orange-50 border border-orange-100 px-2 py-1 rounded-sm shrink-0 whitespace-nowrap">{item.time}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest border border-slate-200 px-2 py-1 rounded-sm bg-slate-50">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Docs Grid */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">Documentation</h2>
            <h3 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">Full Batch Transparency</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Certificate of Analysis", desc: "CoA provided per batch, signed by Quality Control and shared via secure portal." },
              { icon: CheckCircle2, title: "Certificate of Conformity", desc: "CoC confirming specification strict compliance for every single shipment." },
              { icon: Globe, title: "REACH Dossier", desc: "Registration numbers and exposure scenarios for all relevant chemical substances." }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-sm border border-slate-200 hover:border-orange-500 hover:shadow-sm transition-all group">
                <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center text-orange-600 border border-slate-200 mb-6 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h5 className="text-[17px] font-bold text-slate-900 mb-3 tracking-tight">{item.title}</h5>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
