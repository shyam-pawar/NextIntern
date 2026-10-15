import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  ShieldAlert, 
  RotateCcw,
  X,
  Check
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { StatusBadge } from '../components/StatusBadge';
import { DEPARTMENTS, WORK_MODES, APPLICATION_STATUS_STAGES } from '../data/mockData';

export const AdminDashboard = () => {
  const { 
    internships, 
    applications, 
    updateApplicationStatus, 
    addInternship, 
    deleteInternship,
    updateInternship,
    resetToDefaults 
  } = usePortal();

  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'listings'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  
  // Note editing modal/popover
  const [editingNotesAppId, setEditingNotesAppId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Create Internship Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote',
    workMode: 'Remote',
    duration: '6 Months',
    stipend: '$1,800 / month',
    openings: 2,
    deadline: '2026-11-30',
    summary: '',
    skills: 'React, TypeScript, CSS',
    responsibilities: 'Write unit tests\nDevelop components\nParticipate in scrum',
    requirements: 'Pursuing degree in CS\nFamiliar with JavaScript/TypeScript',
    perks: 'Mentorship\nCertificate\nStipend'
  });

  // Calculate stats
  const totalApps = applications.length;
  const underReviewCount = applications.filter(a => a.status === 'Applied' || a.status === 'Under Review').length;
  const interviewCount = applications.filter(a => a.status === 'Interview Scheduled').length;
  const acceptedCount = applications.filter(a => a.status === 'Accepted').length;

  // Filtered applications
  const filteredApps = applications.filter(app => {
    if (statusFilter !== 'All' && app.status !== statusFilter) return false;
    if (selectedDept !== 'All') {
      const parentJob = internships.find(j => j.id === app.internshipId);
      if (parentJob && parentJob.department !== selectedDept) return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = app.fullName.toLowerCase().includes(q);
      const matchEmail = app.email.toLowerCase().includes(q);
      const matchCollege = app.college.toLowerCase().includes(q);
      const matchRole = app.internshipTitle.toLowerCase().includes(q);
      const matchId = app.id.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchCollege && !matchRole && !matchId) return false;
    }
    return true;
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["ID", "FullName", "Email", "Phone", "College", "Degree", "Role", "AppliedDate", "Status", "Notes"];
    const rows = applications.map(a => [
      a.id,
      `"${a.fullName}"`,
      a.email,
      `"${a.phone}"`,
      `"${a.college}"`,
      `"${a.degree}"`,
      `"${a.internshipTitle}"`,
      a.appliedDate,
      a.status,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Intern_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateJobSubmit = (e) => {
    e.preventDefault();
    addInternship({
      title: newJob.title,
      department: newJob.department,
      location: newJob.location,
      workMode: newJob.workMode,
      duration: newJob.duration,
      stipend: newJob.stipend,
      openings: Number(newJob.openings),
      deadline: newJob.deadline,
      summary: newJob.summary,
      skills: newJob.skills.split(',').map(s => s.trim()).filter(Boolean),
      responsibilities: newJob.responsibilities.split('\n').map(r => r.trim()).filter(Boolean),
      requirements: newJob.requirements.split('\n').map(r => r.trim()).filter(Boolean),
      perks: newJob.perks.split('\n').map(p => p.trim()).filter(Boolean),
      experienceLevel: "Entry Level"
    });
    setShowCreateModal(false);
    // Reset form
    setNewJob({
      title: '',
      department: 'Engineering',
      location: 'Remote',
      workMode: 'Remote',
      duration: '6 Months',
      stipend: '$1,800 / month',
      openings: 2,
      deadline: '2026-11-30',
      summary: '',
      skills: 'React, TypeScript, CSS',
      responsibilities: 'Write unit tests\nDevelop components\nParticipate in scrum',
      requirements: 'Pursuing degree in CS\nFamiliar with JavaScript/TypeScript',
      perks: 'Mentorship\nCertificate\nStipend'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
            Talent & HR Management Suite
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Recruiter & Admin Portal
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review incoming applications, update candidate stages, post new internship openings, and manage joinee onboarding.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-sky-600/20"
          >
            <Plus className="w-4 h-4" /> Post New Internship
          </button>

          <button
            onClick={resetToDefaults}
            className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-800 text-xs flex items-center gap-1"
            title="Reset to factory seed data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Registered Interns</span>
          <p className="text-3xl font-black text-slate-900">{totalApps}</p>
          <span className="text-[11px] text-sky-600 font-semibold block">All Cohorts Combined</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Awaiting Screening</span>
          <p className="text-3xl font-black text-amber-600">{underReviewCount}</p>
          <span className="text-[11px] text-amber-600 font-semibold block">Requires Recruiter Action</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Interviewing</span>
          <p className="text-3xl font-black text-purple-600">{interviewCount}</p>
          <span className="text-[11px] text-purple-600 font-semibold block">Active Technical Rounds</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Accepted Joinees</span>
          <p className="text-3xl font-black text-emerald-600">{acceptedCount}</p>
          <span className="text-[11px] text-emerald-600 font-semibold block">Onboarding Hub Active</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'applications'
              ? 'border-sky-600 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Candidate Applications ({applications.length})
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'listings'
              ? 'border-sky-600 text-sky-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Active Job Postings ({internships.length})
        </button>
      </div>

      {/* TAB 1: APPLICATIONS PIPELINE */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate name, college, email, or application ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Under Review">Under Review</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Accepted">Accepted / Selected</option>
                <option value="Rejected">Rejected</option>
              </select>

              <button
                onClick={exportToCSV}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
          </div>

          {/* Table of Applications */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Applicant & ID</th>
                    <th className="px-4 py-3">Target Internship</th>
                    <th className="px-4 py-3">Education & GPA</th>
                    <th className="px-4 py-3">Resume & Links</th>
                    <th className="px-4 py-3">Current Status</th>
                    <th className="px-4 py-3 text-right">Update Status & Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & ID */}
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900 text-sm">{app.fullName}</div>
                        <div className="text-[11px] font-mono text-sky-600 font-semibold">{app.id}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{app.email}</div>
                      </td>

                      {/* Internship */}
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-800">{app.internshipTitle}</div>
                        <span className="text-[10px] text-slate-400">Applied {app.appliedDate}</span>
                      </td>

                      {/* Education */}
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-slate-700 truncate max-w-[180px]">{app.college}</div>
                        <div className="text-[11px] text-slate-500">{app.degree}</div>
                        <div className="text-[11px] font-mono text-emerald-700 font-semibold">GPA: {app.gpa}</div>
                      </td>

                      {/* Resume / Links */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 text-sky-700 font-medium truncate max-w-[140px]">
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{app.resumeUrl}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                          {app.github && (
                            <a href={app.github} target="_blank" rel="noreferrer" className="hover:text-sky-600 underline">
                              GitHub
                            </a>
                          )}
                          {app.linkedin && (
                            <a href={app.linkedin} target="_blank" rel="noreferrer" className="hover:text-sky-600 underline">
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <StatusBadge status={app.status} size="sm" />
                        {app.notes && (
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-1 max-w-[150px]" title={app.notes}>
                            Note: {app.notes}
                          </p>
                        )}
                      </td>

                      {/* Action Dropdown */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                            className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:border-sky-400 cursor-pointer shadow-sm"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Accepted">Accepted / Selected</option>
                            <option value="Rejected">Rejected</option>
                          </select>

                          <button
                            onClick={() => {
                              setEditingNotesAppId(app.id);
                              setNoteText(app.notes || '');
                            }}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500"
                            title="Add recruiter note"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredApps.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No applicants matching the chosen filter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERNSHIP LISTINGS MANAGEMENT */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {job.department}
                    </span>
                    <button
                      onClick={() => updateInternship(job.id, { status: job.status === 'Active' ? 'Closed' : 'Active' })}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        job.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {job.status}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{job.summary}</p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                    <div>Mode: <span className="font-semibold">{job.workMode}</span></div>
                    <div>Stipend: <span className="font-semibold text-emerald-700">{job.stipend}</span></div>
                    <div>Duration: <span className="font-semibold">{job.duration}</span></div>
                    <div>Openings: <span className="font-semibold">{job.openings}</span></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">ID: {job.id}</span>
                  <button
                    onClick={() => deleteInternship(job.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg text-xs flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recruiter Notes Modal */}
      {editingNotesAppId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add / Update Recruiter Notes</h3>
            <textarea
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g., Impressive project portfolio. Scheduled for tech screen on Friday..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingNotesAppId(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateApplicationStatus(editingNotesAppId, applications.find(a => a.id === editingNotesAppId)?.status, noteText);
                  setEditingNotesAppId(null);
                }}
                className="px-4 py-1.5 text-xs font-bold bg-sky-600 text-white rounded-lg hover:bg-sky-500"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Create New Internship Posting</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJobSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Internship Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mobile App Engineering Intern (Flutter/React Native)"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={newJob.department}
                    onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {DEPARTMENTS.filter(d => d !== 'All Departments').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={newJob.workMode}
                    onChange={(e) => setNewJob({ ...newJob, workMode: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {WORK_MODES.filter(m => m !== 'All Modes').map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newJob.duration}
                    onChange={(e) => setNewJob({ ...newJob, duration: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stipend</label>
                  <input
                    type="text"
                    value={newJob.stipend}
                    onChange={(e) => setNewJob({ ...newJob, stipend: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Openings</label>
                  <input
                    type="number"
                    min="1"
                    value={newJob.openings}
                    onChange={(e) => setNewJob({ ...newJob, openings: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Flutter, Dart, Firebase, REST APIs"
                  value={newJob.skills}
                  onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Summary</label>
                <textarea
                  rows={2}
                  placeholder="High-level description of what the intern will learn and build..."
                  value={newJob.summary}
                  onChange={(e) => setNewJob({ ...newJob, summary: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl"
                >
                  Publish Internship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
