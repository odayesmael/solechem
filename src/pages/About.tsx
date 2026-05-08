import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Globe, Award, Factory, Target, MapPin, ArrowRight, CheckCircle2, X, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export default function About() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 pt-12 pb-20">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-300 via-transparent to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-4 lg:px-8 relative z-20 space-y-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-sm shadow-sm mx-auto">
            <span className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-600" /> Milan-Based · Since 2013
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-sans font-bold text-slate-900 tracking-tight leading-[1.1]">
            About <span className="text-orange-600">SoleChem</span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
            SoleChem® is a production and distribution company that supplies thousands of chemicals needed by industries and exports to more than 50 countries.
          </p>
        </div>
      </section>

      {/* Stats / Quick Info */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">2013</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Established</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">50+</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">4,500+</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">3</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ISO / GMP+ Certifications</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-orange-600 font-bold text-[10px] uppercase tracking-widest">
              <Globe className="w-4 h-4" /> European Chemical Supplier &amp; Manufacturer
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight leading-tight">
              Your Trusted Global Chemical Partner
            </h2>
            <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
              SoleChem® is an international chemical company specializing in the production and distribution of thousands of chemicals required by industries, including food additives, feed and animal nutrition additives, organic chemicals, pharmaceutical active ingredients and excipients, personal care and cosmetics raw materials, essential oils and fragrances, agrochemicals, industrial chemicals, electronic chemicals, specialty chemicals, rubber chemicals, textile chemicals, metalworking fluids, leather and paper chemicals, fuel and lubricant additives, oil and gas chemicals, water treatment chemicals, and basic chemicals.
            </p>
            <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
              Operating in Europe, the Middle East, Asia, Central Asia, and Africa since its founding, SoleChem® has remained firmly committed to the highest standards of customer satisfaction, staying true to its founding vision.
            </p>
            <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
              Based in Milan, Italy, SoleChem® combines internationally certified operations, state-of-the-art storage facilities, and a highly skilled proactive team to maintain a robust, meticulously planned, and highly reliable supply chain that guarantees uninterrupted continuity of its customers' production operations.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-slate-100 rounded-sm transform rotate-3 scale-105 opacity-50" />
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
              alt="Global Chemical Distribution"
              className="relative rounded-sm object-cover w-full h-[500px] shadow-sm border border-slate-200"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">Who We Are</h2>
            <h3 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">Our Vision, Mission &amp; Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-sm hover:border-orange-500 transition-colors">
              <div className="w-12 h-12 bg-orange-50 rounded-sm border border-orange-100 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">Our Vision</h4>
              <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                To become one of the world's top 100 chemical raw material suppliers by 2053 through the establishment of local subsidiaries and regional distribution centers in more than 50 countries.
              </p>
            </div>
            {/* Mission */}
            <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-sm hover:border-orange-500 transition-colors">
              <div className="w-12 h-12 bg-orange-50 rounded-sm border border-orange-100 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">Our Mission</h4>
              <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                To deliver high-quality, reliable, and sustainable chemical products to our customers worldwide, on time and at competitive prices.
              </p>
            </div>
            {/* Values */}
            <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-sm hover:border-orange-500 transition-colors">
              <div className="w-12 h-12 bg-orange-50 rounded-sm border border-orange-100 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">Our Values</h4>
              <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                To build lasting, value-creating partnerships for the benefit of the environment, people, and society by using innovative technologies and maintaining the highest ethical standards in every area of our business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance / Certifications */}
      <section className="py-20 bg-white border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">Quality &amp; Compliance</h2>
            <h3 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">Certified Excellence</h3>
            <p className="text-[15px] text-slate-600 font-medium">
              Our facilities are certified to international standards, ensuring consistent quality across all operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ISO 9001 */}
            <div className="bg-white rounded-sm p-8 border border-slate-200 flex flex-col gap-6 items-center shadow-sm hover:border-orange-500 transition-colors group">
              <div
                className="w-full shrink-0 relative cursor-pointer"
                onClick={() => setSelectedImage("https://www.solechem.eu/solechem-srl-iso-9001.webp")}
              >
                <img
                  src="https://www.solechem.eu/solechem-srl-iso-9001.webp"
                  alt="ISO 9001:2015 Certificate"
                  className="relative w-full h-auto rounded-sm shadow-sm border border-slate-200 transform group-hover:-translate-y-1 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-sm shadow-sm border border-slate-200 flex items-center justify-center mx-auto text-slate-700">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">ISO 9001:2015</h4>
                <p className="text-[13px] text-slate-500 font-semibold uppercase tracking-widest">Quality Management</p>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Certified quality management system for import, export, and distribution of all industrial chemicals. IQR and IAS accredited.
                </p>
              </div>
            </div>

            {/* ISO 22000 */}
            <div className="bg-white rounded-sm p-8 border border-slate-200 flex flex-col gap-6 items-center shadow-sm hover:border-orange-500 transition-colors group">
              <div
                className="w-full shrink-0 relative cursor-pointer"
                onClick={() => setSelectedImage("https://www.solechem.eu/solechem-srl-iso-22000.webp")}
              >
                <img
                  src="https://www.solechem.eu/solechem-srl-iso-22000.webp"
                  alt="ISO 22000:2018 Certificate"
                  className="relative w-full h-auto rounded-sm shadow-sm border border-slate-200 transform group-hover:-translate-y-1 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-sm shadow-sm border border-slate-200 flex items-center justify-center mx-auto text-slate-700">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">ISO 22000</h4>
                <p className="text-[13px] text-slate-500 font-semibold uppercase tracking-widest">Food Safety Management</p>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  Food safety management system certificate ensuring the safe handling and distribution of food-grade chemical products.
                </p>
              </div>
            </div>

            {/* GMP+ */}
            <div className="bg-white rounded-sm p-8 border border-slate-200 flex flex-col gap-6 items-center shadow-sm hover:border-orange-500 transition-colors group">
              <div
                className="w-full shrink-0 relative cursor-pointer"
                onClick={() => setSelectedImage("https://www.solechem.eu/solechem-srl-gmp-plus.webp")}
              >
                <img
                  src="https://www.solechem.eu/solechem-srl-gmp-plus.webp"
                  alt="GMP+ Certificate"
                  className="relative w-full h-auto rounded-sm shadow-sm border border-slate-200 transform group-hover:-translate-y-1 transition-all duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="space-y-3 text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-sm shadow-sm border border-slate-200 flex items-center justify-center mx-auto text-slate-700">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">GMP+ Certified</h4>
                <p className="text-[13px] text-slate-500 font-semibold uppercase tracking-widest">Feed Safety Assurance</p>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                  GMP+ FSA feed safety and quality certificate demonstrating compliance with international feed safety standards, verified by SGS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operations & Manufacturing */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 tracking-tight">Trading &amp; Manufacturing</h2>
            <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
              Based in Milan, Italy, SoleChem operates at the heart of Europe's industrial sector. We combine our extensive trading network with robust manufacturing capabilities to offer unparalleled flexibility. Through lasting strategic partnerships and an extensive global sourcing network, SoleChem® continues to strengthen its reputation as the trusted solution partner of choice for industries worldwide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm">
                <Globe className="w-6 h-6 text-orange-600 mb-4" />
                <h4 className="text-[17px] font-bold text-slate-900 mb-2">Global Trading</h4>
                <p className="text-[14px] text-slate-600 font-medium">Sourcing and distributing raw materials across 50+ countries with optimized logistics.</p>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm">
                <Factory className="w-6 h-6 text-orange-600 mb-4" />
                <h4 className="text-[17px] font-bold text-slate-900 mb-2">Manufacturing</h4>
                <p className="text-[14px] text-slate-600 font-medium">Custom formulations, toll manufacturing, and blending services tailored to your needs.</p>
              </div>
            </div>

            <Link to="/manufacturing" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors uppercase tracking-widest text-[12px]">
              Explore Manufacturing Capabilities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 bg-orange-50 rounded-sm border border-orange-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-[17px] text-slate-900">Headquarters</h4>
                  <p className="text-slate-600 text-[14px] font-medium">Via Leonardo da Vinci 9, 20051 Cassina de'Pecchi (MI), Italy</p>
                </div>
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed font-medium mb-6">
                Our strategic location in Milan allows us to efficiently manage supply chains across Europe and coordinate global shipments with precision.
              </p>
              <div className="w-full h-48 bg-slate-100 rounded-sm overflow-hidden relative border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1513622470522-26c314a85ee8?auto=format&fit=crop&q=80&w=800"
                  alt="Milan, Italy"
                  className="w-full h-full object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm border border-slate-200 shadow-sm text-[13px] font-bold flex items-center gap-2 text-slate-900">
                    <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                    SoleChem S.R.L.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-center px-4 border-t border-slate-800">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Ready to Work With Us?
          </h2>
          <p className="text-[15px] text-slate-400 font-medium">
            Whether you need a reliable chemical supplier, custom formulations, or technical support — we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-orange-600 text-white px-6 py-3 rounded-sm font-semibold text-[13px] hover:bg-orange-700 transition-colors uppercase tracking-widest"
            >
              Contact Us Today
            </Link>
            <Link
              to="/products"
              className="w-full sm:w-auto bg-slate-800 text-white px-6 py-3 rounded-sm font-semibold text-[13px] hover:bg-slate-700 transition-colors border border-slate-700 uppercase tracking-widest"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 z-10 text-white hover:text-orange-500 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-sm"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full h-full bg-white rounded-sm overflow-hidden shadow-2xl border border-slate-200">
                <TransformWrapper
                  initialScale={1}
                  minScale={0.5}
                  maxScale={4}
                  centerOnInit={true}
                  wheel={{ step: 0.1 }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <React.Fragment>
                      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-sm shadow-sm border border-slate-200">
                        <button onClick={() => zoomIn()} className="p-2 hover:bg-slate-50 text-slate-700 hover:text-orange-600 rounded-sm transition-colors" title="Zoom In">
                          <ZoomIn className="w-4 h-4" />
                        </button>
                        <button onClick={() => zoomOut()} className="p-2 hover:bg-slate-50 text-slate-700 hover:text-orange-600 rounded-sm transition-colors" title="Zoom Out">
                          <ZoomOut className="w-4 h-4" />
                        </button>
                        <button onClick={() => resetTransform()} className="p-2 hover:bg-slate-50 text-slate-700 hover:text-orange-600 rounded-sm transition-colors" title="Reset">
                          <Maximize className="w-4 h-4" />
                        </button>
                      </div>
                      <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                        <img
                          src={selectedImage}
                          alt="Certificate Fullscreen"
                          className="max-w-full max-h-[85vh] object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </TransformComponent>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
