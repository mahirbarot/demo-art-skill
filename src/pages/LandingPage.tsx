/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ShieldCheck, Zap, DollarSign, Headset, 
  RefreshCcw, CheckCircle2, ChevronDown, ChevronUp, Star, Paintbrush 
} from 'lucide-react';
import { SERVICES, TESTIMONIALS, FAQS } from '../data/mockData';

interface LandingPageProps {
  onPageChange: (pageId: string) => void;
  onSelectService: (serviceId: string) => void;
}

export default function LandingPage({ onPageChange, onSelectService }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const processSteps = [
    { number: '01', title: 'Submit Files', desc: 'Upload files via Tally (or link shared Drive) specifying required services.' },
    { number: '02', title: 'Expert Review', desc: 'Our lead designers inspect vector layers, DPI, and cap stitch queues.' },
    { number: '03', title: 'Production', desc: 'Designers hand-trace paths, adjust skin frequencies, or compute stitch density.' },
    { number: '04', title: 'Quality Check', desc: 'Secondary reviewers run QC inspection at 300% zoom matching print rules.' },
    { number: '05', title: 'Direct Delivery', desc: 'Download high-res ready-to-print deliverables within your deadlines.' }
  ];

  const valueProps = [
    { icon: Zap, title: 'Fast Delivery', desc: 'Standard files delivered within 12-24 hours. Urgent queues completed in 6 hours.' },
    { icon: ShieldCheck, title: 'Professional Quality', desc: '100% manual Bezier paths. Every anchor is calculated with pixel precision.' },
    { icon: DollarSign, title: 'Affordable Pricing', desc: 'Flat-rate transparent quotes. Standard background removals starting from $0.49/image.' },
    { icon: Headset, title: 'Dedicated Support', desc: 'Direct chat with production team leaders. 24/7 coverage for high-volume catalogs.' },
    { icon: RefreshCcw, title: 'Unlimited Revisions', desc: 'We edit until it is absolutely perfect. Zero friction or secondary charges.' }
  ];

  const portfolioItems = [
    { id: 'p1', title: 'Vector Tracing Detail', category: 'Vector Conversion', client: 'Automotive Global', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=300&q=80' },
    { id: 'p2', title: 'Hollow 3D Shirt Joint', category: 'Ghost Mannequin', client: 'Scribe Apparel', image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&w=400&h=300&q=80' },
    { id: 'p3', title: 'Cap Stitch Digitizing', category: 'Embroidery Digitizing', client: 'CapNation', image: 'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&w=400&h=300&q=80' },
    { id: 'p4', title: 'Cosmetic Skin Frequency', category: 'Photo Retouching', client: 'Aura Cosmetics', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&h=300&q=80' },
    { id: 'p5', title: 'Multi-Path Separation', category: 'Clipping Path', client: 'Industrial Supply Corp', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&h=300&q=80' },
    { id: 'p6', title: 'Metallic Tone Color Change', category: 'Color Change', client: 'Velo Sports Gear', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&h=300&q=80' }
  ];

  const clientLogos = [
    { name: 'Linear', text: 'Linear' },
    { name: 'Stripe', text: 'Stripe' },
    { name: 'Figma', text: 'Figma' },
    { name: 'Framer', text: 'Framer' },
    { name: 'Vercel', text: 'Vercel' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950 py-20 lg:py-32">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-7 space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-mono font-medium text-gray-800 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                <span>Precision Graphics. Delivered Faster.</span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white leading-[1.08]">
                Your Trusted Creative <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-950 via-brand-blue to-blue-500 dark:from-white dark:via-blue-400 dark:to-blue-600">
                  Production Partner.
                </span>
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Has Art Skill provides high-precision raster-to-vector conversion, expert image editing, clipping path masking, and stitch digitizing. Scale your production throughput overnight.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onPageChange('submit-project')}
                  className="w-full sm:w-auto px-8 py-4 rounded-lg bg-black hover:bg-brand-blue text-white font-medium text-base shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  Submit Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onPageChange('services')}
                  className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-medium text-base transition-colors cursor-pointer"
                >
                  Explore Services
                </button>
              </div>

              {/* Service tags */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 max-w-md mx-auto lg:mx-0 text-left">
                {['Vector Conversion', 'Background Removal', 'Cap/Logo Digitizing', 'Ghost Mannequin', 'Skin Retouching', 'Multi-Path Masking'].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Graphic/Grid Illustration */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Interactive Bezier Vector Pen simulation card */}
              <div className="w-full max-w-md mx-auto aspect-square glass-card rounded-2xl border border-gray-200/60 dark:border-gray-800/60 shadow-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                {/* Visual coordinate markings */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-gray-400 dark:text-gray-600">
                  X: 284.18, Y: 104.92
                </div>

                <div className="relative flex-1 flex items-center justify-center">
                  {/* Decorative Anchor lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="150" x2="300" y2="150" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-800" />
                    <line x1="150" y1="0" x2="150" y2="300" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-gray-800" />
                    
                    {/* Simulated Bezier S-curve */}
                    <path d="M40,220 C100,50 200,250 260,80" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Control Handles */}
                    <line x1="100" y1="50" x2="40" y2="220" stroke="#9ca3af" strokeWidth="1" />
                    <line x1="200" y1="250" x2="260" y2="80" stroke="#9ca3af" strokeWidth="1" />
                    
                    {/* Control Handle Anchors */}
                    <circle cx="100" cy="50" r="4.5" fill="#ffffff" stroke="#2563EB" strokeWidth="1.5" />
                    <circle cx="200" cy="250" r="4.5" fill="#ffffff" stroke="#2563EB" strokeWidth="1.5" />

                    {/* Curve Points */}
                    <circle cx="40" cy="220" r="5" fill="#111827" className="dark:fill-white" />
                    <circle cx="260" cy="80" r="5" fill="#111827" className="dark:fill-white" />
                  </svg>

                  {/* Active Anchor point overlay callout */}
                  <div className="absolute top-10 left-12 bg-black dark:bg-white text-white dark:text-black font-mono text-[9px] px-2 py-1 rounded shadow-lg pointer-events-none">
                    Anchor Node #14 [Smooth]
                  </div>

                  <div className="absolute bottom-12 right-12 bg-brand-blue text-white font-mono text-[9px] px-2 py-1 rounded shadow-lg pointer-events-none">
                    Precision: 100% Manual
                  </div>
                </div>

                {/* Card controls row */}
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/80 pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-mono font-medium text-gray-500 dark:text-gray-400">VECTOR PARSE READY</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">EPS</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">SVG</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">DST</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-gray-400">
              TRUSTED BY WORLDWIDE OPERATIONS
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
              {clientLogos.map((logo) => (
                <span 
                  key={logo.name}
                  className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-gray-900 dark:text-white"
                >
                  //{logo.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="bg-white dark:bg-gray-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Professional Production Workflows
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select from our specialized services. Hand-crafted layouts built exactly to standard printing and commercial catalog specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service) => {
              return (
                <div
                  key={service.id}
                  id={`preview-${service.id}`}
                  className="p-8 rounded-xl border border-gray-100 dark:border-gray-800/80 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 text-brand-blue flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white duration-300">
                      <Paintbrush className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white group-hover:text-brand-blue transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-800/80 pt-4 mt-6 flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-medium">Turnaround: {service.turnaround}</span>
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="text-brand-blue font-semibold group-hover:translate-x-1 transition-transform cursor-pointer flex items-center gap-1"
                    >
                      Learn More <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onPageChange('services')}
              className="px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 font-medium text-sm transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              See All 10 Specialized Services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Texts */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs font-semibold tracking-widest text-brand-blue uppercase">
                WHY WORK WITH US
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white leading-tight">
                Designed for Fast-Paced E-commerce and Large Format Print Shops.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We handle the manual heavy lifting so your design squad can focus on conversions. Avoid staffing bottlenecks during catalog refreshes and embroidery peaks.
              </p>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                <div>
                  <div className="text-3xl font-display font-bold text-gray-900 dark:text-white">100%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Manual Vectorization</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-gray-900 dark:text-white">12 Hrs</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Average Turnaround</div>
                </div>
              </div>
            </div>

            {/* Right Blocks */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {valueProps.map((prop, idx) => {
                const Icon = prop.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-brand-blue flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {prop.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="bg-white dark:bg-gray-950 py-24 border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-xs font-semibold tracking-widest text-brand-blue uppercase">
              HIGH SPEED OPERATION
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Slick & Direct Pipeline
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Submit your project instructions. Watch progress via our active timeline tracking. Complete, verify, deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {processSteps.map((step, idx) => {
              return (
                <div key={idx} className="relative group space-y-4 text-center md:text-left">
                  {/* Decorative timeline linking arrow */}
                  {idx < 4 && (
                    <div className="hidden lg:block absolute top-6 left-[75%] right-[-25%] h-0.5 bg-gray-100 dark:bg-gray-800 z-0 group-hover:bg-brand-blue transition-colors duration-300" />
                  )}

                  <div className="relative z-10 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center mx-auto md:mx-0 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    <span className="font-mono text-xs font-bold">{step.number}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="bg-white dark:bg-gray-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="space-y-4 text-left">
              <span className="font-mono text-xs font-semibold tracking-widest text-brand-blue uppercase">
                COMMERCIAL PROFILES
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
                Our Work Speaks in High Resolution
              </h2>
            </div>
            <button
              onClick={() => onPageChange('services')}
              className="px-5 py-2.5 rounded-lg bg-black hover:bg-brand-blue text-white text-sm font-medium transition-colors cursor-pointer"
            >
              View Service Overviews
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, idx) => (
              <motion.div
                key={item.id}
                className="group relative rounded-xl overflow-hidden border border-gray-100 dark:border-gray-900 shadow-sm"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                </div>
                <div className="p-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] font-mono uppercase text-brand-blue font-bold tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-gray-900 dark:text-white mt-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500">
                    <span>Client: {item.client}</span>
                    <span className="font-mono text-green-500 uppercase font-semibold text-[10px]">VERIFIED OK</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="bg-gray-50 dark:bg-gray-900/60 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-xs font-semibold tracking-widest text-brand-blue uppercase">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              What Creative Leaders Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id} 
                className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 shadow-sm relative flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Rating stars */}
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">
                      {t.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t.role}, <span className="font-medium text-brand-blue">{t.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="landing-faq" className="bg-white dark:bg-gray-950 py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Got questions? We have answers. If you do not find what you are looking for, contact our queue handlers.
            </p>
          </div>

          <div className="space-y-4" id="faq-accordion">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-lg border border-gray-100 dark:border-gray-800/80 overflow-hidden bg-white dark:bg-gray-900 transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between font-display font-semibold text-gray-900 dark:text-white hover:text-brand-blue transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gray-950 text-white relative py-24 overflow-hidden border-t border-gray-900">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to Accelerate Your Creative Graphics Pipeline?
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            Submit files in seconds or request custom stitch density layouts. Our queue managers will handle the rest.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => onPageChange('submit-project')}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-white hover:bg-brand-blue text-black hover:text-white font-semibold text-base transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2 group"
            >
              Submit Your First Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium text-base transition-colors cursor-pointer"
            >
              Talk to Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
