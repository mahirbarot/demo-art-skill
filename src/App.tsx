/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SubmitProjectPage from './pages/SubmitProjectPage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Handle URL hash routing or initial path parameters if any
  useEffect(() => {
    const path = window.location.pathname.replace('/', '');
    if (path === 'admin') {
      setCurrentPage('admin');
    } else if (['services', 'about', 'contact', 'submit-project'].includes(path)) {
      setCurrentPage(path);
    }
  }, []);

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL quietly to assist preview or reload
    if (pageId === 'home') {
      window.history.pushState({}, '', '/');
    } else {
      window.history.pushState({}, '', `/${pageId}`);
    }
  };

  const handleSelectService = (serviceId: string) => {
    setCurrentPage('services');
    window.history.pushState({}, '', '/services');
    window.scrollTo({ top: 0 });

    // Smooth scroll to target service after mount delay
    setTimeout(() => {
      const element = document.getElementById(serviceId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handlePreselectServiceForOrder = (serviceName: string) => {
    setPreselectedService(serviceName);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <LandingPage 
            onPageChange={handlePageChange} 
            onSelectService={handleSelectService} 
          />
        );
      case 'services':
        return (
          <ServicesPage 
            onPageChange={handlePageChange} 
            onPreselectService={handlePreselectServiceForOrder} 
          />
        );
      case 'about':
        return <AboutPage onPageChange={handlePageChange} />;
      case 'contact':
        return <ContactPage />;
      case 'submit-project':
        return (
          <SubmitProjectPage 
            preselectedService={preselectedService} 
            onPageChange={handlePageChange} 
          />
        );
      case 'admin':
        return <AdminDashboard onPageChange={handlePageChange} />;
      default:
        return (
          <LandingPage 
            onPageChange={handlePageChange} 
            onSelectService={handleSelectService} 
          />
        );
    }
  };

  // Do not render standard headers/footers in full-screen admin portal
  const isAdminView = currentPage === 'admin';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col justify-between">
      {!isAdminView && (
        <Navbar 
          currentPage={currentPage} 
          onPageChange={handlePageChange} 
        />
      )}

      <div className="flex-1">
        {renderActivePage()}
      </div>

      {!isAdminView && (
        <Footer 
          onPageChange={handlePageChange} 
          onSelectService={handleSelectService} 
        />
      )}
    </div>
  );
}
