import React from 'react';
import { Search, Filter, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { DEPARTMENTS, WORK_MODES } from '../data/mockData';

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  selectedWorkMode,
  setSelectedWorkMode,
  sortBy,
  setSortBy,
  totalResults,
  onReset
}) => {
  const isFiltered = searchQuery !== '' || selectedDepartment !== 'All Departments' || selectedWorkMode !== 'All Modes';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role title, technologies, or keywords (e.g., React, Python, UI)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
          {/* Department */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Work Mode */}
          <select
            value={selectedWorkMode}
            onChange={(e) => setSelectedWorkMode(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer"
          >
            {WORK_MODES.map((mode) => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer"
          >
            <option value="recent">Latest Postings</option>
            <option value="stipend">Highest Stipend</option>
            <option value="deadline">Approaching Deadline</option>
          </select>

          {/* Reset button */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="p-2.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 flex items-center gap-1 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Result Count and active tags */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div>
          Showing <span className="font-semibold text-slate-900">{totalResults}</span> active internship opportunities
        </div>
        {isFiltered && (
          <span className="text-sky-600 font-medium bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
            Filtered results
          </span>
        )}
      </div>
    </div>
  );
};
