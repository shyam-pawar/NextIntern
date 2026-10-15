import React, { useState, useEffect } from 'react';
import { PortalProvider, usePortal } from './context/PortalContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { TrackStatusPage } from './pages/TrackStatusPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ApplicationModal } from './components/ApplicationModal';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'listings' | 'track' | 'admin'
  const [trackQuery, setTrackQuery] = useState('');
  const { 
    activeApplyInternship, 
    setActiveApplyInternship, 
    userRole, 
    setUserRole 
  } = usePortal();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // When user toggles role to admin, offer quick navigation if on candidate pages
  useEffect(() => {
    if (userRole === 'admin' && currentPage === 'home') {
      // Keep page, but user can click to Admin tab
    }
  }, [userRole]);

  const handleApplyClick = (internship) => {
    setActiveApplyInternship(internship);
  };

  const handleTrackFromModal = (appId) => {
    setTrackQuery(appId);
    setCurrentPage('track');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'listings' && (
          <ListingsPage 
            onApplyClick={handleApplyClick} 
            onTrackClick={handleTrackFromModal} 
          />
        )}

        {currentPage === 'track' && (
          <TrackStatusPage 
            initialQuery={trackQuery} 
            onExploreClick={() => setCurrentPage('listings')} 
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Application Registration Modal */}
      {activeApplyInternship && (
        <ApplicationModal
          internship={activeApplyInternship}
          onClose={() => setActiveApplyInternship(null)}
          onTrackClick={handleTrackFromModal}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <PortalProvider>
      <AppContent />
    </PortalProvider>
  );
}
