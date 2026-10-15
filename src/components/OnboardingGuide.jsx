import React from 'react';
import { 
  PartyPopper, 
  User, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Clock, 
  CheckSquare, 
  Square, 
  BookOpen, 
  Download, 
  Laptop, 
  HelpCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const OnboardingGuide = ({ application }) => {
  const { toggleChecklistItem } = usePortal();

  const onboarding = application.onboarding || {
    mentorName: "Priya Menon",
    mentorEmail: "priya.menon@company.internal",
    mentorRole: "Senior Tech Lead",
    startDate: "First Monday of Next Month",
    teamSlack: "#team-interns-2026",
    orientationTime: "10:00 AM IST via Google Meet",
    checklist: [
      { id: "c1", title: "Sign Formal Offer Letter & Confidentiality Agreement", done: true },
      { id: "c2", title: "Upload Student Verification Records & National ID", done: true },
      { id: "c3", title: "Complete Company Laptop & Peripheral Request Form", done: false },
      { id: "c4", title: "Activate Corporate Google Workspace SSO Account", done: false },
      { id: "c5", title: "Join Team Slack & say hello in #welcome-interns", done: false },
      { id: "c6", title: "Setup Local Development Environment & Git Keys", done: false }
    ]
  };

  const completedCount = onboarding.checklist.filter(item => item.done).length;
  const totalCount = onboarding.checklist.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-emerald-700/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/30">
            <PartyPopper className="w-3.5 h-3.5" />
            Offer Accepted • New Joinee Hub
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to the team, {application.fullName.split(' ')[0]}! 🚀
          </h2>
          <p className="mt-2 text-emerald-100 text-sm max-w-2xl leading-relaxed">
            Congratulations on being selected for the <span className="font-semibold text-white">{application.internshipTitle}</span> cohort. We are thrilled to welcome you. Follow your onboarding milestones below to get ready for Day 1!
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
              <span className="block text-[11px] text-emerald-200">Start Date</span>
              <span className="font-bold text-sm text-white">{onboarding.startDate}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
              <span className="block text-[11px] text-emerald-200">Orientation</span>
              <span className="font-bold text-sm text-white">{onboarding.orientationTime}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
              <span className="block text-[11px] text-emerald-200">Assigned Mentor</span>
              <span className="font-bold text-sm text-white truncate">{onboarding.mentorName}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
              <span className="block text-[11px] text-emerald-200">Slack Community</span>
              <span className="font-bold text-sm text-white truncate">{onboarding.teamSlack}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Checklist & Mentor Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Checklist */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-600" /> Pre-Joining Checklist
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete these items before your official onboarding day.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {completedCount} of {totalCount} completed ({progressPercent}%)
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Checklist items */}
          <div className="space-y-2.5">
            {onboarding.checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(application.id, item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                  item.done
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                }`}
              >
                <button type="button" className="shrink-0 text-emerald-600">
                  {item.done ? (
                    <CheckSquare className="w-5 h-5 fill-emerald-100 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                  )}
                </button>
                <span className={`text-sm ${item.done ? 'line-through text-slate-400 font-medium' : 'font-semibold'}`}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Mentor & Help Card */}
        <div className="space-y-6">
          {/* Mentor Profile */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-sky-600" /> Your Assigned Mentor
            </h3>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                {onboarding.mentorName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{onboarding.mentorName}</h4>
                <p className="text-xs text-slate-500">{onboarding.mentorRole}</p>
                <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-md mt-1 border border-emerald-200">
                  Direct Internship Advisor
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <a
                href={`mailto:${onboarding.mentorEmail}`}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span className="truncate">{onboarding.mentorEmail}</span>
              </a>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 text-slate-700">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                <span>Slack: {onboarding.teamSlack}</span>
              </div>
            </div>
          </div>

          {/* Quick Resources */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Essential Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#handbook" className="text-sky-600 hover:text-sky-700 font-medium flex items-center justify-between">
                  <span>Intern Survival Handbook (PDF)</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="#devsetup" className="text-sky-600 hover:text-sky-700 font-medium flex items-center justify-between">
                  <span>Development Workstation Guide</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-sky-600 hover:text-sky-700 font-medium flex items-center justify-between">
                  <span>Stipend & Learning Reimbursement</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
