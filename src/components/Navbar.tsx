/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Paintbrush } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
    { label: 'Submit Project', id: 'submit-project', highlight: true }
  ];

  const handleNavClick = (id: string) => {
    onPageChange(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => handleNavClick('home')}
              id="navbar-logo"
            >
              <div className="w-10 h-10 rounded-lg bg-black dark:bg-white flex items-center justify-center transition-transform group-hover:rotate-6 duration-300">
                <Paintbrush className="w-5 h-5 text-white dark:text-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg tracking-tight text-gray-900 dark:text-white leading-none">
                  Has Art Skill
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-gray-500 dark:text-gray-400 mt-0.5">
                  Creative Production
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                if (item.highlight) {
                  return (
                    <button
                      key={item.id}
                      id={`nav-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className="ml-4 px-5 py-2.5 rounded-lg bg-brand-blue hover:bg-blue-700 text-white font-medium text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {item.label}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  );
                }
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer relative ${
                      isActive
                        ? 'text-gray-950 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-blue rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
              {/* Invisible trigger to access admin dashboard cleanly for the developer */}
              <button
                onClick={() => handleNavClick('admin')}
                className="opacity-0 w-4 h-4 cursor-default"
                id="hidden-admin-btn"
                title="Admin Access"
              />
            </div>

            {/* Mobile Hamburger Menu button */}
            <div className="flex md:hidden items-center">
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 z-40 md:hidden shadow-lg"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                if (item.highlight) {
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full mt-4 px-4 py-3 rounded-lg bg-brand-blue hover:bg-blue-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      {item.label}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  );
                }
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              {/* Fast access link for admin on mobile */}
              <button
                key="mobile-admin"
                onClick={() => handleNavClick('admin')}
                className="w-full text-left px-4 py-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                Access Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
