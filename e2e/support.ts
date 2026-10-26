import { randomUUID } from 'node:crypto';
import type { Page } from '@playwright/test';
import { PrismaClient } from '../../backend/node_modules/@prisma/client/index.js';

const prisma = new PrismaClient();

export function createTestEmail(): string {
  return `e2e-${randomUUID()}@example.test`;
}

export function createTestMarker(): string {
  return `E2E-${randomUUID()}`;
}

export async function createStudentOpportunityFixtures(email: string, marker: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, universityId: true },
  });
  if (!user?.universityId) throw new Error('Unable to find the registered test student university');

  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 30);
  await prisma.internship.createMany({
    data: [
      {
        title: `${marker} Remote Developer`,
        company: `${marker} Remote Labs`,
        location: 'Bengaluru',
        stipend: '₹25,000/month',
        type: 'Remote',
        skills: ['React', 'TypeScript'],
        deadline,
      },
      {
        title: `${marker} Onsite Designer`,
        company: `${marker} Design Studio`,
        location: 'Mumbai',
        stipend: '₹10,000/month',
        type: 'Onsite',
        skills: ['Figma'],
        deadline,
      },
    ],
  });

  await prisma.scholarship.createMany({
    data: [
      {
        title: `${marker} Women in STEM`,
        provider: `${marker} Foundation`,
        amount: '₹50,000',
        amountNumber: 50000,
        deadline: '31 Dec 2027',
        category: 'Women',
        degree: ['B.Tech'],
        gender: 'Female',
        maxIncomeLPA: 5,
        minCGPA: 8,
        description: 'Test scholarship with broad eligibility.',
        eligibility: [],
        documentsRequired: [],
      },
      {
        title: `${marker} High Merit`,
        provider: `${marker} Merit Foundation`,
        amount: '₹1,00,000',
        amountNumber: 100000,
        deadline: '31 Dec 2027',
        category: 'Merit',
        degree: ['B.Tech'],
        gender: 'All',
        maxIncomeLPA: 2,
        minCGPA: 9.5,
        description: 'Test scholarship with stricter eligibility.',
        eligibility: [],
        documentsRequired: [],
      },
    ],
  });

  await prisma.campusEvent.createMany({
    data: [
      {
        title: `${marker} Student Workshop`,
        date: '31 Dec 2027',
        time: '10:00 AM - 12:00 PM',
        fullDateStr: '31 December 2027',
        venue: 'Test Seminar Hall',
        category: 'Workshops',
        organizer: `${marker} Student Council`,
        description: 'Test workshop for student event flow.',
        maxAttendees: 1,
        registrationDeadline: '30 Dec 2027',
        mode: 'In-person',
        tags: ['e2e'],
        universityId: user.universityId,
      },
      {
        title: `${marker} Campus Hackathon`,
        date: '30 Dec 2027',
        time: '09:00 AM - 05:00 PM',
        fullDateStr: '30 December 2027',
        venue: 'Test Innovation Lab',
        category: 'Hackathons',
        organizer: `${marker} Tech Club`,
        description: 'Test hackathon for category filtering.',
        maxAttendees: 5,
        registrationDeadline: '29 Dec 2027',
        mode: 'Hybrid',
        tags: ['e2e'],
        universityId: user.universityId,
      },
    ],
  });
}

export async function registerStudent(page: Page, email: string): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: /join as student/i }).click();
  await page.getByPlaceholder('E.g., Alex Johnson').fill('Browser Test Student');
  await page.getByRole('combobox').selectOption({ label: 'CampusConnect E2E Test University' });
  await page.getByPlaceholder('you@university.edu').fill(email);
  await page.getByPlaceholder('••••••••').fill('Browser-test-password-123!');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('button', { name: 'Portfolio', exact: true }).waitFor({ state: 'visible' });
}

export async function createAdminSession(page: Page, email: string): Promise<void> {
  await registerStudent(page, email);
  await elevateRegisteredStudentToAdmin(page, email);
}

