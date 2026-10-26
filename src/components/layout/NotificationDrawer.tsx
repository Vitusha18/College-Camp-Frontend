import React, { useState } from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import {
  Award,
  Bell,
  Calendar,
  Check,
  CheckCheck,
  CheckSquare,
  ChevronRight,
  Briefcase,
  Settings,
  Sparkles,
  X,
} from 'lucide-react';

interface NotificationDrawerProps {
  embedded?: boolean;
}

const actionableTabs = new Set<ActiveTab>([
  'dashboard', 'internships', 'scholarships', 'study-planner', 'gpa-calculator',
  'events', 'community', 'achievements', 'portfolio', 'notifications', 'analytics',
  'profile', 'settings', 'admin', 'admin-analytics', 'admin-internships',
  'admin-scholarships', 'admin-events', 'admin-moderation',
]);

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ embedded = false }) => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadNotificationsCount,
    addToast,
    setActiveTab,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
  } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const visibleNotifications = (embedded ? notifications : notifications.slice(0, 6))
    .filter((notification) => filter === 'all' || !notification.isRead);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'internship':
        return <Briefcase className="h-4 w-4 text-rose-500" />;
      case 'scholarship':
        return <Award className="h-4 w-4 text-indigo-500" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-emerald-500" />;
      case 'task':
        return <CheckSquare className="h-4 w-4 text-amber-500" />;
      case 'application':
        return <Sparkles className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-slate-500" />;
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'internship':
        return 'bg-rose-50 border-rose-100';
      case 'scholarship':
        return 'bg-indigo-50 border-indigo-100';
      case 'event':
        return 'bg-emerald-50 border-emerald-100';
      case 'task':
        return 'bg-amber-50 border-amber-100';
      case 'application':
        return 'bg-blue-50 border-blue-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  const showError = (message: string) => addToast({
    type: 'error',
    title: 'Notification update failed',
    message,
  });

  const handleMarkRead = async (id: string) => {
    try {
      await markNotificationRead(id);
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Please try again.');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Please try again.');
    }
  };

  const handleOpenNotification = async (id: string, isRead: boolean, actionUrl?: string) => {
    if (!isRead) await handleMarkRead(id);
    if (actionUrl && actionableTabs.has(actionUrl as ActiveTab)) {
      setActiveTab(actionUrl as ActiveTab);
      if (!embedded) setIsNotificationDrawerOpen(false);
    }
  };

  const content = (
    <div className={`flex h-full flex-col ${embedded ? 'rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/30 sm:p-5' : 'bg-white'}`}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Bell className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
            {!embedded && <p className="text-[10px] text-slate-400">{unreadNotificationsCount} unread</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!embedded && (
            <button
              type="button"
              onClick={() => {
                setActiveTab('notifications');
                setIsNotificationDrawerOpen(false);
              }}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              View all
            </button>
          )}
          {!embedded && (
            <button
              type="button"
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close notifications"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {embedded && (
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-2 text-[10px] font-semibold text-slate-600 hover:border-indigo-200 hover:text-indigo-700 sm:text-xs"
            >
              <Settings className="h-3.5 w-3.5" /> Notification settings
            </button>
          )}
        </div>
      </div>

      {embedded && (
        <>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-white p-3">
              <p className="text-[10px] font-medium text-slate-500">Total notifications</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">{notifications.length}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-3">
              <p className="text-[10px] font-medium text-slate-500">Unread</p>
              <p className="mt-1 text-xl font-extrabold text-indigo-600">{unreadNotificationsCount}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-3">
              <p className="text-[10px] font-medium text-slate-500">Status</p>
              <p className={`mt-1 text-sm font-bold ${unreadNotificationsCount ? 'text-amber-600' : 'text-emerald-600'}`}>
                {unreadNotificationsCount ? 'Needs attention' : 'All caught up'}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-t-xl border-b border-slate-100 pb-3">
            <div className="inline-flex rounded-xl bg-slate-50 p-1" role="group" aria-label="Filter notifications">
              <button
                type="button"
                aria-pressed={filter === 'all'}
                onClick={() => setFilter('all')}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold ${filter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                All
              </button>
              <button
                type="button"
                aria-pressed={filter === 'unread'}
                onClick={() => setFilter('unread')}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold ${filter === 'unread' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Unread <span className="ml-1">{unreadNotificationsCount}</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => void handleMarkAllRead()}
              disabled={unreadNotificationsCount === 0}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-700 hover:text-indigo-900 disabled:cursor-not-allowed disabled:text-slate-300"
            >
              <CheckCheck className="h-3.5 w-3.5" /> Mark all as read
            </button>
          </div>
        </>
      )}

      <div className="flex-1 space-y-2 overflow-y-auto py-3">
        {visibleNotifications.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            {filter === 'unread' ? 'You’re all caught up.' : 'No notifications yet.'}
          </div>
        ) : (
          visibleNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`group flex items-start gap-3 rounded-xl border p-3 transition hover:border-indigo-100 ${
                notification.isRead ? 'border-slate-100 bg-white' : 'border-slate-100 bg-slate-50/70'
              }`}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${getCategoryBg(notification.category)}`}>
                {getCategoryIcon(notification.category)}
              </span>
              <button
                type="button"
                onClick={() => void handleOpenNotification(notification.id, notification.isRead, notification.actionUrl)}
                className="min-w-0 flex-1 text-left"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs font-bold text-slate-800">{notification.title}</span>
                  <span className="shrink-0 text-[10px] text-slate-400">{notification.timeAgo}</span>
                </span>
                <span className="mt-1 block text-[11px] leading-relaxed text-slate-500">{notification.message}</span>
              </button>
              {!notification.isRead ? (
                <button
                  type="button"
                  onClick={() => void handleMarkRead(notification.id)}
                  aria-label={`Mark ${notification.title} as read`}
                  title="Mark as read"
                  className="rounded-lg border border-slate-200 bg-white p-2 text-slate-400 opacity-100 transition hover:border-emerald-200 hover:text-emerald-600 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              ) : (
                <span className="mt-1.5 shrink-0 text-emerald-600" aria-label="Read">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {!embedded && (
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => void handleMarkAllRead()}
            disabled={unreadNotificationsCount === 0}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            Mark all as read
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('settings');
              setIsNotificationDrawerOpen(false);
            }}
            className="flex items-center gap-0.5 text-xs font-semibold text-indigo-600 hover:underline"
          >
            Settings <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );

  if (embedded) return content;
  if (!isNotificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <button
        type="button"
        aria-label="Close notifications"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
        onClick={() => setIsNotificationDrawerOpen(false)}
      />
      <section
        role="region"
        aria-label="Notifications drawer"
        className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white p-5 shadow-2xl sm:p-6"
      >
        {content}
      </section>
    </div>
  );
};
