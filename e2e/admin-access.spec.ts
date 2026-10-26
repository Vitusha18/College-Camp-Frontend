import { expect, test } from '@playwright/test';
import {
  cleanupTestUser,
  createAdminSession,
  createTestEmail,
  elevateRegisteredStudentToAdmin,
  registerStudent,
} from './support';

let email = '';

test.afterEach(async () => {
  if (email) await cleanupTestUser(email);
  email = '';
});

test('admin-only operations reject students and administrators can access analytics and management sections', async ({ page }) => {
  email = createTestEmail();
  await registerStudent(page, email);
  const apiPort = process.env.E2E_API_PORT ?? '5000';

  const anonymousResponse = await page.request.post(`http://localhost:${apiPort}/api/events`, { data: {} });
  expect(anonymousResponse.status()).toBe(401);

  const studentToken = await page.evaluate(() => localStorage.getItem('cc_token'));
  expect(studentToken).toBeTruthy();
  const headers = { Authorization: `Bearer ${studentToken}` };
  const scholarshipResponse = await page.request.post(`http://localhost:${apiPort}/api/scholarships`, {
    headers,
    data: {},
  });
  expect(scholarshipResponse.status()).toBe(403);
  const eventResponse = await page.request.post(`http://localhost:${apiPort}/api/events`, {
    headers,
    data: {},
  });
  expect(eventResponse.status()).toBe(403);
  const internshipResponse = await page.request.post(`http://localhost:${apiPort}/api/internships`, {
    headers,
    data: { title: 'Unauthorized test role', company: 'Test', deadline: '2027-01-01' },
  });
  expect(internshipResponse.status()).toBe(403);

  await elevateRegisteredStudentToAdmin(page, email);
  await expect(page.getByRole('heading', { name: 'Campus Administration Portal' })).toBeVisible();
  await expect(page.getByText('Platform Activity & Student Engagement')).toBeVisible();

  const sections = [
    { button: 'Internships', heading: 'Manage Internship Openings' },
    { button: 'Scholarships', heading: 'Manage Scholarship Schemes' },
    { button: 'Events', heading: 'Manage Campus Events' },
    { button: 'Moderation', heading: 'Community Discussion Moderation' },
  ];
  for (const section of sections) {
    await page.getByRole('button', { name: section.button, exact: true }).click();
    await expect(page.getByRole('heading', { name: new RegExp(section.heading) })).toBeVisible();
  }
});

test('admin analytics displays opportunity, community, event, and status metrics', async ({ page }) => {
  email = createTestEmail();
  await createAdminSession(page, email);
  await expect(page.getByText('Total Opportunities')).toBeVisible();
  await expect(page.getByText('Community Reach')).toBeVisible();
  await expect(page.getByText('Event Scale')).toBeVisible();
  await expect(page.getByText('Admin Session')).toBeVisible();
  await expect(page.getByText('Administrator access is enabled')).toBeVisible();
});
