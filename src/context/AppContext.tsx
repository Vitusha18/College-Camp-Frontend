import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  UserProfile,
  Internship,
  Scholarship,
  StudyTask,
  SubjectGrade,
  SemesterGPA,
  Certificate,
  Project,
  Achievement,
  CampusEvent,
  CommunityPost,
  SmartNotification,
  AnalyticsData,
  UserRole,
} from '../types';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export type ActiveTab =
  | 'dashboard'
  | 'internships'
  | 'scholarships'
  | 'study-planner'
  | 'gpa-calculator'
  | 'events'
  | 'community'
  | 'achievements'
  | 'portfolio'
  | 'notifications'
  | 'analytics'
  | 'profile'
  | 'settings'
  | 'admin'
  | 'admin-analytics'
  | 'admin-internships'
  | 'admin-scholarships'
  | 'admin-events'
  | 'admin-moderation';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  isDark: boolean;
  toggleTheme: () => void;
  internships: Internship[];
  toggleBookmarkInternship: (id: string) => Promise<void>;
  applyToInternship: (id: string, details?: { resumeUrl?: string; coverNote?: string }) => Promise<void>;
  deleteInternship: (id: string) => Promise<void>;
  addInternship: (data: Omit<Internship, 'id' | 'applicantsCount'>) => Promise<void>;
  scholarships: Scholarship[];
  toggleBookmarkScholarship: (id: string) => Promise<void>;
  applyToScholarship: (id: string) => Promise<void>;
  deleteScholarship: (id: string) => Promise<void>;
  addScholarship: (data: Omit<Scholarship, 'id'>) => Promise<void>;
  tasks: StudyTask[];
  toggleTask: (id: string) => Promise<void>;
  addTask: (data: Omit<StudyTask, 'id' | 'completed'>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  subjectGrades: SubjectGrade[];
  semesterGPAs: SemesterGPA[];
  updateSubjectGrades: (subjects: SubjectGrade[]) => Promise<void>;
  updateSemesterGPAs: (history: SemesterGPA[]) => Promise<void>;
  certificates: Certificate[];
  addCertificate: (cert: Omit<Certificate, 'id' | 'verified'>) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
  projects: Project[];
  addProject: (proj: Omit<Project, 'id'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  achievements: Achievement[];
  addAchievement: (ach: Omit<Achievement, 'id'>) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;
  events: CampusEvent[];
  toggleEventRegistration: (id: string) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addEvent: (evt: Omit<CampusEvent, 'id' | 'registeredCount' | 'isRegistered'>) => Promise<void>;
  communityPosts: CommunityPost[];
  createPost: (post: Omit<CommunityPost, 'id' | 'upvotes' | 'commentsCount' | 'createdAt'>) => Promise<void>;
  togglePostUpvote: (id: string) => Promise<void>;
  moderatePost: (id: string, action: 'delete' | 'pin') => Promise<void>;
  addPostComment: (postId: string, commentText: string) => Promise<void>;
  notifications: SmartNotification[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  analyticsData: AnalyticsData;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  triggerConfetti: () => void;
  resetAllData: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
let globalGradeSaveTimeout: NodeJS.Timeout | null = null;


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('cc_token'));

  // Theme State
  const [isDark, setIsDark] = useState(() => {
    const isDarkTheme = localStorage.getItem('theme') === 'dark';
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return isDarkTheme;
  });

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // State slices
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '', name: '', email: '', role: 'student', avatar: '',
    department: '', degree: '', year: '', college: '', rollNumber: '', cgpa: 0,
    skills: [], bio: '', githubUrl: '', linkedinUrl: '', resumeUrl: '',
    familyIncome: 0, category: '', gender: '', profileCompletion: 0
  });
  const [internships, setInternships] = useState<Internship[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [subjectGrades, setSubjectGrades] = useState<SubjectGrade[]>([]);
  const [semesterGPAs, setSemesterGPAs] = useState<SemesterGPA[]>([]);
  const gradeDataRevision = useRef(0);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    studyProgressPercentage: 0, tasksCompletedCount: 0, totalTasksCount: 0,
    applicationsSentCount: 0, eventsAttendedCount: 0, gpaTrend: [],
    weeklyStudyHours: [], applicationStatusBreakdown: [], skillProficiency: []
  });

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `t_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {
      // fallback
    }
  }, []);

  // Core User Data Loader (on login)
  const loadData = useCallback(async () => {
    try {
      const p = await api.getProfile();
      setUserProfile(p);
      if (p.role) {
        setUserRole(p.role as 'student' | 'admin');
        if (p.role === 'admin') {
          const analytics = await api.getAnalytics();
          setAnalyticsData(analytics);
        }
      } else {
        setUserRole('student');
      }
      const notifs = await api.getNotifications();
      setNotifications(notifs);
    } catch (err: any) {
      console.error('Error loading core data:', err);
      api.logout();
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Dedicated chunk loaders
  const reportLoadError = useCallback((resource: string, error: unknown) => {
    addToast({
      type: 'error',
      title: `Unable to load ${resource}`,
      message: error instanceof Error ? error.message : 'Please try again.',
    });
  }, [addToast]);
  const fetchInternships = useCallback(async () => {
    try { setInternships(await api.getInternships()); }
    catch (error) { reportLoadError('internships', error); }
  }, [reportLoadError]);
  const fetchScholarships = useCallback(async () => {
    try { setScholarships(await api.getScholarships()); }
    catch (error) { reportLoadError('scholarships', error); }
  }, [reportLoadError]);
  const fetchTasks = useCallback(async () => {
    try { setTasks(await api.getTasks()); }
    catch (error) { reportLoadError('tasks', error); }
  }, [reportLoadError]);
  const fetchGrades = useCallback(async () => {
    const revision = gradeDataRevision.current;
    try {
      const [grades, semesters] = await Promise.all([api.getSubjectGrades(), api.getSemesterGPAs()]);
      if (revision !== gradeDataRevision.current) return;
      setSubjectGrades(grades);
      setSemesterGPAs(semesters);
    } catch (error) {
      reportLoadError('grades', error);
    }
  }, [reportLoadError]);
  const fetchPortfolio = useCallback(async () => {
    try {
      const [savedCertificates, savedProjects, savedAchievements] = await Promise.all([
        api.getCertificates(),
        api.getProjects(),
        api.getAchievements(),
      ]);
      setCertificates(savedCertificates);
      setProjects(savedProjects);
      setAchievements(savedAchievements);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Unable to load portfolio',
        message: error instanceof Error ? error.message : 'Please try again.',
      });
    }
  }, [addToast]);
  const fetchEvents = useCallback(async () => {
    try { setEvents(await api.getEvents()); }
    catch (error) { reportLoadError('events', error); }
  }, [reportLoadError]);
  const fetchPosts = useCallback(async () => {
    try { setCommunityPosts(await api.getCommunityPosts()); }
    catch (error) { reportLoadError('community posts', error); }
  }, [reportLoadError]);

  // Hydrate chunks dynamically based on active tab
  useEffect(() => {
    if (!isAuthenticated) return;

    if ((activeTab === 'internships' || activeTab === 'admin-internships')) fetchInternships();
    if ((activeTab === 'scholarships' || activeTab === 'admin-scholarships')) fetchScholarships();
    if (activeTab === 'study-planner') fetchTasks();
    if (activeTab === 'gpa-calculator') fetchGrades();
    if ((activeTab === 'portfolio' || activeTab === 'profile')) fetchPortfolio();
    if ((activeTab === 'events' || activeTab === 'admin-events')) fetchEvents();
    if ((activeTab === 'community' || activeTab === 'admin-moderation')) fetchPosts();

    if (activeTab === 'dashboard') { fetchTasks(); fetchInternships(); fetchEvents(); }

    if (activeTab === 'admin-analytics' || activeTab === 'admin') {
      if (events.length === 0) fetchEvents();
      if (communityPosts.length === 0) fetchPosts();
      if (internships.length === 0) fetchInternships();
      if (scholarships.length === 0) fetchScholarships();
    }
  }, [activeTab, isAuthenticated, fetchInternships, fetchScholarships, fetchTasks, fetchGrades, fetchPortfolio, fetchEvents, fetchPosts]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [loadData, isAuthenticated]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const updated = await api.updateProfile(updates);
      setUserProfile(updated);
      addToast({ type: 'success', title: 'Profile Updated', message: 'Your student profile information has been saved.' });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Unable to update profile',
        message: error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  const toggleBookmarkInternship = async (id: string) => {
    try {
      const updated = await api.toggleBookmarkInternship(id);
      setInternships(updated);
      const item = updated.find((i) => i.id === id);
      addToast({
        type: 'info',
        title: item?.isBookmarked ? 'Internship Saved' : 'Removed from Saved',
        message: item?.title,
      });
    } catch (error) {
      addToast({ type: 'error', title: 'Could not update saved internship', message: error instanceof Error ? error.message : 'Please try again.' });
    }
  };

  const applyToInternship = async (id: string, details?: { resumeUrl?: string; coverNote?: string }) => {
    const res = await api.applyToInternship(id, details);
    const list = await api.getInternships();
    setInternships(list);
    triggerConfetti();
    addToast({
      type: 'success',
      title: 'Application Submitted!',
      message: `Successfully applied to ${res.internship.company}. Track your status in the sidebar.`,
    });
  };

  const deleteInternship = async (id: string) => {
    try {
      const list = await api.deleteInternship(id);
      setInternships(list);
      addToast({ type: 'success', title: 'Deleted', message: 'Internship opening removed.' });
    } catch (error) {
      addToast({ type: 'error', title: 'Unable to delete internship', message: error instanceof Error ? error.message : 'Please try again.' });
    }
  };

  const addInternship = async (data: Omit<Internship, 'id' | 'applicantsCount'>) => {
    const created = await api.addInternship(data);
    const list = await api.getInternships();
    setInternships(list);
    addToast({ type: 'success', title: 'Internship Listed', message: `${created.title} posted successfully.` });
  };

  const toggleBookmarkScholarship = async (id: string) => {
    try {
      const updated = await api.toggleBookmarkScholarship(id);
      setScholarships(updated);
      const item = updated.find((i) => i.id === id);
      addToast({
        type: 'info',
        title: item?.isBookmarked ? 'Scholarship Saved' : 'Removed from Saved',
        message: item?.title,
      });
    } catch (error) {
      addToast({ type: 'error', title: 'Could not update saved scholarship', message: error instanceof Error ? error.message : 'Please try again.' });
    }
  };

  const applyToScholarship = async (id: string) => {
    try {
      const updated = await api.applyToScholarship(id);
      setScholarships(updated);
      triggerConfetti();
      addToast({
        type: 'success',
        title: 'Scholarship Application Submitted',
        message: 'You can track its status in My Applications.',
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Could not submit application',
        message: error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  const deleteScholarship = async (id: string) => {
    try {
      const list = await api.deleteScholarship(id);
      setScholarships(list);
      addToast({ type: 'success', title: 'Deleted', message: 'Scholarship scheme removed.' });
    } catch (error) {
      addToast({ type: 'error', title: 'Unable to delete scholarship', message: error instanceof Error ? error.message : 'Please try again.' });
    }
  };

  const addScholarship = async (data: Omit<Scholarship, 'id'>) => {
    const created = await api.addScholarship(data);
    const list = await api.getScholarships();
    setScholarships(list);
    addToast({ type: 'success', title: 'Scholarship Added', message: `${created.title} is now discoverable.` });
  };

  const toggleTask = async (id: string) => {
    try {
      const updated = await api.toggleTask(id);
      setTasks(updated);
      const task = updated.find((t) => t.id === id);
      if (task?.completed) {
        triggerConfetti();
        addToast({ type: 'success', title: 'Task Completed! 🎯', message: task.title });
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Unable to update task',
        message: error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  const addTask = async (data: Omit<StudyTask, 'id' | 'completed'>) => {
    try {
      const created = await api.addTask(data);
      const list = await api.getTasks();
      setTasks(list);
      addToast({ type: 'success', title: 'Task Scheduled', message: created.title });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Unable to schedule task',
        message: error instanceof Error ? error.message : 'Please try again.',
      });
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const list = await api.deleteTask(id);
      setTasks(list);
      addToast({ type: 'info', title: 'Task Deleted' });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Unable to delete task',
        message: error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  const updateSubjectGrades = (subjects: SubjectGrade[]) => {
    gradeDataRevision.current += 1;
    // 1. Optimistic UI update immediately
    setSubjectGrades(subjects);

    // 2. Debounce backend save to avoid focus loss and duplicate inserts
    if (globalGradeSaveTimeout) clearTimeout(globalGradeSaveTimeout);

    globalGradeSaveTimeout = setTimeout(async () => {
      try {
        await api.saveSubjectGrades(subjects);
      } catch (err) {
        addToast({ type: 'error', title: 'Failed to sync grades' });
      }
    }, 800);
  };

  const updateSemesterGPAs = async (history: SemesterGPA[]) => {
    const saved = await api.saveSemesterGPAs(history);
    setSemesterGPAs(saved);
  };

  const addCertificate = async (data: Omit<Certificate, 'id' | 'verified'>) => {
    const created = await api.addCertificate(data);
    setCertificates((current) => [created, ...current]);
    addToast({ type: 'success', title: 'Portfolio Updated', message: `Added ${created.title}` });
  };

  const deleteCertificate = async (id: string) => {
    await api.deleteCertificate(id);
    setCertificates((current) => current.filter((certificate) => certificate.id !== id));
    addToast({ type: 'success', title: 'Deleted', message: 'Certificate removed from portfolio.' });
  };

  const addProject = async (data: Omit<Project, 'id'>) => {
    const created = await api.addProject(data);
    setProjects((current) => [created, ...current]);
    addToast({ type: 'success', title: 'Portfolio Updated', message: `Added ${created.title}` });
  };

  const deleteProject = async (id: string) => {
    await api.deleteProject(id);
    setProjects((current) => current.filter((project) => project.id !== id));
    addToast({ type: 'success', title: 'Deleted', message: 'Project removed from portfolio.' });
  };

  const addAchievement = async (data: Omit<Achievement, 'id'>) => {
    const created = await api.addAchievement(data);
    setAchievements((current) => [created, ...current]);
    addToast({ type: 'success', title: 'Portfolio Updated', message: `Added ${created.title}` });
  };

  const deleteAchievement = async (id: string) => {
    await api.deleteAchievement(id);
    setAchievements((current) => current.filter((achievement) => achievement.id !== id));
    addToast({ type: 'success', title: 'Deleted', message: 'Achievement removed from portfolio.' });
  };

  const toggleEventRegistration = async (id: string) => {
    try {
    const updated = await api.toggleEventRegistration(id);
    setEvents(updated);
    const evt = updated.find((e) => e.id === id);
    if (evt?.isRegistered) {
      triggerConfetti();
      addToast({
        type: 'success',
        title: 'Registration Confirmed! 🎟️',
        message: `You are booked for ${evt.title}. Pass is in My Registrations.`,
      });
    } else {
      addToast({ type: 'info', title: 'Registration Cancelled', message: evt?.title });
    }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Could not update registration',
        message: error instanceof Error ? error.message : 'Please try again.',
      });
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const list = await api.deleteEvent(id);
      setEvents(list);
      addToast({ type: 'success', title: 'Deleted', message: 'Event removed.' });
    } catch (error) {
      addToast({ type: 'error', title: 'Unable to delete event', message: error instanceof Error ? error.message : 'Please try again.' });
    }
  };

  const addEvent = async (evt: Omit<CampusEvent, 'id' | 'registeredCount' | 'isRegistered'>) => {
    const created = await api.addEvent(evt);
    const list = await api.getEvents();
    setEvents(list);
    addToast({ type: 'success', title: 'Event Created', message: `${created.title} has been scheduled.` });
  };

  const createPost = async (post: Omit<CommunityPost, 'id' | 'upvotes' | 'commentsCount' | 'createdAt'>) => {
    try {
      await api.createCommunityPost(post);
      const list = await api.getCommunityPosts();
      setCommunityPosts(list);
      addToast({ type: 'success', title: 'Post Published', message: 'Your discussion topic is now live!' });
    } catch (error) {
      addToast({ type: 'error', title: 'Could not publish post', message: error instanceof Error ? error.message : 'Please try again.' });
      throw error;
    }
  };

  const togglePostUpvote = async (id: string) => {
    try {
      const updated = await api.togglePostUpvote(id);
      setCommunityPosts(updated);
    } catch (error) {
      addToast({ type: 'error', title: 'Could not update vote', message: error instanceof Error ? error.message : 'Please try again.' });
    }
  };

  const moderatePost = async (id: string, action: 'delete' | 'pin') => {
    try {
      if (action === 'delete') {
        const list = await api.deleteCommunityPost(id);
        setCommunityPosts(list);
        addToast({ type: 'success', title: 'Moderated', message: 'Post permanently removed.' });
      } else if (action === 'pin') {
        const list = await api.pinCommunityPost(id);
        setCommunityPosts(list);
        addToast({ type: 'success', title: 'Moderated', message: 'Post pin toggled.' });
      }
    } catch (error) {
      const actionLabel = action === 'delete' ? 'remove post' : 'update post pin';
      addToast({ type: 'error', title: `Unable to ${actionLabel}`, message: error instanceof Error ? error.message : 'Please try again.' });
    }
  };

  const addPostComment = async (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    try {
      const updated = await api.addPostComment(postId, {
        content: commentText,
      });
      setCommunityPosts(updated);
      addToast({ type: 'success', title: 'Comment Posted' });
    } catch (error) {
      addToast({ type: 'error', title: 'Could not post comment', message: error instanceof Error ? error.message : 'Please try again.' });
      throw error;
    }
  };

  const markNotificationRead = async (id: string) => {
    const updated = await api.markNotificationRead(id);
    setNotifications(updated);
  };

  const markAllNotificationsRead = async () => {
    const updated = await api.markAllNotificationsRead();
    setNotifications(updated);
    addToast({ type: 'info', title: 'All Notifications Marked as Read' });
  };

  const resetAllData = async () => {
    await api.resetToSeed();
    await loadData();
    addToast({ type: 'info', title: 'Local Data Reset', message: 'Browser-stored profile extras were cleared. Your account remains signed in.' });
  };

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        userProfile,
        updateProfile,
        isDark,
        toggleTheme,
        internships,
        toggleBookmarkInternship,
        applyToInternship,
        deleteInternship,
        addInternship,
        scholarships,
        toggleBookmarkScholarship,
        applyToScholarship,
        deleteScholarship,
        addScholarship,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        subjectGrades,
        semesterGPAs,
        updateSubjectGrades,
        updateSemesterGPAs,
        certificates,
        addCertificate,
        deleteCertificate,
        projects,
        addProject,
        deleteProject,
        achievements,
        addAchievement,
        deleteAchievement,
        events,
        toggleEventRegistration,
        deleteEvent,
        addEvent,
        communityPosts,
        createPost,
        togglePostUpvote,
        moderatePost,
        addPostComment,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,
        analyticsData,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isMobileNavOpen,
        setIsMobileNavOpen,
        toasts,
        addToast,
        removeToast,
        triggerConfetti,
        resetAllData,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
