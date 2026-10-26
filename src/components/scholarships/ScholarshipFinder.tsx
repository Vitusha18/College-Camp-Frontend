import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Scholarship } from '../../types';
import {
  Search,
  Award,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  DollarSign,
  Sparkles,
  Clock,
  GraduationCap,
} from 'lucide-react';
import { EligibilityCheckerModal } from './EligibilityCheckerModal';

export const ScholarshipFinder: React.FC = () => {
  const { scholarships, toggleBookmarkScholarship, applyToScholarship, searchQuery } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [isCheckerOpen, setIsCheckerOpen] = useState(false);

  // Application tracker stats
  const applications = useMemo(() => {
    return scholarships.filter((s) => s.status);
  }, [scholarships]);

  const appliedCount = applications.filter((s) => s.status === 'Applied').length;
  const underReviewCount = applications.filter((s) => s.status === 'Under Review').length;
  const selectedCount = applications.filter((s) => s.status === 'Selected').length;
  const notSelectedCount = applications.filter((s) => s.status === 'Not Selected' || s.status === 'Rejected').length;
  const savedCount = scholarships.filter((scholarship) => scholarship.isBookmarked).length;
  const categories = ['All', 'Merit', 'Means', 'Women', 'STEM', 'Minority', 'General'];

  const filteredScholarships = useMemo(() => {
    const query = (search || searchQuery).trim().toLowerCase();
    return scholarships.filter((item) => {
      const matchesSearch =
        query === '' ||
        item.title.toLowerCase().includes(query) ||
        item.provider.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesGender = selectedGender === 'All' || item.gender === 'All' || item.gender === selectedGender;
      return matchesSearch && matchesCategory && matchesGender;
    });
  }, [scholarships, search, searchQuery, selectedCategory, selectedGender]);

  return (
    <div className="space-y-6 pb-12">
      <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/80 to-violet-100/80 px-5 py-7 sm:px-8 sm:py-9">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-700">
            <Sparkles className="h-3.5 w-3.5" /> Fund your education
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
            Scholarships that <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">move you forward.</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            Discover funding opportunities from organizations and take the next step toward your academic goals.
          </p>
          <div className="mt-6 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl border border-white/80 bg-white/80 p-3 shadow-sm">
              <span className="block text-[9px] font-bold uppercase tracking-wide text-indigo-600">Opportunities</span>
              <span className="mt-1 block text-xl font-extrabold text-slate-900">{scholarships.length}</span>
              <span className="text-[10px] text-slate-400">currently listed</span>
            </div>
            <div className="rounded-xl border border-white/80 bg-white/80 p-3 shadow-sm">
              <span className="block text-[9px] font-bold uppercase tracking-wide text-violet-600">Saved</span>
              <span className="mt-1 block text-xl font-extrabold text-slate-900">{savedCount}</span>
              <span className="text-[10px] text-slate-400">for later</span>
            </div>
            <div className="rounded-xl border border-white/80 bg-white/80 p-3 shadow-sm">
              <span className="block text-[9px] font-bold uppercase tracking-wide text-emerald-600">Applications</span>
              <span className="mt-1 block text-xl font-extrabold text-slate-900">{applications.length}</span>
              <span className="text-[10px] text-slate-400">submitted</span>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-1/2 hidden h-72 w-80 -translate-y-1/2 items-center justify-center sm:flex">
          <div className="absolute h-56 w-56 rounded-full bg-gradient-to-br from-indigo-100 to-violet-200/80" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] border border-white bg-white/90 text-indigo-600 shadow-xl shadow-indigo-900/10">
            <GraduationCap className="h-16 w-16" strokeWidth={1.5} />
          </div>
          <span className="absolute left-6 top-12 flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-white text-emerald-600 shadow-lg">
            <DollarSign className="h-5 w-5" />
          </span>
          <span className="absolute bottom-10 right-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-white text-violet-600 shadow-lg">
            <Award className="h-5 w-5" />
          </span>
        </div>
        <button
          onClick={() => setIsCheckerOpen(true)}
          className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:from-indigo-500 hover:to-violet-500 sm:absolute sm:bottom-8 sm:right-8"
        >
          <Sparkles className="h-4 w-4" />
          Check my eligibility
        </button>
      </section>

      {/* Main Grid (8 cols + 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Search, Filters & Cards */}
        <div className="lg:col-span-8 space-y-4">
          {/* Search & Filters */}
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/30 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="scholarship-search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search scholarships by name, foundation, or field..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50 sm:text-sm"
              />
            </div>

            <div role="group" aria-label="Filter scholarships by category" className="flex flex-wrap items-center gap-2 pt-1">
              {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl border px-3 py-2 text-[11px] font-bold transition ${
                  selectedCategory === category
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-700'
                }`}
              >
                {category}
              </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 text-xs">
              <span className="flex items-center gap-1 text-slate-400">
              <SlidersHorizontal className="h-3.5 w-3.5" /> More filters
              </span>
              <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              aria-label="Filter by candidate gender"
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none"
              >
              <option value="All">Gender: All</option>
              <option value="Female">Female Candidates</option>
              <option value="Male">Male Candidates</option>
              </select>

              {(selectedCategory !== 'All' || selectedGender !== 'All' || search) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedGender('All');
                  setSearch('');
                }}
                className="ml-auto font-semibold text-indigo-600 hover:underline"
              >
                Reset filters
              </button>
              )}
            </div>
          </div>

          {/* Scholarship Cards List */}
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 2xl:grid-cols-3">
            {filteredScholarships.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
                <Award className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-semibold text-slate-600">No scholarships found matching criteria</p>
                <p className="text-xs text-slate-400 mt-1">Try broadening your search or resetting category filters.</p>
              </div>
            ) : (
              filteredScholarships.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/20 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-indigo-100 bg-indigo-50 p-1 text-base font-bold text-indigo-600 transition-transform group-hover:scale-105">
                      {item.providerLogo ? (
                        <img src={item.providerLogo} alt={item.provider} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Award className="w-6 h-6" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                          {item.title}
                        </h3>
                        <span className="shrink-0 rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[9px] font-bold text-indigo-700">
                          {item.category}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {item.provider}
                      </p>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-2">
                        <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                          {item.amount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          Deadline: <strong className="text-slate-800">{item.deadline}</strong>
                        </span>
                        <span>
                          {item.degree.join(' • ')}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                    <span className="text-[10px] text-slate-400">Minimum CGPA {item.minCGPA}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBookmarkScholarship(item.id)}
                        className="rounded-xl border border-slate-200 p-2 text-slate-400 transition-colors hover:border-indigo-300 hover:text-indigo-600"
                        aria-label={item.isBookmarked ? `Remove ${item.title} from saved scholarships` : `Save ${item.title}`}
                        title={item.isBookmarked ? 'Bookmarked' : 'Save scholarship'}
                      >
                        {item.isBookmarked ? (
                          <BookmarkCheck className="h-4 w-4 fill-indigo-50 text-indigo-600" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      {item.status ? (
                        <span className="flex items-center gap-1.5 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                          {item.status}
                        </span>
                      ) : (
                        <button
                          onClick={() => applyToScholarship(item.id)}
                          className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 transition-all hover:bg-indigo-700"
                        >
                          Apply
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 4 Cols: My Applications status tracker */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">My Applications</h3>
              <span className="text-xs font-semibold text-slate-400">
                {applications.length} Total
              </span>
            </div>

            {/* Tracker Metric Cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500 block">
                  Applied
                </span>
                <span className="text-xl font-extrabold text-purple-900 mt-1 block">
                  {appliedCount}
                </span>
                <span className="text-[10px] text-purple-600 font-medium">Scholarships</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                  Under Review
                </span>
                <span className="text-xl font-extrabold text-amber-900 mt-1 block">
                  {underReviewCount}
                </span>
                <span className="text-[10px] text-amber-700 font-medium">Scholarship</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 block">
                  Selected
                </span>
                <span className="text-xl font-extrabold text-emerald-900 mt-1 block">
                  {selectedCount}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">Awarded</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Not Selected
                </span>
                <span className="text-xl font-extrabold text-slate-700 mt-1 block">
                  {notSelectedCount}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">Scholarships</span>
              </div>
            </div>

            {/* Active Applications List */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Submitted Grants
              </h4>

              {applications.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">
                  No active scholarship submissions yet.
                </p>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {app.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {app.amount}
                      </p>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        app.status === 'Selected'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Under Review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Smart Eligibility Modal */}
      <EligibilityCheckerModal
        isOpen={isCheckerOpen}
        onClose={() => setIsCheckerOpen(false)}
      />
    </div>
  );
};
