import React, { useState, useMemo } from 'react';
import { Compass, Sparkles, AlertCircle } from 'lucide-react';
import { usePortal } from '../context/PortalContext';
import { InternshipCard } from '../components/InternshipCard';
import { FilterBar } from '../components/FilterBar';

export const ListingsPage = ({ onApplyClick, onTrackClick }) => {
  const { internships } = usePortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All Modes');
  const [sortBy, setSortBy] = useState('recent');

  const filteredInternships = useMemo(() => {
    return internships.filter((job) => {
      // Department filter
      if (selectedDepartment !== 'All Departments' && job.department !== selectedDepartment) {
        return false;
      }
      // Work mode filter
      if (selectedWorkMode !== 'All Modes' && job.workMode !== selectedWorkMode) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(query);
        const matchSummary = job.summary.toLowerCase().includes(query);
        const matchDept = job.department.toLowerCase().includes(query);
        const matchLocation = job.location.toLowerCase().includes(query);
        const matchSkills = job.skills.some(s => s.toLowerCase().includes(query));

        if (!matchTitle && !matchSummary && !matchDept && !matchLocation && !matchSkills) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'stipend') {
        const stipendA = parseInt(a.stipend.replace(/[^0-9]/g, '')) || 0;
        const stipendB = parseInt(b.stipend.replace(/[^0-9]/g, '')) || 0;
        return stipendB - stipendA;
      }
      if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      // default: recent
      return new Date(b.postedDate) - new Date(a.postedDate);
    });
  }, [internships, searchQuery, selectedDepartment, selectedWorkMode, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All Departments');
    setSelectedWorkMode('All Modes');
    setSortBy('recent');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Internship Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Available Internship Programs
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
          Browse our active 2026 cohort positions. Each program includes full hands-on mentorship, production projects, competitive stipends, and certificate of completion.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedWorkMode={selectedWorkMode}
        setSelectedWorkMode={setSelectedWorkMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={filteredInternships.length}
        onReset={handleResetFilters}
      />

      {/* Grid of Listings */}
      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((job) => (
            <InternshipCard
              key={job.id}
              internship={job}
              onApplyClick={onApplyClick}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching internships found</h3>
          <p className="text-xs text-slate-500">
            We couldn't find any opportunities matching your selected filters. Try broadening your keywords or resetting filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-sky-600 text-white text-xs font-semibold rounded-xl hover:bg-sky-500 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
