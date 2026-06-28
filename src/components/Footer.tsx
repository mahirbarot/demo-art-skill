/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Paintbrush, Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
  onSelectService?: (serviceId: string) => void;
}

export default function Footer({ onPageChange, onSelectService }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId: string) => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    } else {
      onPageChange('services');
      setTimeout(() => {
        const element = document.getElementById(serviceId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const servicesLinks = [
    { label: 'Vector Conversion', id: 'vector-conversion' },
    { label: 'Clipping Path', id: 'clipping-path' },
    { label: 'Background Removal', id: 'background-removal' },
    { label: 'Photo Retouching', id: 'photo-retouching' },
    { label: 'Digitizing Services', id: 'digitizing-services' }
  ];

  return (
    <footer id="app-footer" className="bg-gray-950 text-gray-400 border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => handleLinkClick('home')}>
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center transition-transform group-hover:rotate-6 duration-300">
                <Paintbrush className="w-5 h-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg tracking-tight text-white leading-none">
                  Has Art Skill
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-gray-500 mt-0.5">
                  Creative Production
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              We specialize in high-precision image editing, vector reconstruction, cap/logo digitizing, and comprehensive graphic production. Driven by perfection, delivered at lightspeed.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-brand-blue text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-brand-blue text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-900 hover:bg-brand-blue text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-white tracking-wider uppercase text-xs">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {servicesLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleServiceClick(link.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => handleLinkClick('services')} className="text-brand-blue hover:text-blue-400 font-medium transition-colors cursor-pointer text-left">
                  Explore All 10 Services →
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-white tracking-wider uppercase text-xs">
              Agency Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Home Landing
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                  About Our Crew
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contact & Support
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('submit-project')} className="hover:text-white transition-colors cursor-pointer text-left font-medium text-brand-blue">
                  Submit Project Form
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('admin')} className="hover:text-white transition-colors cursor-pointer text-left text-xs bg-gray-900 px-2 py-1 rounded border border-gray-800">
                  Admin Dashboard Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-white tracking-wider uppercase text-xs">
              Contact Info
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-blue shrink-0 mt-1" />
                <span>128 Creative Parkway, Suite 400, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                <a href="tel:+15550192831" className="hover:text-white transition-colors">
                  +1 (555) 019-2831
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <a href="mailto:contact@hasartskill.com" className="hover:text-white transition-colors">
                  contact@hasartskill.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-gray-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} Has Art Skill Creative Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
