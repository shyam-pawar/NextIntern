import React, { useState, useEffect } from 'react';
import { 
  Search, 
  UserCheck, 
  Clock, 
  Calendar, 
  FileText, 
  GraduationCap, 
  Phone, 
  Mail, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { StatusBadge } from '../components/StatusBadge';
import { OnboardingGuide } from '../components/OnboardingGuide';

export const TrackStatusPage = ({ initialQuery = '', onExploreClick }) => {
  const { applications } = usePortal();

  const [query, setQuery] = useState(initialQuery || (applications.length > 0 ? applications[0].id : ''));
  const [selectedApp, setSelectedApp] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Sync initial query
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    } else if (applications.length > 0 && !selectedApp) {
      // Default to first application (e.g. INT-2026-101 which is Accepted)
      setSelectedApp(applications[0]);
    }
  }, [initialQuery, applications]);

  const handleSearch = (searchVal) => {
    const val = (searchVal !== undefined ? searchVal : query).trim().toLowerCase();
    if (!val) return;

    const found = applications.find(
      (app) => app.id.toLowerCase() === val || app.email.toLowerCase() === val
    );

    if (found) {
      setSelectedApp(found);
      setNotFound(false);
    } else {
      setSelectedApp(null);
      setNotFound(true);
    }
  };

  const getStepStatus = (stepKey, currentStatus) => {
    const order = ["Applied", "Under Review", "Interview Scheduled", "Accepted"];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepKey);

    if (currentStatus === 'Rejected') {
      if (stepKey === 'Applied') return 'completed';
      return 'inactive';
    }

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Candidate Tracking & Onboarding</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Application Status & Joinee Hub
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm">
          Enter your Application Reference ID (e.g., <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-sky-700">INT-2026-101</code>) or registered email address to check your status.
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Application ID (e.g. INT-2026-101) or Email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
          >
            Track Status
          </button>
        </form>

        {/* Demo Shortcut Chips */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Quick Demo Profiles:</span>
          {applications.slice(0, 4).map((app) => (
            <button
              key={app.id}
              onClick={() => {
                setQuery(app.id);
                setSelectedApp(app);
                setNotFound(false);
              }}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
                selectedApp?.id === app.id
                  ? 'bg-sky-50 border-sky-300 text-sky-700 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {app.id} ({app.status})
            </button>
          ))}
        </div>
      </div>

      {/* Result Not Found */}
      {notFound && (
        <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center max-w-md mx-auto space-y-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900">No application found</h3>
          <p className="text-xs text-slate-500">
            We couldn't locate an application matching <span className="font-mono font-semibold text-slate-700">"{query}"</span>. Please check the spelling or check our demo IDs above.
          </p>
        </div>
      )}

      {/* Application Details Card */}
      {selectedApp && (
        <div className="space-y-8">
          {/* Main Info Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            {/* Header bar */}
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded-md border border-sky-700/50">
                    {selectedApp.id}
                  </span>
                  <span className="text-xs text-slate-400">Applied on {selectedApp.appliedDate}</span>
                </div>
                <h2 className="text-2xl font-bold mt-1 text-white">{selectedApp.internshipTitle}</h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Applicant: <span className="font-semibold text-white">{selectedApp.fullName}</span> • {selectedApp.college}
                </p>
              </div>

              <div>
                <StatusBadge status={selectedApp.status} size="lg" />
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                Application Journey Progress
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { key: "Applied", title: "1. Submitted", desc: "Profile registered" },
                  { key: "Under Review", title: "2. Screening", desc: "Reviewing resume & projects" },
                  { key: "Interview Scheduled", title: "3. Technical Chat", desc: "Discussion with team" },
                  { key: "Accepted", title: "4. Offer Extended", desc: "Joinee Hub unlocked" },
                ].map((step, idx) => {
                  const status = getStepStatus(step.key, selectedApp.status);

                  return (
                    <div
                      key={step.key}
                      className={`p-3.5 rounded-xl border transition-all ${
                        status === 'completed'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : status === 'current'
                          ? 'bg-sky-50 border-sky-300 text-sky-900 ring-2 ring-sky-500/20 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">{step.title}</span>
                        {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {status === 'current' && <Clock className="w-4 h-4 text-sky-600 animate-pulse" />}
                      </div>
                      <span className="text-[11px] leading-tight block text-slate-500">
                        {step.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Candidate Submitted Details Collapse */}
            <div className="p-6">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Submitted Candidate Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 block font-medium">Contact Details</span>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-600" /> {selectedApp.email}
                  </div>
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {selectedApp.phone}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 block font-medium">Education</span>
                  <div className="font-semibold text-slate-800 truncate">{selectedApp.college}</div>
                  <div className="text-slate-600">{selectedApp.degree} • Class of {selectedApp.graduationYear}</div>
                  <div className="text-slate-500 font-mono">GPA: {selectedApp.gpa}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-slate-400 block font-medium">Resume & Links</span>
                  <div className="font-semibold text-sky-700 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> {selectedApp.resumeUrl}
                  </div>
                  <div className="flex items-center gap-3 pt-1 text-slate-500">
                    {selectedApp.linkedin && (
                      <a href={selectedApp.linkedin} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                        LinkedIn
                      </a>
                    )}
                    {selectedApp.github && (
                      <a href={selectedApp.github} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                        GitHub
                      </a>
                    )}
                    {selectedApp.portfolio && (
                      <a href={selectedApp.portfolio} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                        Portfolio
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {selectedApp.notes && (
                <div className="mt-4 p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <span className="font-bold block text-amber-950 mb-0.5">Recruiter Update / Note:</span>
                  {selectedApp.notes}
                </div>
              )}
            </div>
          </div>

          {/* If Selected & Accepted: Render the full New Joinee Onboarding Hub */}
          {selectedApp.status === 'Accepted' && (
            <div>
              <OnboardingGuide application={selectedApp} />
            </div>
          )}

          {/* If Interview Scheduled: Render Helpful Preparation Tips */}
          {selectedApp.status === 'Interview Scheduled' && (
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-purple-200 text-xs font-semibold uppercase tracking-wider">
                <Calendar className="w-4 h-4" /> Next Step: Technical Discussion
              </div>
              <h3 className="text-xl font-bold">Your interview is currently scheduled!</h3>
              <p className="text-xs text-purple-200 leading-relaxed max-w-2xl">
                Check your email inbox ({selectedApp.email}) for the calendar invite and Google Meet link. Prepare to discuss past projects, your technical problem-solving approach, and why you are excited for this internship.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
