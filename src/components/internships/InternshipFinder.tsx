import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Internship, ApplicationStatus } from '../../types';
import {
  Search,
  SlidersHorizontal,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Send,
  Eye,
  Filter,
  Sparkles,
} from 'lucide-react';
import { InternshipModal } from './InternshipModal';

export const InternshipFinder: React.FC = () => {
  const { internships, toggleBookmarkInternship, applyToInternship, searchQuery } = useApp();

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [minStipend, setMinStipend] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const [activeModalInternship, setActiveModalInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Application tracker stats calculation
  const applications = useMemo(() => {
    return internships.filter((i) => i.status);
  }, [internships]);

  const appliedCount = applications.filter((i) => i.status === 'Applied').length;
  const interviewCount = applications.filter((i) => i.status === 'Interview Scheduled').length;
  const selectedCount = applications.filter((i) => i.status === 'Selected').length;
  const rejectedCount = applications.filter((i) => i.status === 'Rejected').length;

  // Filtered internships
  const filteredList = useMemo(() => {
    const query = (search || searchQuery).trim().toLowerCase();
    return internships.filter((item) => {
      const matchesSearch =
        query === '' ||
        item.title.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query) ||
        item.skills.some((s) => s.toLowerCase().includes(query));

      const matchesType = selectedType === 'All' || item.type === selectedType;
      const matchesStipend = item.stipendAmount >= minStipend;
      const matchesDuration = selectedDuration === 'All' || item.duration.includes(selectedDuration);
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory;

      return matchesSearch && matchesType && matchesStipend && matchesDuration && matchesCategory;
    });
  }, [internships, search, searchQuery, selectedType, minStipend, selectedDuration, filterCategory]);

  const openDetails = (internship: Internship) => {
    setActiveModalInternship(internship);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Internship Finder</h2>
          <p className="text-xs text-slate-500">
            Discover verified campus & off-campus internships matched to your skills and domain.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
            🎯 <strong className="text-indigo-600 font-bold">{filteredList.length}</strong> Openings Available
          </span>
        </div>
      </div>

      {/* Main Grid: Listings (8 cols) + Application Tracker (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Search, Filters, Internship Cards */}
        <div className="lg:col-span-8 space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="internship-search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by role, skills, company..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
              </span>

              {/* Work Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:border-indigo-500"
              >
                <option value="All">Mode: All</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>

              {/* Stipend Filter */}
              <select
                value={minStipend}
                onChange={(e) => setMinStipend(Number(e.target.value))}
                className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:border-indigo-500"
              >
                <option value={0}>Stipend: Any</option>
                <option value={15000}>₹15,000+ / mo</option>
                <option value={20000}>₹20,000+ / mo</option>
                <option value={25000}>₹25,000+ / mo</option>
              </select>

              {/* Duration Filter */}
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:border-indigo-500"
              >
                <option value="All">Duration: Any</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
              </select>

              {(selectedType !== 'All' || minStipend !== 0 || selectedDuration !== 'All' || search) && (
                <button
                  onClick={() => {
                    setSelectedType('All');
                    setMinStipend(0);
                    setSelectedDuration('All');
                    setSearch('');
                  }}
                  className="text-indigo-600 hover:underline font-semibold ml-auto"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Listings */}
          <div className="space-y-3.5">
            {filteredList.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
                <Briefcase className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-semibold text-slate-600">No internships match your current filters</p>
                <p className="text-xs text-slate-400 mt-1">Try relaxing stipend or work mode filters.</p>
              </div>
            ) : (
              filteredList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center text-indigo-600 font-bold text-base shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                      {item.companyLogo ? (
                        <img src={item.companyLogo} alt={item.company} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        item.company.charAt(0)
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {item.title}
                        </h3>
                        {item.status && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.status === 'Selected'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : item.status === 'Interview Scheduled'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : item.status === 'Rejected'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            }`}
                          >
                            {item.status}
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {item.company}
                      </p>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {item.location} ({item.type})
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          {item.stipend}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {item.duration}
                        </span>
                      </div>

                      {/* Skills Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-semibold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBookmarkInternship(item.id)}
                        className="p-2 rounded-xl border border-slate-200 hover:border-indigo-300 text-slate-400 hover:text-indigo-600 transition-colors"
                        title={item.isBookmarked ? 'Bookmarked' : 'Save internship'}
                      >
                        {item.isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-50" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => openDetails(item)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        Details
                      </button>

                      {item.status ? (
                        <button
                          onClick={() => openDetails(item)}
                          className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Applied
                        </button>
                      ) : (
                        <button
                          onClick={() => openDetails(item)}
                          className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 px-4 py-2 rounded-xl transition-all"
                        >
                          Apply
                        </button>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-400">
                      Deadline: {item.deadline}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 4 Cols: Application Tracker */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Application Tracker</h3>
              <span className="text-xs font-semibold text-slate-400">
                {applications.length} Total
              </span>
            </div>

            {/* Tracker Metric Rows matching UI screenshot */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 block">
                  Applied
                </span>
                <span className="text-xl font-extrabold text-indigo-900 mt-1 block">
                  {appliedCount}
                </span>
                <span className="text-[10px] text-indigo-600 font-medium">Applications</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block">
                  Interview Scheduled
                </span>
                <span className="text-xl font-extrabold text-blue-900 mt-1 block">
                  {interviewCount}
                </span>
                <span className="text-[10px] text-blue-600 font-medium">Application</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 block">
                  Selected
                </span>
                <span className="text-xl font-extrabold text-emerald-900 mt-1 block">
                  {selectedCount}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">Offers</span>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
                  Rejected
                </span>
                <span className="text-xl font-extrabold text-rose-900 mt-1 block">
                  {rejectedCount}
                </span>
                <span className="text-[10px] text-rose-600 font-medium">Application</span>
              </div>
            </div>

            {/* Active Applications List */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Recent Submissions
              </h4>

              {applications.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">
                  You haven't submitted any applications yet.
                </p>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => openDetails(app)}
                    className="cursor-pointer p-3 rounded-xl border border-slate-100 hover:border-indigo-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {app.company}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {app.title}
                      </p>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        app.status === 'Selected'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Interview Scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-indigo-100 text-indigo-800'
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

      {/* Internship Detail / Apply Modal */}
      <InternshipModal
        internship={activeModalInternship}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveModalInternship(null);
        }}
      />
    </div>
  );
};
