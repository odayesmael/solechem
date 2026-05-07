import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 py-16 lg:py-20 border-t border-slate-200 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50/50 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Intro (Takes up more space) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="https://www.solechem.eu/solechem-logo-small.webp" 
                alt="SoleChem Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.insertAdjacentHTML('afterbegin', '<div class="flex items-center gap-2"><div class="w-10 h-10 bg-orange-600 rounded flex items-center justify-center text-white font-black text-2xl">S</div><span class="font-black text-2xl tracking-tighter text-slate-900">SOLECHEM<span class="text-orange-600">.EU</span></span></div>');
                }}
              />
            </Link>
            <p className="text-[15px] leading-relaxed max-w-sm">
              Premium B2B chemical distributor and manufacturer based in Milan, Italy. Providing verified industrial buyers with high-purity chemicals across 50+ countries since 2013.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:border-orange-500 hover:bg-orange-50 transition-all shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:info@solechem.eu" className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:border-orange-500 hover:bg-orange-50 transition-all shadow-sm">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="font-bold mb-6 text-slate-900 text-[13px] uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4 text-[14px]">
              {[
                { label: 'Product Catalog', path: '/products' },
                { label: 'Industries Served', path: '/industries' },
                { label: 'Custom Manufacturing', path: '/manufacturing' },
                { label: 'Company Profile', path: '/about' },
                { label: 'B2B Contact', path: '/contact' }
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="group flex items-center text-slate-600 hover:text-orange-600 font-medium transition-colors">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Headquarters */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="font-bold mb-6 text-slate-900 text-[13px] uppercase tracking-widest">Headquarters</h4>
            <ul className="space-y-5 text-[14px] text-slate-600 font-medium">
              <li className="flex items-start gap-3">
                <div className="bg-orange-100/50 p-2 rounded-sm shrink-0">
                  <MapPin className="w-4 h-4 text-orange-600" />
                </div>
                <span className="leading-snug pt-1">Cassina de' Pecchi<br/>Milan, Italy</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-orange-100/50 p-2 rounded-sm shrink-0">
                  <Phone className="w-4 h-4 text-orange-600" />
                </div>
                <span>+39 02 3055 6150</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-orange-100/50 p-2 rounded-sm shrink-0">
                  <Mail className="w-4 h-4 text-orange-600" />
                </div>
                <span>b2b@solechem.eu</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[13px] text-slate-500 font-medium">
            © {new Date().getFullYear()} SoleChem Europe S.r.l. All rights reserved. <span className="text-slate-900 font-bold ml-1">B2B Only.</span>
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[13px] font-semibold text-slate-500">
            <Link to="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link>
            <Link to="/legal-notice" className="hover:text-orange-600 transition-colors">Legal Notice</Link>
            <Link to="/safety-handling" className="hover:text-orange-600 transition-colors">Safety & Handling</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