export async function elevateRegisteredStudentToAdmin(page: Page, email: string): Promise<void> {
  const password = 'Browser-test-password-123!';
  const apiPort = process.env.E2E_API_PORT ?? '5000';

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (!user) throw new Error('Unable to find the test account to promote');
  await prisma.user.update({ where: { id: user.id }, data: { role: 'admin' } });

  const login = await page.request.post(`http://localhost:${apiPort}/api/auth/login`, {
    data: { email, password },
  });
  if (!login.ok()) throw new Error(`Admin test login failed with status ${login.status()}`);
  const { token } = await login.json() as { token: string };
  await page.evaluate((value) => localStorage.setItem('cc_token', value), token);
  await page.reload();
  await page.getByRole('button', { name: 'Analytics', exact: true }).waitFor({ state: 'visible' });
}

export async function cleanupAdminFixtures(marker: string): Promise<void> {
  const internships = await prisma.internship.findMany({
    where: { title: { contains: marker } },
    select: { id: true },
  });
  const internshipIds = internships.map((item) => item.id);
  if (internshipIds.length) {
    await prisma.$transaction([
      prisma.application.deleteMany({ where: { internshipId: { in: internshipIds } } }),
      prisma.internshipBookmark.deleteMany({ where: { internshipId: { in: internshipIds } } }),
      prisma.internship.deleteMany({ where: { id: { in: internshipIds } } }),
    ]);
  }

  const scholarships = await prisma.scholarship.findMany({
    where: { title: { contains: marker } },
    select: { id: true },
  });
  const scholarshipIds = scholarships.map((item) => item.id);
  if (scholarshipIds.length) {
    await prisma.$transaction([
      prisma.scholarshipApplication.deleteMany({ where: { scholarshipId: { in: scholarshipIds } } }),
      prisma.scholarshipBookmark.deleteMany({ where: { scholarshipId: { in: scholarshipIds } } }),
      prisma.scholarship.deleteMany({ where: { id: { in: scholarshipIds } } }),
    ]);
  }

  const events = await prisma.campusEvent.findMany({
    where: { title: { contains: marker } },
    select: { id: true },
  });
  const eventIds = events.map((item) => item.id);
  if (eventIds.length) {
    await prisma.$transaction([
      prisma.eventRegistration.deleteMany({ where: { eventId: { in: eventIds } } }),
      prisma.campusEvent.deleteMany({ where: { id: { in: eventIds } } }),
    ]);
  }

  const posts = await prisma.communityPost.findMany({
    where: { content: { contains: marker } },
    select: { id: true },
  });
  const postIds = posts.map((item) => item.id);
  if (postIds.length) {
    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { postId: { in: postIds } } }),
      prisma.postVote.deleteMany({ where: { postId: { in: postIds } } }),
      prisma.communityPost.deleteMany({ where: { id: { in: postIds } } }),
    ]);
  }
}

export async function cleanupTestUser(email: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (!user) return;

  const posts = await prisma.communityPost.findMany({
    where: { authorId: user.id },
    select: { id: true },
  });
  const postIds = posts.map((post) => post.id);

  await prisma.$transaction([
    prisma.comment.deleteMany({ where: { OR: [{ authorId: user.id }, { postId: { in: postIds } }] } }),
    prisma.postVote.deleteMany({ where: { OR: [{ userId: user.id }, { postId: { in: postIds } }] } }),
    prisma.communityPost.deleteMany({ where: { authorId: user.id } }),
    prisma.eventRegistration.deleteMany({ where: { userId: user.id } }),
    prisma.application.deleteMany({ where: { userId: user.id } }),
    prisma.scholarshipApplication.deleteMany({ where: { userId: user.id } }),
    prisma.internshipBookmark.deleteMany({ where: { userId: user.id } }),
    prisma.scholarshipBookmark.deleteMany({ where: { userId: user.id } }),
    prisma.studyTask.deleteMany({ where: { userId: user.id } }),
    prisma.subjectGrade.deleteMany({ where: { userId: user.id } }),
    prisma.semesterGPARecord.deleteMany({ where: { userId: user.id } }),
    prisma.notification.deleteMany({ where: { userId: user.id } }),
    prisma.certificate.deleteMany({ where: { userId: user.id } }),
    prisma.project.deleteMany({ where: { userId: user.id } }),
    prisma.achievement.deleteMany({ where: { userId: user.id } }),
    prisma.studentProfile.deleteMany({ where: { userId: user.id } }),
    prisma.user.delete({ where: { id: user.id } }),
  ]);
}

export async function closeTestDatabase(): Promise<void> {
  await prisma.$disconnect();
}
