import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Menu, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeTab,
    searchQuery,
    setSearchQuery,
    unreadNotificationsCount,
    userProfile,
    setIsMobileNavOpen,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
  } = useApp();

  const pageTitle: Record<string, string> = {
    dashboard: `Welcome back, ${userProfile.name?.split(' ')[0] || 'Student'}!`,
    internships: 'Internship opportunities',
    scholarships: 'Scholarship opportunities',
    'study-planner': 'Your study planner',
    'gpa-calculator': 'Academic performance',
    events: 'Campus events',
    community: 'Campus community',
    portfolio: 'Your portfolio',
    achievements: 'Your portfolio',
    notifications: 'Notifications',
    settings: 'Settings',
    profile: 'Your profile',
    'admin-analytics': 'Admin analytics',
    'admin-internships': 'Manage internships',
    'admin-scholarships': 'Manage scholarships',
    'admin-events': 'Manage events',
    'admin-moderation': 'Community moderation',
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-4 border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(true)}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-base font-extrabold tracking-tight text-slate-900">
            {pageTitle[activeTab] || 'CampusConnect'}
          </p>
          {activeTab === 'dashboard' && (
            <p className="mt-0.5 text-[11px] text-slate-400">Here’s what’s happening on your campus today.</p>
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center px-1 sm:px-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search opportunities, scholarships, and events"
            placeholder="Search internships, scholarships, events..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setIsNotificationDrawerOpen(!isNotificationDrawerOpen)}
          className="relative rounded-xl p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-700"
          aria-label="Toggle notifications drawer"
          aria-expanded={isNotificationDrawerOpen}
        >
          <Bell className="h-5 w-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
              {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
            </span>
          )}
        </button>
        <div className="hidden items-center gap-2 border-l border-slate-100 pl-3 sm:flex">
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt="" className="h-full w-full object-cover" />
            ) : userProfile.name?.charAt(0) || 'S'}
          </span>
          <div className="max-w-28">
            <p className="truncate text-[11px] font-bold text-slate-800">{userProfile.name || 'Student'}</p>
            <p className="text-[10px] capitalize text-slate-400">{userProfile.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
