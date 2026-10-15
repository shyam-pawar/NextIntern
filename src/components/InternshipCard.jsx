import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Bookmark
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const InternshipCard = ({ internship, onApplyClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  const getDepartmentColor = (dept) => {
    switch (dept) {
      case 'Engineering':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'AI & Research':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Design':
        return 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200';
      case 'Infrastructure':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Data & Insights':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getWorkModeColor = (mode) => {
    switch (mode) {
      case 'Remote':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Hybrid':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'On-site':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Badges row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getDepartmentColor(internship.department)}`}>
              {internship.department}
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getWorkModeColor(internship.workMode)}`}>
              {internship.workMode}
            </span>
          </div>

          <button
            onClick={() => setSaved(!saved)}
            className={`p-1.5 rounded-lg border text-slate-400 hover:text-slate-600 transition-colors ${
              saved ? 'bg-amber-50 border-amber-200 text-amber-500' : 'border-slate-100 hover:bg-slate-50'
            }`}
            title={saved ? 'Remove from saved' : 'Save internship'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
          {internship.title}
        </h3>

        {/* Meta Info Row */}
        <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{internship.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{internship.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{internship.stipend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{internship.openings} open positions</span>
          </div>
        </div>

        {/* Short Summary */}
        <p className="mt-4 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {internship.summary}
        </p>

        {/* Skills preview */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {internship.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
            >
              {skill}
            </span>
          ))}
          {internship.skills.length > 4 && (
            <span className="text-[11px] font-medium text-slate-500 px-1 py-0.5">
              +{internship.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Collapsible Details Section */}
        {expanded && (
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-4 text-xs">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
                What You'll Work On:
              </h4>
              <ul className="space-y-1.5 text-slate-600">
                {internship.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
                Eligibility & Qualifications:
              </h4>
              <ul className="space-y-1.5 text-slate-600">
                {internship.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-2 uppercase tracking-wider text-[11px]">
                Program Perks & Benefits:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {internship.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-slate-400 text-[11px]">
              <span>Posted: {internship.postedDate}</span>
              <span className="font-medium text-rose-600">Deadline: {internship.deadline}</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer / Action Bar */}
      <div className="bg-slate-50/70 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
        >
          {expanded ? (
            <>
              Less Details <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              View Details <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <button
          onClick={() => onApplyClick(internship)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-semibold hover:from-sky-500 hover:to-indigo-500 shadow-sm shadow-sky-500/20 flex items-center gap-1.5 hover:gap-2 transition-all"
        >
          Apply Now <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
