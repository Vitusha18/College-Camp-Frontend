import React, { lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { NotificationDrawer } from './components/layout/NotificationDrawer';

const StudentDashboard = lazy(() => import('./components/dashboard/StudentDashboard').then((module) => ({ default: module.StudentDashboard })));
const InternshipFinder = lazy(() => import('./components/internships/InternshipFinder').then((module) => ({ default: module.InternshipFinder })));
const ScholarshipFinder = lazy(() => import('./components/scholarships/ScholarshipFinder').then((module) => ({ default: module.ScholarshipFinder })));
const StudyPlanner = lazy(() => import('./components/study-planner/StudyPlanner').then((module) => ({ default: module.StudyPlanner })));
const GpaCalculator = lazy(() => import('./components/gpa-calculator/GpaCalculator').then((module) => ({ default: module.GpaCalculator })));
const CommunityForum = lazy(() => import('./components/community/CommunityForum').then((module) => ({ default: module.CommunityForum })));
const EventsHub = lazy(() => import('./components/events/EventsHub').then((module) => ({ default: module.EventsHub })));
const AchievementsPortfolio = lazy(() => import('./components/portfolio/AchievementsPortfolio').then((module) => ({ default: module.AchievementsPortfolio })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));
const LandingPage = lazy(() => import('./components/auth/LandingPage').then((module) => ({ default: module.LandingPage })));
const Settings = lazy(() => import('./components/settings/Settings').then((module) => ({ default: module.Settings })));
const NotificationsPage = lazy(() => import('./components/notifications/NotificationsPage').then((module) => ({ default: module.NotificationsPage })));

const PageLoading: React.FC = () => (
  <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-live="polite">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
    <span className="sr-only">Loading page...</span>
  </div>
);

const MainContent: React.FC = () => {
  const { activeTab, userRole, isLoading, isAuthenticated, setIsAuthenticated } = useApp();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Loading CampusConnect...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<PageLoading />}>
        <LandingPage onAuthSuccess={() => setIsAuthenticated(true)} />
      </Suspense>
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'admin-analytics':
      case 'admin-internships':
      case 'admin-scholarships':
      case 'admin-events':
      case 'admin-moderation':
        return <AdminDashboard />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'internships':
        return <InternshipFinder />;
      case 'scholarships':
        return <ScholarshipFinder />;
      case 'study-planner':
        return <StudyPlanner />;
      case 'gpa-calculator':
        return <GpaCalculator />;
      case 'community':
        return <CommunityForum />;
      case 'events':
        return <EventsHub />;
      case 'portfolio':
      case 'achievements':
      case 'profile':
        return <AchievementsPortfolio />;
      case 'settings':
        return <Settings />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-60 transition-all duration-200">
        {/* Global Sticky Header */}
        <Header />

        {/* Dynamic Route View Content */}
        <main className="mx-auto w-full max-w-[1600px] flex-1 p-3 sm:p-5 lg:p-6">
          <Suspense fallback={<PageLoading />}>{renderActiveView()}</Suspense>
        </main>
      </div>

      {/* Global Slide-out Notification Drawer */}
      <NotificationDrawer />

      {/* Global Toast Feedback system */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
