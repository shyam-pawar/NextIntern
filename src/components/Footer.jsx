import React from 'react';
import { Briefcase, Heart, Globe, Mail, MapPin } from 'lucide-react';

export const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              <span>NexIntern Portal</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering next-generation builders, researchers, and designers. Launch your career with hands-on mentorship, production projects, and direct PPO conversion tracks.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>San Francisco • Bangalore • Remote Global</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Intern Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentPage('listings')} className="hover:text-white transition-colors">Frontend & UI Engineering</button></li>
              <li><button onClick={() => setCurrentPage('listings')} className="hover:text-white transition-colors">AI, LLMs & Machine Learning</button></li>
              <li><button onClick={() => setCurrentPage('listings')} className="hover:text-white transition-colors">Backend Distributed Systems</button></li>
              <li><button onClick={() => setCurrentPage('listings')} className="hover:text-white transition-colors">Cloud & Site Reliability</button></li>
              <li><button onClick={() => setCurrentPage('listings')} className="hover:text-white transition-colors">Product Design & Research</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Candidate Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentPage('track')} className="hover:text-white transition-colors">Check Application Status</button></li>
              <li><button onClick={() => setCurrentPage('track')} className="hover:text-white transition-colors">New Joinee Checklist & FAQ</button></li>
              <li><span className="hover:text-white cursor-pointer">Interview Preparation Guide</span></li>
              <li><span className="hover:text-white cursor-pointer">Stipend & Perks Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">Mentor Matching Process</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              HR & Talent Inquiries
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Questions regarding available cohorts, university partnerships, or sponsorship?
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <div className="text-xs">
                <span className="block font-medium text-white">internships@nexintern.internal</span>
                <span className="text-[11px] text-slate-400">Response time within 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 NexIntern Portal • Developed & Curated by <span className="font-semibold text-slate-300">Shyam Pawar</span>. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Equal Opportunity Employer</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Safeguards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
