import React from 'react';
import { NotificationDrawer } from '../layout/NotificationDrawer';
import { Bell } from 'lucide-react';

export const NotificationsPage: React.FC = () => (
  <div className="mx-auto max-w-5xl space-y-5 pb-12">
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <Bell className="h-5 w-5" />
      </span>
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Notifications</h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Stay up to date with activity related to your campus account.
        </p>
      </div>
    </div>
    <NotificationDrawer embedded />
  </div>
);
