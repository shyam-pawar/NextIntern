import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Rocket, 
  Users, 
  TrendingUp, 
  Award, 
  CheckCircle, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Compass
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { InternshipCard } from '../components/InternshipCard';

export const HomePage = ({ setCurrentPage }) => {
  const { internships, setActiveApplyInternship } = usePortal();

  const featured = internships.slice(0, 3);

  const handleApplyClick = (internship) => {
    setActiveApplyInternship(internship);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 sm:pt-16 sm:pb-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-sky-400/20 via-indigo-300/20 to-purple-400/20 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Applications Open for 2026 Cohorts</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Build real software.<br />
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Launch your engineering career.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join our fast-growing engineering, AI, and design teams. Work on production codebases from week one, pair with seasoned mentors, and secure direct full-time return offers.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => setCurrentPage('listings')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 group transition-all"
            >
              Browse Open Positions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setCurrentPage('track')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm shadow-sm transition-all"
            >
              Already Applied? Track Status
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
              <span className="block text-2xl font-extrabold text-sky-600">85%+</span>
              <span className="text-xs text-slate-500 font-medium">PPO Full-time Conversion</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
              <span className="block text-2xl font-extrabold text-indigo-600">1-on-1</span>
              <span className="text-xs text-slate-500 font-medium">Dedicated Staff Mentors</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
              <span className="block text-2xl font-extrabold text-purple-600">$1.5k - $2.2k</span>
              <span className="text-xs text-slate-500 font-medium">Monthly Stipend + Perks</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
              <span className="block text-2xl font-extrabold text-emerald-600">100%</span>
              <span className="text-xs text-slate-500 font-medium">Real Production Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Internships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Hot Opportunities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Featured Internship Openings
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Explore highlighted programs currently accepting applications for the upcoming batch.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('listings')}
            className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            View All ({internships.length}) Internships <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              onApplyClick={handleApplyClick}
            />
          ))}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-sky-400">
            Why Our Internship Program?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2">
            No busywork. Only high-impact engineering and design.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            We treat interns as junior colleagues, not coffee runners. You will ship code to production, participate in architecture discussions, and collaborate directly with leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">Production Impact</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Work on core user-facing features, distributed systems, and real ML pipelines that serve thousands of users daily.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">Dedicated 1-on-1 Mentorship</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every intern is paired with a Senior or Staff Engineer for weekly check-ins, PR guidance, and personalized career pathing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">Return Offer Pathway</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our internship program is our primary pipeline for hiring full-time Associate Engineers and Designers post graduation.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Application Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Transparent Hiring Loop
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            How The Selection Process Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            From initial registration to Day 1 onboarding, our hiring process is fast, transparent, and candidate-friendly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative">
            <span className="text-3xl font-black text-sky-100 absolute top-4 right-4">01</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-3">1</div>
            <h3 className="text-base font-bold text-slate-900">Online Registration</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Submit your academic details, project links, and resume through our portal. Receive an instant Application ID.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative">
            <span className="text-3xl font-black text-indigo-100 absolute top-4 right-4">02</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-3">2</div>
            <h3 className="text-base font-bold text-slate-900">Portfolio & Code Review</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Our engineering team evaluates your GitHub projects, coding fundamentals, and coursework relevance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative">
            <span className="text-3xl font-black text-purple-100 absolute top-4 right-4">03</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3">3</div>
            <h3 className="text-base font-bold text-slate-900">Technical Chat</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              A 45-minute friendly discussion with your prospective mentor covering past projects and practical problem-solving.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm relative">
            <span className="text-3xl font-black text-emerald-100 absolute top-4 right-4">04</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">4</div>
            <h3 className="text-base font-bold text-slate-900">Offer & Onboarding Hub</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Receive your formal offer and unlock your Joinee Hub with your mentor match, orientation schedule, and checklist.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 border border-sky-100 rounded-3xl p-8 sm:p-12 text-center max-w-5xl mx-auto space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Ready to kickstart your professional journey?
        </h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Explore all open positions or jump into our application portal. Registration takes less than 2 minutes.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setCurrentPage('listings')}
            className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md shadow-slate-900/20"
          >
            Explore All Available Internships
          </button>
        </div>
      </section>
    </div>
  );
};
