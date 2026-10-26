import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { api } from '../../services/api';
import {
  Award,
  BarChart3,
  Bell,
  Briefcase,
  Calculator,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Trophy,
  Users2,
  X,
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unreadNotificationsCount,
    userProfile,
    userRole,
    isMobileNavOpen,
    setIsMobileNavOpen,
  } = useApp();

  const navItems: NavItem[] = userRole === 'admin' ? [
    { id: 'admin-analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'admin-internships', label: 'Internships', icon: Briefcase },
    { id: 'admin-scholarships', label: 'Scholarships', icon: Award },
    { id: 'admin-events', label: 'Events', icon: CalendarDays },
    { id: 'admin-moderation', label: 'Moderation', icon: ShieldCheck },
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'study-planner', label: 'Study Planner', icon: CalendarDays },
    { id: 'gpa-calculator', label: 'GPA Calculator', icon: Calculator },
    { id: 'events', label: 'Events', icon: CalendarDays },
    { id: 'community', label: 'Community', icon: Users2 },
    { id: 'portfolio', label: 'Portfolio', icon: Trophy },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationsCount || undefined },
  ];

  React.useEffect(() => {
    const globalTabs: ActiveTab[] = ['settings', 'profile'];
    if (globalTabs.includes(activeTab)) return;

    if (userRole === 'admin' && !navItems.some((item) => item.id === activeTab)) {
      setActiveTab('admin-analytics');
    } else if (userRole === 'student' && !navItems.some((item) => item.id === activeTab)) {
      setActiveTab('dashboard');
    }
  }, [userRole, activeTab, setActiveTab, navItems]);

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setIsMobileNavOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of your session?')) {
      api.logout();
      window.location.href = '/';
    }
  };

  return (
    <>
      {isMobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] lg:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-slate-200 bg-white text-slate-600 shadow-xl transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
          <button
            type="button"
            onClick={() => handleNavClick(userRole === 'admin' ? 'admin-analytics' : 'dashboard')}
            className="flex items-center gap-2.5 text-left"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-[15px] font-extrabold tracking-tight text-slate-900">CampusConnect</span>
          </button>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Main navigation" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-600/20'
                    : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-[17px] w-[17px]" />
                  {item.label}
                </span>
                {item.badge !== undefined && (
                  <span className={`min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-slate-100 p-3">
          {userRole === 'student' && userProfile.profileCompletion < 100 && (
            <button
              type="button"
              onClick={() => handleNavClick('settings')}
              className="w-full rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-3.5 text-left"
            >
              <span className="flex items-center justify-between text-xs font-bold text-indigo-900">
                Complete your profile
                <span aria-hidden="true">↗</span>
              </span>
              <span className="mt-1 block text-[11px] text-indigo-700">{userProfile.profileCompletion}% complete</span>
              <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white">
                <span className="block h-full rounded-full bg-indigo-600" style={{ width: `${Math.min(100, Math.max(0, userProfile.profileCompletion))}%` }} />
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={() => handleNavClick('settings')}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold ${
              activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Settings className="h-[17px] w-[17px]" />
            Settings
          </button>
          <div className="flex items-center gap-3 rounded-xl border-t border-slate-100 px-1 pt-3">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-indigo-100">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-sm font-bold text-indigo-700">
                  {userProfile.name?.charAt(0) || 'S'}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-800">{userProfile.name || 'Student'}</p>
              <p className="truncate text-[10px] capitalize text-slate-400">{userRole}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
