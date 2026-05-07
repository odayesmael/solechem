import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  physicalHazards,
  healthHazards,
  environmentalHazards,
  generalP,
  preventionP,
  responseP,
  storageP,
  disposalP
} from '../data/safetyData';

const HazardTable = ({ title, data }: { title: string, data: { code: string, statement: string }[] }) => (
  <div className="mb-12 not-prose">
    <h3 className="mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
    <div className="rounded-sm border border-slate-200 overflow-hidden bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-widest">
            <th className="px-6 py-4 font-bold w-32">Code</th>
            <th className="px-6 py-4 font-bold">Statement</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr key={item.code} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 align-top">
                <span className="inline-flex items-center px-2 py-1 rounded-sm bg-red-50 text-red-600 font-mono text-xs font-bold border border-red-100">{item.code}</span>
              </td>
              <td className="px-6 py-4 text-[13px] text-slate-700 font-medium">
                {item.statement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PrecautionaryTable = ({ title, data }: { title: string, data: { code: string, statement: string }[] }) => (
  <div className="mb-12 not-prose">
    <h3 className="mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
    <div className="rounded-sm border border-slate-200 overflow-hidden bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-widest">
            <th className="px-6 py-4 font-bold w-32">Code</th>
            <th className="px-6 py-4 font-bold">Statement</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr key={item.code} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 align-top">
                <span className="inline-flex items-center px-2 py-1 rounded-sm bg-blue-50 text-blue-600 font-mono text-xs font-bold border border-blue-100">{item.code}</span>
              </td>
              <td className="px-6 py-4 text-[13px] text-slate-700 font-medium">
                {item.statement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function SafetyHandling() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900">Safety & Handling</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-sm p-8 md:p-12 shadow-sm border border-slate-200"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 pb-8 border-b border-slate-200">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-sm flex items-center justify-center shrink-0">
              <ShieldAlert className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Safety & Handling Guide</h1>
              <p className="text-[15px] font-medium text-slate-500 uppercase tracking-widest">GHS Classification & Labelling</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-orange-600 prose-a:font-bold hover:prose-a:text-orange-700">
            <p className="lead text-lg text-slate-600 font-medium">
              Understanding chemical safety labels is essential for safe handling, storage, and transport. This guide explains the Globally Harmonized System (GHS) of classification and labelling, including pictograms, signal words, hazard statements (H-codes), and precautionary statements (P-codes).
            </p>

            <h2 className="border-b border-slate-200 pb-4 mt-16 mb-8 text-2xl">GHS Pictograms</h2>
            <p className="text-[15px] leading-relaxed text-slate-600">GHS pictograms are standardized symbols used worldwide to communicate specific hazards associated with chemical substances. Each pictogram represents a category of danger.</p>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 not-prose my-12">
              {[
                { code: 'GHS01', title: 'Exploding Bomb', desc: 'Explosives, self-reactive substances, organic peroxides', icon: '💥' },
                { code: 'GHS02', title: 'Flame', desc: 'Flammable gases, liquids, solids, aerosols, self-heating substances', icon: '🔥' },
                { code: 'GHS03', title: 'Flame Over Circle', desc: 'Oxidizing gases, liquids, and solids', icon: '⭕' },
                { code: 'GHS04', title: 'Gas Cylinder', desc: 'Compressed, liquefied, dissolved, or refrigerated gases under pressure', icon: '🛢️' },
                { code: 'GHS05', title: 'Corrosion', desc: 'Corrosive to metals, causes severe skin burns and serious eye damage', icon: '🧪' },
                { code: 'GHS06', title: 'Skull & Crossbones', desc: 'Acute toxicity (fatal or toxic if swallowed, inhaled, or in contact with skin)', icon: '☠️' },
                { code: 'GHS07', title: 'Exclamation Mark', desc: 'Irritant, skin sensitizer, acute toxicity (harmful), narcotic effects', icon: '❗' },
                { code: 'GHS08', title: 'Health Hazard', desc: 'Carcinogenicity, mutagenicity, reproductive toxicity, organ toxicity', icon: '🫀' },
                { code: 'GHS09', title: 'Environment', desc: 'Hazardous to the aquatic environment (acute and chronic)', icon: '🐟' }
              ].map(pic => (
                <div key={pic.code} className="bg-white p-6 rounded-sm border border-slate-200 hover:border-orange-200 hover:shadow-md transition-all group">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">{pic.icon}</div>
                  <div className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-3 flex items-center justify-between">
                    <span className="text-[13px] uppercase tracking-widest text-slate-500">{pic.code}</span>
                  </div>
                  <div className="font-bold text-slate-800 mb-2">{pic.title}</div>
                  <div className="text-[13px] text-slate-500 leading-relaxed font-medium">{pic.desc}</div>
                </div>
              ))}
            </div>

            <h2 className="border-b border-slate-200 pb-4 mt-16 mb-8 text-2xl">Signal Words</h2>
            <p className="text-[15px] leading-relaxed text-slate-600 mb-6">Signal words indicate the relative severity of a hazard. There are only two signal words in the GHS system:</p>
            <div className="grid sm:grid-cols-2 gap-6 not-prose mb-16">
              <div className="bg-red-50 border border-red-100 p-6 rounded-sm">
                <div className="text-red-700 font-black text-xl mb-2 uppercase tracking-tight">Danger</div>
                <p className="text-red-800/80 text-[13px] leading-relaxed font-medium">Used for more severe hazard categories. Indicates that the chemical presents a serious or life-threatening hazard. Examples include acute toxicity (fatal), flammable liquids (Category 1), and carcinogens.</p>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-6 rounded-sm">
                <div className="text-orange-700 font-black text-xl mb-2 uppercase tracking-tight">Warning</div>
                <p className="text-orange-800/80 text-[13px] leading-relaxed font-medium">Used for less severe hazard categories. Indicates that the chemical presents a hazard that is less serious than those warranting "Danger." Examples include skin irritants and flammable liquids (Category 4).</p>
              </div>
            </div>

            <h2 className="border-b border-slate-200 pb-4 mt-16 mb-8 text-2xl">Hazard Statements (H-Codes)</h2>
            <p className="text-[15px] leading-relaxed text-slate-600 mb-10">Hazard statements describe the nature and severity of a chemical hazard. Each H-code corresponds to a specific type of danger. They are divided into three groups: Physical Hazards (H200–H290), Health Hazards (H300–H373), and Environmental Hazards (H400–H420).</p>

            <HazardTable title="Physical Hazards (H200–H290)" data={physicalHazards} />
            <HazardTable title="Health Hazards (H300–H373)" data={healthHazards} />
            <HazardTable title="Environmental Hazards (H400–H420)" data={environmentalHazards} />

            <h2 className="border-b border-slate-200 pb-4 mt-16 mb-8 text-2xl">Precautionary Statements (P-Codes)</h2>
            <p className="text-[15px] leading-relaxed text-slate-600 mb-10">Precautionary statements advise on how to minimize or prevent adverse effects from exposure to a hazardous chemical. They are divided into five groups: General (P100), Prevention (P200), Response (P300), Storage (P400), and Disposal (P500).</p>

            <PrecautionaryTable title="General (P100)" data={generalP} />
            <PrecautionaryTable title="Prevention (P200)" data={preventionP} />
            <PrecautionaryTable title="Response (P300)" data={responseP} />
            <PrecautionaryTable title="Storage (P400)" data={storageP} />
            <PrecautionaryTable title="Disposal (P500)" data={disposalP} />

            <div className="bg-slate-50 border border-slate-200 rounded-sm p-8 mt-16 not-prose flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-slate-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-[11px]">Disclaimer</h3>
                <p className="text-slate-600 text-[13px] leading-relaxed font-medium">
                  This guide is provided for informational purposes only. Always refer to the Safety Data Sheet (SDS) for complete safety information about a specific chemical product. SoleChem S.R.L. provides SDS documents for all products upon request. For specific safety questions, please contact our team.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
