import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import QuickStats from './QuickStats';
import UpcomingDeadlines from './UpcomingDeadlines';
import GPAChart from './GPAChart';
import RecentActivities from './RecentActivities';

const Dashboard = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        {/* Content Workspace Scroll Wrapper */}
        <main className="flex-1 p-8 space-y-8 overflow-y-auto max-w-[1400px] w-full mx-auto">
          {/* Top Hero Greetings Banner */}
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              Welcome back! 👋
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Here's what's happening on your campus today.
            </p>
          </div>

          {/* Core App Widgets Grid System */}
          <QuickStats />
          
          <UpcomingDeadlines />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-1">
              <GPAChart />
            </div>
            <div className="lg:col-span-2">
              <RecentActivities />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;