export type UserRole = 'student' | 'admin';

export type Priority = 'High' | 'Medium' | 'Low';

export type TaskCategory = 'Assignment' | 'Exam' | 'Project' | 'Quiz' | 'Study';

export type ApplicationStatus = 'Applied' | 'Interview Scheduled' | 'Selected' | 'Rejected' | 'Under Review' | 'Not Selected';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  banner?: string;
  department: string;
  degree: string;
  year: string;
  college: string;
  rollNumber: string;
  cgpa: number;
  skills: string[];
  bio: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  resumeUrl?: string | null;
  familyIncome?: number | null; // in LPA
  category?: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | '' | null;
  gender?: 'Female' | 'Male' | 'Other' | '' | null;
  profileCompletion: number; // percentage e.g. 80
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Remote' | 'Onsite' | 'Hybrid';
  stipend: string;
  stipendAmount: number; // for filtering
  duration: string;
  deadline: string;
  skills: string[];
  description: string;
  requirements: string[];
  perks: string[];
  openings: number;
  applicantsCount: number;
  isBookmarked?: boolean;
  appliedDate?: string;
  status?: ApplicationStatus;
  category: string;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  providerLogo?: string;
  amount: string;
  amountNumber: number;
  deadline: string;
  category: 'Merit' | 'Means' | 'Women' | 'Minority' | 'STEM' | 'General';
  degree: ('Undergraduate' | 'Postgraduate' | 'PhD' | 'Diploma')[];
  gender: 'All' | 'Female' | 'Male';
  maxIncomeLPA: number; // e.g. 6 (6 Lakhs)
  minCGPA: number; // e.g. 7.5
  description: string;
  eligibility: string[];
  documentsRequired: string[];
  isBookmarked?: boolean;
  appliedDate?: string;
  status?: ApplicationStatus;
  applicationLink?: string;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string; // YYYY-MM-DD or formatted string
  dueText: string; // e.g. "Due Tomorrow", "Due in 2 days"
  priority: Priority;
  category: TaskCategory;
  completed: boolean;
  estimatedMinutes?: number;
  notes?: string;
}

export interface SubjectGrade {
  id: string;
  name: string;
  code: string;
  credits: number;
  grade: string;
  gradePoint: number;
  semester: number;
}

export interface SemesterGPA {
  semester: number;
  semesterName: string;
  sgpa: number;
  credits: number;
  subjectsCount: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verified: boolean;
  credentialUrl?: string;
  imageUrl?: string;
  category: 'Certification' | 'Internship' | 'Workshop' | 'Competition';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: 'Hackathon' | 'Competitive Programming' | 'Academic' | 'Leadership';
  rankOrPosition: string;
  badgeIcon: string;
  description?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  fullDateStr: string;
  venue: string;
  category: 'Workshops' | 'Hackathons' | 'Seminars' | 'Competitions';
  organizer: string;
  description: string;
  speaker?: string;
  maxAttendees: number;
  registeredCount: number;
  isRegistered: boolean;
  registrationDeadline: string;
  mode: 'In-person' | 'Online' | 'Hybrid';
  tags: string[];
  bannerGradient?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  authorBranch: string;
  createdAt: string;
  category: 'Coding' | 'Placements' | 'Higher Studies' | 'Internships' | 'Scholarships';
  title?: string;
  content: string;
  upvotes: number;
  hasUpvoted?: boolean;
  commentsCount: number;
  comments?: PostComment[];
  isPinned?: boolean;
  tags: string[];
}

export interface PostComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorBranch: string;
  content: string;
  createdAt: string;
  upvotes: number;
}

export interface SmartNotification {
  id: string;
  title: string;
  message: string;
  category: 'deadline' | 'internship' | 'scholarship' | 'event' | 'task' | 'application';
  timeAgo: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  badgeColor?: string;
  targetId?: string;
}

export interface AnalyticsData {
  studyProgressPercentage: number;
  tasksCompletedCount: number;
  totalTasksCount: number;
  applicationsSentCount: number;
  eventsAttendedCount: number;
  gpaTrend: { semester: string; gpa: number }[];
  weeklyStudyHours: { day: string; hours: number; target: number }[];
  applicationStatusBreakdown: { name: string; count: number; color: string }[];
  skillProficiency: { skill: string; level: number }[];
}
