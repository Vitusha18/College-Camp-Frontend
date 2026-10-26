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
} from '../types';
import { initialAnalyticsData } from './mockData';


function mapCommunityPost(post: any) {
  return {
    id: post.id,
    authorName: post.author?.name || 'Unknown User',
    authorRole: post.author?.role || 'Student',
    authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'U')}&background=random`,
    authorBranch: 'CSE',
    createdAt: post.createdAt,
    category: post.category || 'Coding',
    title: post.title,
    content: post.content,
    upvotes: post.upvotes || 0,
    hasUpvoted: post.hasUpvoted || false,
    commentsCount: post.comments?.length || 0,
    isPinned: post.isPinned ?? false,
    tags: post.tags || [],
    comments: (post.comments || []).map((c: any) => ({
      id: c.id,
      authorName: c.author?.name || 'Unknown',
      authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.author?.name || 'U')}&background=random`,
      authorBranch: 'CSE',
      content: c.content,
      createdAt: c.createdAt,
      upvotes: 0,
    }))
  };
}

const STORAGE_KEYS = {
  PROFILE: 'cc_user_profile',
  INTERNSHIPS: 'cc_internships',
  SCHOLARSHIPS: 'cc_scholarships',
  TASKS: 'cc_tasks',
  SUBJECTS: 'cc_subjects',
  SEMESTER_GPAS: 'cc_semester_gpas',
  CERTIFICATES: 'cc_certificates',
  PROJECTS: 'cc_projects',
  ACHIEVEMENTS: 'cc_achievements',
  SKILLS: 'cc_skills',
  EVENTS: 'cc_events',
  POSTS: 'cc_community_posts',
  NOTIFICATIONS: 'cc_notifications',
  ANALYTICS: 'cc_analytics',
};

function getStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save to localStorage for key: ${key}`, err);
  }
}

const API_BASE = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';

function getAuthHeader() {
  const token = localStorage.getItem('cc_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function getApiErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const data = await response.json();
    return data.error || data.message || fallback;
  } catch {
    return fallback;
  }
}

export const api = {
  // --- Auth Module ---
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Login failed'));
    const data = await res.json();
    localStorage.setItem('cc_token', data.token);
    return data;
  },

  async register(payload: { name: string, email: string, password: string, universityId: string }): Promise<{ token: string; user: any }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Registration failed'));
    const data = await res.json();
    localStorage.setItem('cc_token', data.token);
    return data;
  },

  logout() {
    localStorage.removeItem('cc_token');
  },

  async getUniversities(): Promise<Array<{ id: string; name: string; domain: string }>> {
    const res = await fetch(`${API_BASE}/universities`);
    if (!res.ok) throw new Error('Unable to load universities');
    return await res.json();
  },
  // User Profile
  async getProfile(): Promise<UserProfile> {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Failed to fetch profile'));
    const profile: UserProfile = await res.json();
    const storedSkills = getStorage<unknown>(STORAGE_KEYS.SKILLS, []);
    const legacySkills = Array.isArray(storedSkills)
      ? [...new Set(storedSkills.filter((skill): skill is string => typeof skill === 'string')
        .map((skill) => skill.trim()).filter((skill) => skill.length > 0 && skill.length <= 50))].slice(0, 50)
      : [];

    if (legacySkills.length === 0) {
      localStorage.removeItem(STORAGE_KEYS.SKILLS);
      return profile;
    }
    if (profile.skills.length > 0) {
      localStorage.removeItem(STORAGE_KEYS.SKILLS);
      return profile;
    }

    try {
      const migration = await fetch(`${API_BASE}/auth/me`, {
        method: 'PATCH',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: legacySkills })
      });
      if (!migration.ok) {
        throw new Error(await getApiErrorMessage(migration, 'Unable to migrate saved skills'));
      }
      localStorage.removeItem(STORAGE_KEYS.SKILLS);
      return await migration.json();
    } catch (error) {
      console.error('Failed to migrate legacy profile skills:', error);
      return { ...profile, skills: legacySkills };
    }
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: 'PATCH',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Failed to update profile'));
    const updatedProfile: UserProfile = await res.json();
    if (profile.skills !== undefined) {
      localStorage.removeItem(STORAGE_KEYS.SKILLS);
    }
    return updatedProfile;
  },

  // Internships
  async getInternships(): Promise<Internship[]> {
    const res = await fetch(`${API_BASE}/internships`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch internships'));
    const data = await res.json();
    return data.map((i: any) => ({
      ...i,
      stipendAmount: parseInt(String(i.stipend || '').replace(/\D/g, '')) || 0,
      duration: i.duration || '3 Months',
      category: i.category || 'All',
      applicantsCount: i.applicantsCount ?? 0,
      status: i.status,
      appliedDate: i.appliedDate,
    }));
  },

  async toggleBookmarkInternship(id: string): Promise<Internship[]> {
    const res = await fetch(`${API_BASE}/internships/${id}/bookmark`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to update saved internship'));
    return await this.getInternships();
  },

  async applyToInternship(id: string, details?: { resumeUrl?: string; coverNote?: string }): Promise<{ success: boolean; internship: Internship }> {
    const res = await fetch(`${API_BASE}/internships/${id}/apply`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to submit your application'));

    // Return updated mock for UI consistency
    const data = await res.json();
    return { success: true, internship: data.internship };
  },

  async addInternship(internship: Omit<Internship, 'id' | 'applicantsCount'>): Promise<Internship> {
    const res = await fetch(`${API_BASE}/internships`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(internship)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Failed to create internship'));
    return await res.json();
  },

  async deleteInternship(id: string): Promise<Internship[]> {
    const res = await fetch(`${API_BASE}/internships/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to delete internship'));
    return await this.getInternships();
  },

  // Scholarships
  async getScholarships(): Promise<Scholarship[]> {
    const res = await fetch(`${API_BASE}/scholarships`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch scholarships'));
    const data = await res.json();
    return data.map((s: any) => ({
      ...s,
      amountNumber: parseInt(String(s.amount || '').replace(/\D/g, '')) || 0,
      minCGPA: s.minCGPA || 0,
      maxIncomeLPA: s.maxIncomeLPA || 99,
    }));
  },

  async toggleBookmarkScholarship(id: string): Promise<Scholarship[]> {
    const res = await fetch(`${API_BASE}/scholarships/${id}/bookmark`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to update saved scholarship'));
    return await this.getScholarships();
  },

  async applyToScholarship(id: string): Promise<Scholarship[]> {
    const res = await fetch(`${API_BASE}/scholarships/${id}/apply`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to submit your scholarship application'));
    return await this.getScholarships();
  },

  async addScholarship(scholarship: Omit<Scholarship, 'id'>): Promise<Scholarship> {
    const res = await fetch(`${API_BASE}/scholarships`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(scholarship)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Failed to create scholarship'));
    return await res.json();
  },

  async deleteScholarship(id: string): Promise<Scholarship[]> {
    const res = await fetch(`${API_BASE}/scholarships/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to delete scholarship'));
    return await this.getScholarships();
  },

  // Tasks / Study Planner
  async getTasks(): Promise<StudyTask[]> {
    const res = await fetch(`${API_BASE}/tasks`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch tasks'));
    return await res.json();
  },

  async toggleTask(id: string): Promise<StudyTask[]> {
    const res = await fetch(`${API_BASE}/tasks/${id}/toggle`, {
      method: 'PATCH',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to update task'));
    return await this.getTasks();
  },

  async addTask(task: Omit<StudyTask, 'id' | 'completed'>): Promise<StudyTask> {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Failed to create task'));
    return await res.json();
  },

  async deleteTask(id: string): Promise<StudyTask[]> {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Failed to delete task'));
    return await this.getTasks();
  },

  // GPA Calculator & Subjects
  async getSubjectGrades(): Promise<SubjectGrade[]> {
    const res = await fetch(`${API_BASE}/grades`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch grades'));
    return await res.json();
  },

  async getSemesterGPAs(): Promise<SemesterGPA[]> {
    const res = await fetch(`${API_BASE}/grades/semesters`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch semester GPA history'));
    return await res.json();
  },

  async saveSubjectGrades(subjects: SubjectGrade[]): Promise<SubjectGrade[]> {
    const res = await fetch(`${API_BASE}/grades`, {
      method: 'PUT',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(subjects)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Failed to save grades'));
    return await res.json();
  },

  async saveSemesterGPAs(history: SemesterGPA[]): Promise<SemesterGPA[]> {
    const res = await fetch(`${API_BASE}/grades/semesters`, {
      method: 'PUT',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(history)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to save semester GPA history'));
    return await res.json();
  },

  // Portfolio
  async getCertificates(): Promise<Certificate[]> {
    const res = await fetch(`${API_BASE}/portfolio/certificates`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch certificates'));
    return await res.json();
  },

  async addCertificate(cert: Omit<Certificate, 'id' | 'verified'>): Promise<Certificate> {
    const res = await fetch(`${API_BASE}/portfolio/certificates`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(cert)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to save certificate'));
    return await res.json();
  },

  async deleteCertificate(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/portfolio/certificates/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to delete certificate'));
  },

  async getProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE}/portfolio/projects`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch projects'));
    return await res.json();
  },

  async addProject(project: Omit<Project, 'id'>): Promise<Project> {
    const res = await fetch(`${API_BASE}/portfolio/projects`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to save project'));
    return await res.json();
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/portfolio/projects/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to delete project'));
  },

  async getAchievements(): Promise<Achievement[]> {
    const res = await fetch(`${API_BASE}/portfolio/achievements`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch achievements'));
    return await res.json();
  },

  async addAchievement(achievement: Omit<Achievement, 'id'>): Promise<Achievement> {
    const res = await fetch(`${API_BASE}/portfolio/achievements`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(achievement)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to save achievement'));
    return await res.json();
  },

  async deleteAchievement(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/portfolio/achievements/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to delete achievement'));
  },

  // Events
  async getEvents(): Promise<CampusEvent[]> {
    const res = await fetch(`${API_BASE}/events`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch events'));
    return await res.json();
  },

  async toggleEventRegistration(id: string): Promise<CampusEvent[]> {
    const res = await fetch(`${API_BASE}/events/${id}/register`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to update event registration'));
    return await this.getEvents();
  },

  async addEvent(event: Omit<CampusEvent, 'id' | 'registeredCount' | 'isRegistered'>): Promise<CampusEvent> {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Failed to create event'));
    return await res.json();
  },

  async deleteEvent(id: string): Promise<CampusEvent[]> {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to delete event'));
    return await this.getEvents();
  },

  // Community
  async getCommunityPosts(): Promise<CommunityPost[]> {
    const res = await fetch(`${API_BASE}/posts`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch community posts'));
    const data = await res.json();
    return data.map(mapCommunityPost);
  },

  async createCommunityPost(post: Omit<CommunityPost, 'id' | 'upvotes' | 'commentsCount' | 'createdAt'>): Promise<CommunityPost> {
    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: post.title || 'New Post',
        content: post.content,
        category: post.category,
        tags: post.tags,
      })
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Failed to create post'));
    const data = await res.json();
    return mapCommunityPost(data);
  },

  async deleteCommunityPost(id: string): Promise<CommunityPost[]> {
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to remove community post'));
    return await this.getCommunityPosts();
  },

  async pinCommunityPost(id: string): Promise<CommunityPost[]> {
    const res = await fetch(`${API_BASE}/posts/${id}/pin`, {
      method: 'PATCH',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to update post pin'));
    return await this.getCommunityPosts();
  },

  async togglePostUpvote(id: string): Promise<CommunityPost[]> {
    const res = await fetch(`${API_BASE}/posts/${id}/vote`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to update vote'));
    return await this.getCommunityPosts();
  },

  async addPostComment(postId: string, comment: { content: string }): Promise<CommunityPost[]> {
    const res = await fetch(`${API_BASE}/posts/${postId}/comment`, {
      method: 'POST',
      headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: comment.content })
    });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Failed to post comment'));
    // Fetch the updated posts array to refresh UI
    return await this.getCommunityPosts();
  },

  // Notifications
  async getNotifications(): Promise<SmartNotification[]> {
    const res = await fetch(`${API_BASE}/notifications`, { headers: getAuthHeader() });
    if (!res.ok) throw new Error(await getApiErrorMessage(res, 'Unable to fetch notifications'));
    return await res.json();
  },

  async markNotificationRead(id: string): Promise<SmartNotification[]> {
    const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Toggle failed');
    return await this.getNotifications();
  },

  async markAllNotificationsRead(): Promise<SmartNotification[]> {
    const res = await fetch(`${API_BASE}/notifications/read-all`, {
      method: 'PATCH',
      headers: getAuthHeader()
    });
    if (!res.ok) throw new Error('Toggle failed');
    return await this.getNotifications();
  },

  // Analytics
  async getAnalytics(): Promise<AnalyticsData> {
    return getStorage<AnalyticsData>(STORAGE_KEYS.ANALYTICS, initialAnalyticsData);
  },

  // Reset to default seed data
  async resetToSeed(): Promise<void> {
    // Preserve the signed-in session and appearance preference. Only clear data
    // that this version intentionally keeps in browser storage.
    [
      STORAGE_KEYS.SEMESTER_GPAS,
      STORAGE_KEYS.CERTIFICATES,
      STORAGE_KEYS.PROJECTS,
      STORAGE_KEYS.ACHIEVEMENTS,
      STORAGE_KEYS.SKILLS,
      STORAGE_KEYS.ANALYTICS,
    ].forEach((key) => localStorage.removeItem(key));
  },
};
