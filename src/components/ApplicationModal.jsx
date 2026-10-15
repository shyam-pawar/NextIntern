import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  GraduationCap, 
  User, 
  FileText, 
  Link as LinkIcon,
  ShieldCheck
} from 'lucide-react';
import { usePortal } from '../context/PortalContext';

export const ApplicationModal = ({ internship, onClose, onTrackClick }) => {
  const { applyForInternship } = usePortal();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    college: '',
    degree: '',
    graduationYear: '2026',
    gpa: '',
    linkedin: '',
    github: '',
    portfolio: '',
    coverNote: '',
    resumeName: '',
    agreeTerms: true
  });

  const [submittedApp, setSubmittedApp] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resumeName: file.name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.college || !formData.degree) {
      setError('Please fill in all required fields marked with *');
      return;
    }
    setError('');

    const newApp = applyForInternship({
      ...formData,
      internshipId: internship.id,
      internshipTitle: internship.title,
      resumeName: formData.resumeName || `${formData.fullName.replace(/\s+/g, '_')}_Resume.pdf`
    });

    setSubmittedApp(newApp);
  };

  const copyToClipboard = () => {
    if (submittedApp) {
      navigator.clipboard.writeText(submittedApp.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 px-2.5 py-1 rounded-full border border-sky-400/30">
            Internship Registration
          </span>
          <h2 className="text-2xl font-bold mt-2">{internship.title}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-sky-200">
            <span>{internship.department}</span>
            <span>•</span>
            <span>{internship.location}</span>
            <span>•</span>
            <span className="text-emerald-300 font-semibold">{internship.stipend}</span>
            <span>•</span>
            <span>{internship.duration}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submittedApp ? (
            /* Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Application Registered Successfully!</h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Your profile has been routed to our Talent & Onboarding team. Keep your unique Application Reference ID handy:
                </p>
              </div>

              {/* Ref ID Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm mx-auto flex items-center justify-between shadow-sm">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Application Reference ID</span>
                  <p className="text-lg font-mono font-bold text-sky-700">{submittedApp.id}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors flex items-center gap-1 text-xs font-semibold"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs text-sky-900 space-y-1.5">
                <div className="font-semibold flex items-center gap-1.5 text-sky-950">
                  <ShieldCheck className="w-4 h-4 text-sky-600" /> What happens next?
                </div>
                <p>1. Our hiring team conducts portfolio and academic screening within 3 business days.</p>
                <p>2. You can track real-time progress anytime via our <b>Track Status</b> page.</p>
                <p>3. Once selected, your personalized <b>Joinee Onboarding Hub</b> will unlock with your mentor info & orientation checklist.</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onTrackClick(submittedApp.id);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold shadow-md shadow-sky-600/20 flex items-center justify-center gap-1.5"
                >
                  Track Application Now <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  {error}
                </div>
              )}

              {/* Section 1: Candidate Contact Info */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-sky-600" /> 1. Personal & Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@university.edu"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (555) 000-1234"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current City & Country
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Seattle, USA / Bangalore, India"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Education */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-sky-600" /> 2. Academic Background
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      University / College Name *
                    </label>
                    <input
                      type="text"
                      name="college"
                      required
                      placeholder="e.g. Stanford University / IIT Delhi"
                      value={formData.college}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Degree & Major *
                    </label>
                    <input
                      type="text"
                      name="degree"
                      required
                      placeholder="e.g. B.S. Computer Science / Data Science"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Graduation Year
                      </label>
                      <select
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      >
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        CGPA / Score
                      </label>
                      <input
                        type="text"
                        name="gpa"
                        placeholder="e.g. 3.8 / 4.0 or 8.8"
                        value={formData.gpa}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Links & Profiles */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <LinkIcon className="w-4 h-4 text-sky-600" /> 3. Profiles & Online Portfolio
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/..."
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      name="github"
                      placeholder="https://github.com/..."
                      value={formData.github}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Portfolio / Website
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      placeholder="https://..."
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Resume & Cover Note */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-sky-600" /> 4. Resume & Statement
                </h3>
                <div className="space-y-3.5">
                  {/* Resume Upload Box */}
                  <div className="border-2 border-dashed border-slate-200 hover:border-sky-400 bg-slate-50/70 rounded-2xl p-4 text-center transition-colors">
                    <input
                      type="file"
                      id="resume-file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="resume-file" className="cursor-pointer flex flex-col items-center">
                      <UploadCloud className="w-8 h-8 text-sky-600 mb-1.5" />
                      <span className="text-xs font-semibold text-slate-900">
                        {formData.resumeName ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Selected: {formData.resumeName}
                          </span>
                        ) : (
                          "Click to upload resume (PDF, DOCX up to 10MB)"
                        )}
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        If you don't upload a file, a default resume will be attached automatically.
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Why are you interested in this internship track?
                    </label>
                    <textarea
                      rows={3}
                      name="coverNote"
                      placeholder="Briefly highlight relevant coursework, hackathons, projects, or why you want to join our team..."
                      value={formData.coverNote}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
                />
                <label htmlFor="agreeTerms" className="text-xs text-slate-600">
                  I certify that all information submitted is true, accurate, and represents my own work.
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-sky-600/20 flex items-center gap-1.5"
                >
                  Submit Internship Application <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
