import React, { useState } from 'react';
import { Briefcase, UserCheck, Shield, Sparkles, Menu, X, Compass, CheckCircle2 } from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const Navbar = ({ currentPage, setCurrentPage }) => {
  const { userRole, setUserRole, applications } = usePortal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingCount = applications.filter(a => a.status === 'Applied' || a.status === 'Under Review').length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-sky-900 to-indigo-950 bg-clip-text text-transparent">
                NexIntern
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full ml-2 border border-sky-200">
                Talent Hub
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-slate-100 text-sky-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setCurrentPage('listings')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentPage === 'listings'
                  ? 'bg-slate-100 text-sky-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              Available Internships
            </button>

            <button
              onClick={() => setCurrentPage('track')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentPage === 'track'
                  ? 'bg-slate-100 text-sky-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Track Status & Joinee Hub
            </button>

            <button
              onClick={() => setCurrentPage('admin')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentPage === 'admin'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Shield className="w-4 h-4 text-sky-600" />
              HR Portal
              {pendingCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold bg-sky-600 text-white rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          </nav>

          {/* Role Switcher Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-500 font-medium px-2">Viewing as:</span>
            <button
              onClick={() => setUserRole('intern')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                userRole === 'intern'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Candidate / Intern
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                userRole === 'admin'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3 h-3" />
              Recruiter / HR
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Overview
          </button>
          <button
            onClick={() => { setCurrentPage('listings'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Available Internships
          </button>
          <button
            onClick={() => { setCurrentPage('track'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Track Status & Joinee Hub
          </button>
          <button
            onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-sky-700 bg-sky-50"
          >
            HR Recruiter Dashboard ({pendingCount} pending)
          </button>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Active Role Mode:</span>
            <button
              onClick={() => setUserRole(userRole === 'intern' ? 'admin' : 'intern')}
              className="text-xs font-bold text-sky-600 underline"
            >
              Switch to {userRole === 'intern' ? 'HR / Recruiter' : 'Intern'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
