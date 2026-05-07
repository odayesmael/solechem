import React from 'react';
import { motion } from 'motion/react';
import { Scale, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900">Legal Notice</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-sm p-8 md:p-12 shadow-sm border border-slate-200"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 pb-8 border-b border-slate-200">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-sm flex items-center justify-center shrink-0">
              <Scale className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Legal Notice</h1>
              <p className="text-[15px] font-medium text-slate-500 uppercase tracking-widest">Imprint & Company Information</p>
            </div>
          </div>

          <div className="max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-sm">
                <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Company Information</h2>
                <address className="not-italic text-[15px] text-slate-700 leading-relaxed font-medium">
                  <strong>SoleChem S.R.L.</strong><br />
                  Società a Responsabilità Limitata (S.R.L.)<br />
                  Via Leonardo da Vinci 9<br />
                  20051 Cassina de'Pecchi (MI)<br />
                  Italy
                </address>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-sm">
                <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Registration & Taxation</h2>
                <ul className="list-none pl-0 text-[15px] text-slate-700 leading-relaxed font-medium space-y-2">
                  <li className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500">Trade Register:</span> <strong>Registro delle Imprese di Milano</strong></li>
                  <li className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500">REA:</span> <strong>MI – 2674671</strong></li>
                  <li className="flex justify-between border-b border-slate-200 pb-2"><span className="text-slate-500">VAT (P.IVA):</span> <strong>IT12645600961</strong></li>
                  <li className="flex justify-between pb-1"><span className="text-slate-500">Codice Fiscale:</span> <strong>12645600961</strong></li>
                </ul>
              </div>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4 border-b border-slate-200 pb-4">Contact</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="border border-slate-200 p-4 rounded-sm hover:border-orange-200 transition-colors">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</div>
                    <a href="tel:+390230556150" className="text-orange-600 font-bold hover:text-orange-700">+39 02 3055 6150</a>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-sm hover:border-orange-200 transition-colors">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</div>
                    <a href="mailto:info@solechem.eu" className="text-orange-600 font-bold hover:text-orange-700">info@solechem.eu</a>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-sm hover:border-orange-200 transition-colors">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Website</div>
                    <a href="https://www.solechem.eu" className="text-orange-600 font-bold hover:text-orange-700">www.solechem.eu</a>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4 border-b border-slate-200 pb-4">Dispute Resolution</h2>
                <p className="text-[15px] leading-relaxed text-slate-600 mb-4">
                  The European Commission provides a platform for online dispute resolution (ODR):{' '}
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-orange-600 font-bold hover:underline">
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="text-[15px] leading-relaxed text-slate-600">
                  We are not obligated to participate in dispute resolution proceedings before a consumer arbitration board, and we do not participate in such proceedings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4 border-b border-slate-200 pb-4">Liability for Content</h2>
                <p className="text-[15px] leading-relaxed text-slate-600">
                  The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with applicable laws. We are not obligated, however, to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under applicable laws remain unaffected. Liability in this regard is only possible from the time of knowledge of a specific infringement, upon which we will remove such content immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4 border-b border-slate-200 pb-4">Liability for Links</h2>
                <p className="text-[15px] leading-relaxed text-slate-600">
                  Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. Permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of a violation. If we become aware of any legal infringements, we will remove such links immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-4 border-b border-slate-200 pb-4">Copyright</h2>
                <p className="text-[15px] leading-relaxed text-slate-600">
                  The content and works created by the site operators on these pages are subject to copyright law. Duplication, processing, distribution, or any form of commercialisation of such material beyond the scope of copyright law requires the prior written consent of SoleChem S.R.L.. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected and such content is identified accordingly.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
