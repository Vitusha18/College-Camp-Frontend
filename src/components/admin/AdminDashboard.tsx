import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Internship, Scholarship, CampusEvent, CommunityPost } from '../../types';
import {
  ShieldAlert,
  Briefcase,
  Award,
  Calendar,
  Users2,
  BarChart3,
  Plus,
  Trash2,
  Pin,
  CheckCircle2,
  Eye,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Building2,
  X,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#4f46e5', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

const dateInputDaysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const AdminDashboard: React.FC = () => {
  const {
    internships,
    addInternship,
    deleteInternship,
    scholarships,
    addScholarship,
    deleteScholarship,
    events,
    addEvent,
    deleteEvent,
    communityPosts,
    moderatePost,
    activeTab
  } = useApp();

  // Modals for creating new items
  const [isAddInternshipOpen, setIsAddInternshipOpen] = useState(false);
  const [isAddScholarshipOpen, setIsAddScholarshipOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [formError, setFormError] = useState('');

  // New Internship form
  const [newInternship, setNewInternship] = useState({
    title: '',
    company: '',
    location: 'Bangalore, India',
    type: 'Remote' as const,
    stipend: '₹20,000/month',
    stipendAmount: 20000,
    duration: '3 Months',
    skills: 'React, Node.js, TypeScript',
    description: '',
    category: 'Software Engineering',
    deadline: dateInputDaysFromNow(30),
  });

  // New Scholarship form
  const [newScholarship, setNewScholarship] = useState({
    title: '',
    provider: '',
    amount: '₹1,00,000',
    deadline: dateInputDaysFromNow(45),
    minCGPA: 8.0,
    maxIncomeLPA: 6.0,
    category: 'Merit' as const,
    gender: 'All' as const,
    degree: 'B.Tech, BE',
    description: '',
  });

  // New Event form
  const [newEvent, setNewEvent] = useState({
    title: '',
    organizer: 'Campus Tech Council',
    date: dateInputDaysFromNow(14),
    time: '10:00 AM - 04:00 PM',
    venue: 'Seminar Hall 1',
    category: 'Workshops' as const,
    description: '',
    maxAttendees: 120,
    registrationDeadline: dateInputDaysFromNow(13),
  });

  // Handle creates
  const handleCreateInternship = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    try {
      await addInternship({
        ...newInternship,
        skills: newInternship.skills.split(',').map((s) => s.trim()),
        applicantsCount: 0,
      });
      setIsAddInternshipOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to create internship. Please try again.');
    }
  };

  const handleCreateScholarship = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    try {
      await addScholarship({
        ...newScholarship,
        degree: newScholarship.degree.split(',').map((s) => s.trim()),
        applicantsCount: 0,
      });
      setIsAddScholarshipOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to create scholarship. Please try again.');
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    try {
      await addEvent({
        ...newEvent,
        registeredCount: 0,
        isRegistered: false,
      });
      setIsAddEventOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to create event. Please try again.');
    }
  };

  // Use dynamic active data lengths
  const engagementData = [
    { name: 'Internships', count: internships.length },
    { name: 'Scholarships', count: scholarships.length },
    { name: 'Events', count: events.length },
    { name: 'Posts', count: communityPosts.length },
  ];

  const departmentData = [
    { name: 'Active Programs', value: internships.length + scholarships.length },
    { name: 'Community', value: communityPosts.length + events.length }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Admin Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">Campus Administration Portal</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage verified opportunities, moderate peer community discussions, and inspect platform analytics.
            </p>
          </div>
        </div>

      </div>

      {/* 1. ANALYTICS TAB */}
      {activeTab === 'admin-analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Total Opportunities</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{internships.length + scholarships.length}</span>
              <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">Active Openings</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Community Reach</span>
              <span className="text-2xl font-black text-indigo-600 mt-1 block">{communityPosts.length}</span>
              <span className="text-xs text-slate-500 font-medium mt-1 inline-block">Discussions Hosted</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Event Scale</span>
              <span className="text-2xl font-black text-purple-600 mt-1 block">{events.length}</span>
              <span className="text-xs text-slate-500 font-medium mt-1 inline-block">Events Tracked</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Admin Session</span>
              <span className="text-2xl font-black text-teal-600 mt-1 block">Active</span>
              <span className="text-xs text-slate-500 font-medium mt-1 inline-block">Administrator access is enabled</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                Platform Activity & Student Engagement
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
                Department Distribution
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={departmentData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                      {departmentData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-600 mt-2">
                {departmentData.map((d, i) => (
                  <span key={d.name} className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    {d.name} ({d.value}%)
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. INTERNSHIPS MANAGEMENT */}
      {activeTab === 'admin-internships' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Manage Internship Openings ({internships.length})
            </h3>
            <button
              onClick={() => {
                setFormError('');
                setIsAddInternshipOpen(true);
              }}
              className="py-2 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Post New Internship
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {internships.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                  <p className="text-[11px] text-slate-500">
                    {item.company} • {item.location} • {item.stipend} • {item.applicantsCount} Applicants
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {item.type}
                  </span>
                  <button
                    onClick={() => void deleteInternship(item.id)}
                    aria-label={`Delete internship ${item.title}`}
                    className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SCHOLARSHIPS MANAGEMENT */}
      {activeTab === 'admin-scholarships' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              Manage Scholarship Schemes ({scholarships.length})
            </h3>
            <button
              onClick={() => {
                setFormError('');
                setIsAddScholarshipOpen(true);
              }}
              className="py-2 px-3.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Scholarship
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {scholarships.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                  <p className="text-[11px] text-slate-500">
                    {item.provider} • {item.amount} • Deadline: {item.deadline}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                    Min CGPA {item.minCGPA}
                  </span>
                  <button
                    onClick={() => void deleteScholarship(item.id)}
                    aria-label={`Delete scholarship ${item.title}`}
                    className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. EVENTS MANAGEMENT */}
      {activeTab === 'admin-events' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              Manage Campus Events ({events.length})
            </h3>
            <button
              onClick={() => {
                setFormError('');
                setIsAddEventOpen(true);
              }}
              className="py-2 px-3.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Schedule Event
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {events.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                  <p className="text-[11px] text-slate-500">
                    {item.date} • {item.venue} • {item.registeredCount}/{item.maxAttendees} registered
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                    {item.category}
                  </span>
                  <button
                    onClick={() => void deleteEvent(item.id)}
                    aria-label={`Delete event ${item.title}`}
                    className="p-1.5 text-slate-300 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. MODERATION TAB */}
      {activeTab === 'admin-moderation' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users2 className="w-4 h-4 text-indigo-600" />
              Community Discussion Moderation ({communityPosts.length} Posts)
            </h3>
            <span className="text-xs text-slate-400 font-medium">Automatic spam filters active</span>
          </div>

          <div className="space-y-3">
            {communityPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{post.authorName}</span>
                    <span className="text-[10px] text-slate-400 font-medium">in {post.category}</span>
                    {post.isPinned && (
                      <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Pinned</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 line-clamp-1">{post.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => void moderatePost(post.id, 'pin')}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <Pin className="w-3.5 h-3.5" /> Pin
                  </button>
                  <button
                    onClick={() => void moderatePost(post.id, 'delete')}
                    className="p-2 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Internship Modal */}
      {isAddInternshipOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsAddInternshipOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 space-y-3 z-10 animate-in fade-in">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-sm font-bold text-slate-900">Post Internship Opening</h3>
              <button type="button" aria-label="Close internship form" onClick={() => setIsAddInternshipOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            {formError && <p role="alert" className="text-xs text-rose-700">{formError}</p>}
            <form onSubmit={handleCreateInternship} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={newInternship.title}
                  onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
                  placeholder="e.g. AI Research Intern"
                  className="w-full text-xs p-2 rounded-xl border"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={newInternship.company}
                  onChange={(e) => setNewInternship({ ...newInternship, company: e.target.value })}
                  placeholder="e.g. Google India"
                  className="w-full text-xs p-2 rounded-xl border"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Stipend</label>
                  <input
                    type="text"
                    value={newInternship.stipend}
                    onChange={(e) => setNewInternship({ ...newInternship, stipend: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={newInternship.duration}
                    onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl border"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Application Deadline *</label>
                <input
                  type="date"
                  required
                  min={dateInputDaysFromNow(0)}
                  value={newInternship.deadline}
                  onChange={(e) => setNewInternship({ ...newInternship, deadline: e.target.value })}
                  className="w-full text-xs p-2 rounded-xl border"
                />
              </div>
              <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl">
                Publish Opening
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Scholarship Modal */}
      {isAddScholarshipOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsAddScholarshipOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 space-y-3 z-10 animate-in fade-in">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-sm font-bold text-slate-900">Add Scholarship Scheme</h3>
              <button type="button" aria-label="Close scholarship form" onClick={() => setIsAddScholarshipOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            {formError && <p role="alert" className="text-xs text-rose-700">{formError}</p>}
            <form onSubmit={handleCreateScholarship} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Scheme Title *</label>
                <input
                  type="text"
                  required
                  value={newScholarship.title}
                  onChange={(e) => setNewScholarship({ ...newScholarship, title: e.target.value })}
                  placeholder="e.g. Siemens STEM Fellowship"
                  className="w-full text-xs p-2 rounded-xl border"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Provider Foundation *</label>
                <input
                  type="text"
                  required
                  value={newScholarship.provider}
                  onChange={(e) => setNewScholarship({ ...newScholarship, provider: e.target.value })}
                  placeholder="e.g. Siemens Foundation"
                  className="w-full text-xs p-2 rounded-xl border"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Amount</label>
                  <input
                    type="text"
                    value={newScholarship.amount}
                    onChange={(e) => setNewScholarship({ ...newScholarship, amount: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Min CGPA</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    required
                    value={newScholarship.minCGPA}
                    onChange={(e) => setNewScholarship({ ...newScholarship, minCGPA: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2 rounded-xl border"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Application Deadline *</label>
                <input
                  type="date"
                  required
                  min={dateInputDaysFromNow(0)}
                  value={newScholarship.deadline}
                  onChange={(e) => setNewScholarship({ ...newScholarship, deadline: e.target.value })}
                  className="w-full text-xs p-2 rounded-xl border"
                />
              </div>
              <button type="submit" className="w-full py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl">
                Publish Scholarship
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddEventOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsAddEventOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl p-6 space-y-3 z-10 animate-in fade-in">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-sm font-bold text-slate-900">Schedule Campus Event</h3>
              <button type="button" aria-label="Close event form" onClick={() => setIsAddEventOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            {formError && <p role="alert" className="text-xs text-rose-700">{formError}</p>}
            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. NextGen Web3 Hackathon"
                  className="w-full text-xs p-2 rounded-xl border"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    min={dateInputDaysFromNow(0)}
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Venue</label>
                  <input
                    type="text"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl border"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 bg-teal-600 text-white font-bold text-xs rounded-xl">
                Schedule Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
