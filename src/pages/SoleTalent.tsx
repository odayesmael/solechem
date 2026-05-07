import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Briefcase, Globe, Users, Sparkles, CheckCircle2, Loader2, ArrowRight, Heart, Lightbulb, Rocket, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const OPEN_ROLES = [
  { title: 'Sales Executive – Chemical Trading', location: 'Milan, Italy', type: 'Full-time', department: 'Sales' },
  { title: 'Supply Chain Coordinator', location: 'Milan, Italy', type: 'Full-time', department: 'Logistics' },
  { title: 'Quality Control Analyst', location: 'Milan, Italy', type: 'Full-time', department: 'Quality' },
  { title: 'Digital Marketing Specialist', location: 'Remote / Milan', type: 'Full-time', department: 'Marketing' },
  { title: 'Business Development Manager – MENA', location: 'Remote', type: 'Full-time', department: 'Sales' },
];

const VALUES = [
  { icon: Rocket, title: 'Growth Mindset', desc: 'We invest in your development with mentorship, training, and real responsibility from day one.' },
  { icon: Globe, title: 'Global Exposure', desc: 'Work with clients across 50+ countries and gain international business experience.' },
  { icon: Heart, title: 'People First', desc: 'A supportive, diverse team where every voice matters and collaboration drives success.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'We encourage creative thinking and empower you to bring new ideas to the table.' },
];

const PERKS = [
  'Competitive salary & performance bonus',
  'Flexible remote work options',
  'Professional development budget',
  'International travel opportunities',
  'Health & wellness programs',
  'Team events & retreats',
];

export default function SoleTalent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) { alert('Email service key missing.'); setIsSubmitting(false); return; }
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'New Sole Talent Application',
          from_name: 'SoleChem Talent System',
          'Full Name': data.fullName,
          'Email': data.email,
          'Phone': data.phone || 'Not provided',
          'Position': data.position || 'Open Application',
          'LinkedIn': data.linkedin || 'Not provided',
          'Cover Letter': data.coverLetter || 'None',
          'CV File': fileName || 'Not attached',
        }),
      });
      const result = await response.json();
      if (result.success) setIsSubmitted(true);
      else alert('Something went wrong. Please try again.');
    } catch { alert('An error occurred.'); } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-36 pb-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-600 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-400/30 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

        <div className="max-w-5xl mx-auto px-4 lg:px-8 relative z-20 text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-sm mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-white/80 font-bold text-[11px] uppercase tracking-[0.2em]">Join Our Team</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight leading-[1.05]">
              Sole <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Talent</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium mt-6">
              Build your career at the intersection of chemistry, technology, and global trade. We're looking for passionate people ready to shape the future of the chemical industry.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap justify-center gap-6 pt-4">
            {[
              { icon: Briefcase, label: `${OPEN_ROLES.length} Open Positions` },
              { icon: Globe, label: '50+ Countries' },
              { icon: Users, label: 'Growing Team' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300 text-[12px] font-bold uppercase tracking-widest">
                <item.icon className="w-4 h-4 text-orange-400" /> {item.label}
              </div>
            ))}
          </motion.div>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} href="#apply" className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3.5 rounded-sm font-semibold text-[13px] uppercase tracking-widest hover:bg-orange-700 transition-colors mt-4">
            Apply Now <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* Why SoleChem */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.3em]">Why SoleChem</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">More Than a Workplace</h3>
            <p className="text-[15px] text-slate-600 font-medium leading-relaxed">At SoleChem, you're not just filling a role — you're joining a mission to transform global chemical supply with innovation and integrity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-white p-8 rounded-sm border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-orange-50 rounded-sm flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors border border-orange-100">
                  <v.icon className="w-5 h-5 text-orange-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h4>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.3em]">Benefits & Perks</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">We Take Care of Our People</h3>
              <p className="text-[15px] text-slate-600 font-medium leading-relaxed">We believe great work comes from great people. That's why we invest in your well-being and professional growth.</p>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PERKS.map((perk, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3 bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                  <span className="text-[14px] font-medium text-slate-700">{perk}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.3em]">Open Positions</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Current Opportunities</h3>
          </div>
          <div className="space-y-4">
            {OPEN_ROLES.map((role, i) => (
              <motion.a key={i} href="#apply" onClick={() => setSelectedRole(role.title)} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-sm border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div>
                  <h4 className="text-[16px] font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{role.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{role.location}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{role.type}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-widest">{role.department}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all mt-3 sm:mt-0 shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-24 bg-slate-950 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.3em]">Apply Now</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Start Your Journey</h3>
            <p className="text-[15px] text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">Fill in your details below and upload your CV. We review every application and respond within 5 business days.</p>
          </div>

          <div className="bg-white rounded-sm p-8 lg:p-12 border border-slate-200 shadow-2xl">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-sm border border-orange-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Application Received!</h3>
                <p className="text-[15px] text-slate-600 max-w-md mx-auto font-medium">Thank you for your interest in SoleChem. Our HR team will review your application and contact you within 5 business days.</p>
                <button onClick={() => { setIsSubmitted(false); setFileName(''); setSelectedRole(''); }} className="text-[13px] font-bold text-orange-600 uppercase tracking-widest hover:text-orange-700 transition-colors">Submit another application</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Full Name*</label>
                      <input required name="fullName" type="text" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Email*</label>
                      <input required name="email" type="email" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Phone</label>
                      <input name="phone" type="tel" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="+39 ..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">LinkedIn Profile</label>
                      <input name="linkedin" type="url" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="linkedin.com/in/..." />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Application Details</h4>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Position*</label>
                    <select required name="position" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all">
                      <option value="">Select a position...</option>
                      {OPEN_ROLES.map((r, i) => <option key={i} value={r.title}>{r.title}</option>)}
                      <option value="Open Application">Open Application (General)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Cover Letter</label>
                    <textarea name="coverLetter" rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-sm p-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all min-h-[120px]" placeholder="Tell us about yourself, your experience, and why you'd like to join SoleChem..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Upload CV / Resume*</label>
                    <label className={cn("flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-sm transition-all cursor-pointer", fileName ? "border-orange-500 bg-orange-50" : "border-slate-300 bg-slate-50 hover:border-orange-400 hover:bg-orange-50/30")}>
                      <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" required />
                      {fileName ? (
                        <div className="text-center space-y-2">
                          <CheckCircle2 className="w-8 h-8 text-orange-600 mx-auto" />
                          <p className="text-[13px] font-bold text-slate-900">{fileName}</p>
                          <p className="text-[11px] text-slate-500">Click to change file</p>
                        </div>
                      ) : (
                        <div className="text-center space-y-2">
                          <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                          <p className="text-[13px] font-bold text-slate-600">Drop your CV here or click to browse</p>
                          <p className="text-[11px] text-slate-400">PDF, DOC, DOCX (Max 10MB)</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-sm border border-slate-200 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-slate-600 font-medium leading-relaxed">Your data is processed in accordance with GDPR. We only use your information for recruitment purposes and delete it after the hiring process concludes.</p>
                </div>

                <button disabled={isSubmitting} className="w-full bg-orange-600 hover:bg-orange-700 text-white h-14 rounded-sm font-semibold text-[13px] uppercase tracking-widest transition-colors flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg shadow-orange-600/20">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
