/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Flame, Compass, Target, Star, Globe2 } from 'lucide-react';

interface AboutPageProps {
  onPageChange: (pageId: string) => void;
}

export default function AboutPage({ onPageChange }: AboutPageProps) {

  const stats = [
    { value: '50k+', label: 'Projects Completed' },
    { value: '12+', label: 'Years Experience' },
    { value: '2.5k+', label: 'Happy Clients' },
    { value: '45+', label: 'Countries Served' }
  ];

  const values = [
    { 
      icon: ShieldCheck, 
      title: 'Pristine Accuracy', 
      desc: 'No automated trancers. No cut corners. We inspect every pen curve and stitch coordinate at maximum zoom sizes.' 
    },
    { 
      icon: Flame, 
      title: 'Relentless Velocity', 
      desc: 'We operate with 24-hour queues. Your marketing launches and production runs will never wait for asset outputs.' 
    },
    { 
      icon: Compass, 
      title: 'Global Ingress', 
      desc: 'Serving brands across the USA, EU, Australia, and Asia. Operating continuously across timezones.' 
    }
  ];

  const team = [
    {
      name: 'Mohammad Rashid',
      role: 'Founder & Technical Director',
      bio: 'Over 15 years in digital imaging and embroidery master-class digitizing files.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80'
    },
    {
      name: 'Aisha Rahman',
      role: 'Lead Vector Illustrator',
      bio: 'Manual bezier pen specialist with deep expertise in large format silk-screen separations.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80'
    },
    {
      name: 'Kenji Sato',
      role: 'Head of Quality Assurance',
      bio: 'Expert catalog retoucher with a strict eye for color temp balances and print limits.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&h=300&q=80'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Header */}
      <section className="bg-white dark:bg-gray-950 py-24 border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="font-mono text-xs font-semibold tracking-widest text-brand-blue uppercase">
            MEET THE AGENCY
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-gray-900 dark:text-white">
            Pioneering Precision Graphics.
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Founded on the principle that digital assets should never lose quality under zoom, we have spent over a decade hand-tracing anchors and refining embroidery files for high-end fashion lines, sports teams, and digital networks.
          </p>
        </div>
      </section>

      {/* Stats Block */}
      <section className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2 p-6 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="text-4xl sm:text-5xl font-display font-bold text-brand-blue">
                  {stat.value}
                </div>
                <div className="text-xs font-mono tracking-wider uppercase text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story / Mission */}
      <section className="bg-white dark:bg-gray-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story text */}
            <div className="space-y-6 text-left">
              <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white">
                How "Has Art Skill" Earned Its Reputation
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                We began as a small boutique graphics production shop, manually reconstructing pixelated logos for local signs and caps printers. We quickly recognized a global pain point: digital automation tools and low-quality generators frequently introduce math errors, rough edges, and broken lines that ruin final print outputs.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                By focusing strictly on skilled, high-precision manual design operations, we became a trusted secret weapon for major sportswear distributors, e-commerce giants, and sign manufacturers globally. Today, our 24/7 technical team processes thousands of assets daily without sacrificing our signature pixel-perfect layouts.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => onPageChange('contact')}
                  className="px-6 py-3 rounded-lg bg-black hover:bg-brand-blue text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Contact Our Operations Desk
                </button>
              </div>
            </div>

            {/* Mission Vision Panels */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 relative">
                <div className="absolute top-6 right-6 text-brand-blue">
                  <Target className="w-8 h-8 opacity-20" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">
                  Our Core Mission
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  To eliminate digital pixelation and poor vector math from commercial production, empowering printers and brands to scale physical manufacturing and web layouts with absolute confidence.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 relative">
                <div className="absolute top-6 right-6 text-brand-blue">
                  <Compass className="w-8 h-8 opacity-20" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">
                  Our Global Vision
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  To set the worldwide standard for commercial graphics pre-production pipelines, uniting state-of-the-art vector math with traditional sewing digitizing crafts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gray-50 dark:bg-gray-900/60 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white">
              The Codes We Operate By
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Why clients trust their high-value commercial asset portfolios with us year after year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, index) => {
              const Icon = v.icon;
              return (
                <div 
                  key={index} 
                  className="p-8 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-850 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950 text-brand-blue flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-3">
                    {v.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Team Placeholders */}
      <section className="bg-white dark:bg-gray-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white">
              Our Creative Operators
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Meet the production leads managing our manual tracing, skin frequencies, and cap stitching pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((t, idx) => (
              <div 
                key={idx} 
                className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-900 shadow-sm flex flex-col"
              >
                <div className="aspect-square bg-gray-50 dark:bg-gray-800 relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 space-y-2 border-t border-gray-100 dark:border-gray-800">
                  <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                    {t.name}
                  </h3>
                  <p className="text-[10px] font-mono uppercase text-brand-blue font-bold tracking-wider">
                    {t.role}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pt-2">
                    {t.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
