import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Bell,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  GraduationCap,
  MapPin,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

const dateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const StudentDashboard: React.FC = () => {
  const {
    userProfile,
    internships,
    scholarships,
    tasks,
    toggleTask,
    events,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    setActiveTab,
    toggleBookmarkInternship,
    toggleBookmarkScholarship,
  } = useApp();

  const today = new Date();
  const todayKey = dateKey(today);
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);
  const upcomingDeadlines = tasks.filter((task) => {
    if (task.completed) return false;
    const due = new Date(`${task.dueDate}T00:00:00`);
    return !Number.isNaN(due.getTime()) && due >= new Date(`${todayKey}T00:00:00`) && due <= weekEnd;
  }).length;
  const tasksToday = tasks.filter((task) => !task.completed && task.dueDate === todayKey).length;
  const eventsThisWeek = events.filter((event) => {
    const eventDate = new Date(event.date);
    return !Number.isNaN(eventDate.getTime()) && eventDate >= today && eventDate <= weekEnd;
  }).length;
  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const topInternships = internships.slice(0, 3);
  const topScholarships = scholarships.slice(0, 3);
  const todaysTasks = tasks.slice(0, 5);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthLength = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const calendarCells: Array<number | null> = [
    ...Array.from({ length: monthStart.getDay() }, () => null),
    ...Array.from({ length: monthLength }, (_, index) => index + 1),
  ];

  const metrics = [
    { label: 'Deadlines this week', value: upcomingDeadlines, detail: 'Tasks coming up', icon: Clock3, color: 'rose' },
    { label: 'Internship matches', value: internships.length, detail: 'Open opportunities', icon: Briefcase, color: 'emerald' },
    { label: 'Scholarships', value: scholarships.length, detail: 'Funding opportunities', icon: Award, color: 'violet' },
    { label: 'Your CGPA', value: (userProfile.cgpa || 0).toFixed(2), detail: 'Out of 10.00', icon: GraduationCap, color: 'blue' },
    { label: 'Tasks today', value: tasksToday, detail: 'Still to complete', icon: CheckCircle2, color: 'amber' },
    { label: 'Events this week', value: eventsThisWeek, detail: 'On your campus', icon: CalendarDays, color: 'teal' },
  ] as const;
  const metricColors = {
    rose: 'bg-rose-50 text-rose-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    violet: 'bg-violet-50 text-violet-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    teal: 'bg-teal-50 text-teal-600',
  };

  return (
    <div className="space-y-5 pb-8">
      <h1 className="sr-only">Welcome back, {userProfile.name?.split(' ')[0] || 'Student'}</h1>
      <section aria-label="Campus overview" className="grid grid-cols-2 gap-3 xl:grid-cols-6">
        {metrics.map(({ label, value, detail, icon: Icon, color }) => (
          <article key={label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/30">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold leading-tight text-slate-500">{label}</p>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${metricColors[color]}`}>
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{value}</p>
            <p className="mt-0.5 truncate text-[10px] text-slate-400">{detail}</p>
          </article>
        ))}
      </section>

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-12">
        <div className="space-y-5 xl:col-span-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Internship picks</h2>
                  <p className="mt-0.5 text-[11px] text-slate-400">Opportunities to explore</p>
                </div>
                <button type="button" onClick={() => setActiveTab('internships')} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800">
                  View all
                </button>
              </div>
              <div className="space-y-2.5">
                {topInternships.length ? topInternships.map((internship) => (
                  <article key={internship.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-indigo-200">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Briefcase className="h-4 w-4" />
                    </span>
                    <button type="button" onClick={() => setActiveTab('internships')} className="min-w-0 flex-1 text-left">
                      <span className="block truncate text-xs font-bold text-slate-800">{internship.title}</span>
                      <span className="mt-0.5 block truncate text-[10px] text-slate-400">{internship.company} · {internship.location}</span>
                      <span className="mt-1 block text-[10px] font-semibold text-indigo-600">{internship.stipend}</span>
                    </button>
                    <button
                      type="button"
                      aria-label={internship.isBookmarked ? `Remove ${internship.title} from saved internships` : `Save ${internship.title}`}
                      onClick={() => void toggleBookmarkInternship(internship.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      {internship.isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>
                  </article>
                )) : <p className="rounded-xl bg-slate-50 px-3 py-6 text-center text-xs text-slate-400">No internship opportunities are available yet.</p>}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Scholarship picks</h2>
                  <p className="mt-0.5 text-[11px] text-slate-400">Funding that may fit your goals</p>
                </div>
                <button type="button" onClick={() => setActiveTab('scholarships')} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800">
                  View all
                </button>
              </div>
              <div className="space-y-2.5">
                {topScholarships.length ? topScholarships.map((scholarship) => (
                  <article key={scholarship.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-violet-200">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                      <Award className="h-4 w-4" />
                    </span>
                    <button type="button" onClick={() => setActiveTab('scholarships')} className="min-w-0 flex-1 text-left">
                      <span className="block truncate text-xs font-bold text-slate-800">{scholarship.title}</span>
                      <span className="mt-0.5 block truncate text-[10px] text-slate-400">{scholarship.provider} · {scholarship.category}</span>
                      <span className="mt-1 block text-[10px] font-semibold text-violet-600">{scholarship.amount}</span>
                    </button>
                    <button
                      type="button"
                      aria-label={scholarship.isBookmarked ? `Remove ${scholarship.title} from saved scholarships` : `Save ${scholarship.title}`}
                      onClick={() => void toggleBookmarkScholarship(scholarship.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-violet-50 hover:text-violet-600"
                    >
                      {scholarship.isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>
                  </article>
                )) : <p className="rounded-xl bg-slate-50 px-3 py-6 text-center text-xs text-slate-400">No scholarships are available yet.</p>}
              </div>
            </section>
          </div>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Today’s tasks</h2>
                <p className="mt-0.5 text-[11px] text-slate-400">{completedTasksCount} completed across your plan</p>
              </div>
              <button type="button" onClick={() => setActiveTab('study-planner')} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800">Open planner</button>
            </div>
            <div className="divide-y divide-slate-100">
              {todaysTasks.length ? todaysTasks.map((task) => (
                <label key={task.id} className="flex cursor-pointer items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => void toggleTask(task.id)}
                    aria-label={`Mark ${task.title} ${task.completed ? 'incomplete' : 'complete'}`}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className={`min-w-0 flex-1 truncate text-xs font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.title}</span>
                  <span className="shrink-0 text-[10px] text-slate-400">{task.dueText}</span>
                  <span className={`hidden rounded-full px-2 py-1 text-[9px] font-bold sm:inline ${task.priority === 'High' ? 'bg-rose-50 text-rose-600' : task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{task.priority}</span>
                </label>
              )) : <p className="py-6 text-center text-xs text-slate-400">Your study plan is clear. Add a task to get started.</p>}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Latest notifications</h2>
                <p className="mt-0.5 text-[11px] text-slate-400">{unreadNotificationsCount} unread updates</p>
              </div>
              <button type="button" onClick={() => setActiveTab('notifications')} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800">View all</button>
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 3).map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => {
                    if (!notification.isRead) void markNotificationRead(notification.id);
                    setActiveTab(notification.actionUrl as Parameters<typeof setActiveTab>[0] || 'notifications');
                  }}
                  className="flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition hover:bg-slate-50"
                >
                  <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${notification.isRead ? 'bg-slate-100 text-slate-500' : 'bg-indigo-50 text-indigo-600'}`}>
                    <Bell className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-slate-800">{notification.title}</span>
                    <span className="mt-0.5 block truncate text-[10px] text-slate-500">{notification.message}</span>
                  </span>
                  <span className="shrink-0 text-[10px] text-slate-400">{notification.timeAgo}</span>
                </button>
              ))}
              {notifications.length === 0 && (
                <p className="py-5 text-center text-xs text-slate-400">You’re all caught up.</p>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-5 xl:col-span-4">
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Your study calendar</h2>
                <p className="mt-0.5 text-[11px] text-slate-400">{today.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
              </div>
              <button type="button" onClick={() => setActiveTab('study-planner')} className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-indigo-600" aria-label="Open study planner">
                <CalendarDays className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <span key={`${day}-${index}`} className="pb-1 text-[10px] font-semibold text-slate-400">{day}</span>
              ))}
              {calendarCells.map((day, index) => (
                <span key={`${day ?? 'blank'}-${index}`} className="flex h-8 items-center justify-center">
                  {day ? (
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] ${day === today.getDate() ? 'bg-indigo-600 font-bold text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>{day}</span>
                  ) : null}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-[10px] text-slate-400">
              <Circle className="h-2.5 w-2.5 fill-indigo-500 text-indigo-500" />
              Today
              <span className="ml-auto">{tasksToday} tasks due today</span>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Upcoming events</h2>
                <p className="mt-0.5 text-[11px] text-slate-400">Happening on your campus</p>
              </div>
              <button type="button" onClick={() => setActiveTab('events')} className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800">View all</button>
            </div>
            <div className="space-y-3">
              {events.slice(0, 4).map((event) => (
                <button key={event.id} type="button" onClick={() => setActiveTab('events')} className="flex w-full items-start gap-3 rounded-xl text-left">
                  <span className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <span className="text-[9px] font-bold uppercase">{new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}</span>
                    <span className="text-sm font-extrabold leading-none">{new Date(event.date).getDate()}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-slate-800">{event.title}</span>
                    <span className="mt-1 flex items-center gap-1 truncate text-[10px] text-slate-400">
                      <MapPin className="h-3 w-3 shrink-0" />{event.venue || event.mode}
                    </span>
                  </span>
                  <span className="mt-1 text-[10px] font-medium text-slate-400">{event.time}</span>
                </button>
              ))}
              {events.length === 0 && <p className="py-5 text-center text-xs text-slate-400">No campus events yet.</p>}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-5 text-white shadow-lg shadow-indigo-600/15">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[9px] font-bold uppercase tracking-wide">
                  <Sparkles className="h-3 w-3" /> Keep growing
                </span>
                <h2 className="mt-3 text-base font-bold">Build your next opportunity</h2>
                <p className="mt-1 text-[11px] leading-relaxed text-indigo-100">Explore roles, fund your studies, and keep your portfolio up to date.</p>
              </div>
              <TrendingUp className="h-6 w-6 shrink-0 text-white/75" />
            </div>
            <button type="button" onClick={() => setActiveTab('portfolio')} className="mt-4 rounded-lg bg-white px-3 py-2 text-[11px] font-bold text-indigo-700 transition hover:bg-indigo-50">
              Update portfolio
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
