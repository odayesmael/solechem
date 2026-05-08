import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, Lock, Send, Loader2, CheckCircle2, Globe, FlaskConical, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      alert("خطأ: مفتاح الوصول لخدمة الإيميل غير موجود (VITE_WEB3FORMS_ACCESS_KEY).");
      setIsSubmitting(false);
      return;
    }

    try {
      const interestTypes = Array.from(e.currentTarget.querySelectorAll('input[type="checkbox"][name="interestType"]:checked')).map(cb => (cb as HTMLInputElement).value).join(', ');

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New B2B General Contact",
          from_name: "SoleChem Contact System",
          "Full Name": data.fullName,
          "Job Title": data.jobTitle,
          "Company": data.company,
          "VAT": data.vat || "Not provided",
          "Email": data.email,
          "Phone": data.phone || "Not provided",
          "Interest Area": interestTypes || "Not provided",
          "Message": data.message || "None",
          "NDA Requested": data.ndaRequest ? "Yes" : "No",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("An error occurred while submitting the request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 pt-32 pb-20">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-300 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-20 text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-sm shadow-sm">
            <span className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-orange-600" /> B2B Enquiries Welcome
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-slate-900 tracking-tight leading-[1.1]">
            Contact <span className="text-orange-600">Us</span>
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Speak directly with a technical expert — not a call centre. We respond to all B2B inquiries within 24 business hours.
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-4">
            <span className="flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-widest bg-white px-3 py-1.5 rounded-sm border border-slate-200"><Clock className="w-4 h-4 text-orange-600" /> Under 24h Response</span>
            <span className="flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-widest bg-white px-3 py-1.5 rounded-sm border border-slate-200"><Globe className="w-4 h-4 text-orange-600" /> EN/IT/DE/FR</span>
            <span className="flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-widest bg-white px-3 py-1.5 rounded-sm border border-slate-200"><FlaskConical className="w-4 h-4 text-orange-600" /> Qualified Chemists</span>
            <span className="flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-widest bg-white px-3 py-1.5 rounded-sm border border-slate-200"><Lock className="w-4 h-4 text-orange-600" /> NDA on Request</span>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Form Column */}
          <div className="flex-1">
            <div className="bg-white p-8 lg:p-12 rounded-sm border border-slate-200 shadow-sm">
              {isSubmitted ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-sm border border-orange-100 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Enquiry Received</h3>
                  <p className="text-[15px] text-slate-600 max-w-md mx-auto font-medium">
                    Thank you for your inquiry. A technical specialist from our Milan office will review your requirements and contact you within 4 business hours.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="text-[13px] font-bold text-orange-600 uppercase tracking-widest hover:text-orange-700 transition-colors">Send another enquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Full Name*</label>
                        <input required name="fullName" type="text" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Job Title*</label>
                        <input required name="jobTitle" type="text" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="Procurement Manager" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Company Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Company Name*</label>
                        <input required name="company" type="text" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="Acme Corp S.r.l." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">VAT / Tax Number</label>
                        <input type="text" name="vat" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="IT12345678901" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Business Email*</label>
                        <input required type="email" name="email" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="john@acme.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Phone / WhatsApp</label>
                        <input type="tel" name="phone" className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="+39 ..." />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Enquiry Details</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Enquiry Type</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {['RFQ / Pricing', 'Custom Formulation', 'Supply Agreement', 'Toll Manufacturing', 'Sample Request'].map(type => (
                            <label key={type} className="cursor-pointer group">
                              <input type="checkbox" name="interestType" value={type} className="hidden peer" />
                              <span className="px-3 py-2 rounded-sm border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-widest peer-checked:bg-orange-50 peer-checked:border-orange-600 peer-checked:text-orange-600 group-hover:border-slate-300 transition-all block">
                                {type}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 pt-2">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest block">Requirements</label>
                        <textarea rows={4} name="message" className="w-full bg-slate-50 border border-slate-200 rounded-sm p-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all min-h-[120px]" placeholder="Describe requirements: product, CAS, quantity, purity grade, application, Incoterms..." />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50/50 rounded-sm border border-orange-100 flex items-start gap-3">
                    <input type="checkbox" name="ndaRequest" className="mt-1 w-4 h-4 rounded-sm border-slate-300 text-orange-600 focus:ring-orange-500" />
                    <div>
                      <p className="text-[13px] font-bold text-slate-900">Request an NDA before sharing details</p>
                      <p className="text-[12px] text-slate-600 font-medium">We'll send a mutual NDA within 4 business hours for confidential projects.</p>
                    </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 rounded-sm font-semibold text-[13px] uppercase tracking-widest transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit B2B Enquiry"}
                  </button>

                  <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap">
                    <span className="flex items-center gap-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest"><ShieldCheck className="w-3.5 h-3.5" /> GDPR Compliant</span>
                    <span className="flex items-center gap-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest"><Clock className="w-3.5 h-3.5" /> 24h Response</span>
                    <span className="flex items-center gap-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest"><Award className="w-3.5 h-3.5" /> ISO 9001</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:w-[380px] space-y-6">
            <div className="bg-slate-900 p-8 rounded-sm text-white space-y-8 shadow-sm">
              <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] border-b border-slate-800 pb-2">Direct Contact</h4>
              <div className="space-y-6">
                <a href="tel:+390230556150" className="flex gap-4 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-slate-800 rounded-sm flex items-center justify-center text-orange-500 shrink-0 border border-slate-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">B2B Sales & Technical</p>
                    <p className="text-[15px] font-bold">+39 02 3055 6150</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">Mon–Fri 9–18 CET</p>
                  </div>
                </a>
                <a href="mailto:info@solechem.eu" className="flex gap-4 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-slate-800 rounded-sm flex items-center justify-center text-orange-500 shrink-0 border border-slate-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-[15px] font-bold text-orange-400">info@solechem.eu</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">24h guaranteed response</p>
                  </div>
                </a>
              </div>

              <div className="bg-[#25D366]/10 border border-[#25D366]/20 p-5 rounded-sm space-y-3">
                <div className="flex items-center gap-2 text-[#25D366]">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-bold text-[13px]">WhatsApp Business</span>
                </div>
                <p className="text-[12px] text-slate-400 leading-relaxed font-medium">Prefer a quick chat? We respond within 2 hours during business hours.</p>
                <a href="https://wa.me/390230556150" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2 rounded-sm font-semibold text-[12px] uppercase tracking-widest text-center transition-colors">
                  Chat on WhatsApp
                </a>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-sm space-y-3">
                <div className="flex items-center gap-2 text-orange-500">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-[13px]">Apply for Net 30/60</span>
                </div>
                <p className="text-[12px] text-slate-400 leading-relaxed font-medium">Credit terms available for approved B2B buyers in the EU.</p>
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 py-2 rounded-sm font-semibold text-[12px] uppercase tracking-widest transition-colors">
                  Apply Now
                </button>
              </div>
            </div>

            <a href="https://maps.app.goo.gl/8kJXoJaUGnTQPwLu5" target="_blank" rel="noopener noreferrer" className="block bg-slate-50 p-6 rounded-sm border border-slate-200 space-y-5 shadow-sm hover:border-orange-500 transition-all group">
              <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] border-b border-slate-200 pb-2">Our Location</h4>
              <div className="aspect-video bg-slate-200 rounded-sm overflow-hidden relative border border-slate-300">
                <img 
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
                  alt="Milan Map" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-orange-600 rounded-sm flex items-center justify-center text-white shadow-sm border border-orange-700 group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="space-y-1 bg-white p-4 rounded-sm border border-slate-200 shadow-sm group-hover:border-orange-200 transition-colors">
                <p className="text-[14px] font-bold text-slate-900">SoleChem S.R.L.</p>
                <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                  Via Leonardo da Vinci 9<br />
                  20051 Cassina de'Pecchi (MI)<br />
                  Italy
                </p>
                <p className="text-[11px] font-bold text-orange-600 uppercase tracking-widest pt-2">Open in Google Maps →</p>
              </div>
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
}
