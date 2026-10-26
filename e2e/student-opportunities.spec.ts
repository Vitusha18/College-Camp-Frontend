import { expect, test } from '@playwright/test';
import {
  cleanupAdminFixtures,
  cleanupTestUser,
  closeTestDatabase,
  createStudentOpportunityFixtures,
  createTestEmail,
  createTestMarker,
  registerStudent,
} from './support';

let email = '';
let marker = '';

test.afterEach(async () => {
  if (marker) await cleanupAdminFixtures(marker);
  if (email) await cleanupTestUser(email);
  email = '';
  marker = '';
});

test.afterAll(closeTestDatabase);

test('students can search, filter, save, and apply for internships with persisted results', async ({ page }) => {
  email = createTestEmail();
  marker = createTestMarker();
  await registerStudent(page, email);
  await createStudentOpportunityFixtures(email, marker);

  await page.getByRole('button', { name: 'Internships', exact: true }).click();
  const search = page.getByPlaceholder('Search by role, skills, company...');
  await search.fill(marker);
  const remoteTitle = `${marker} Remote Developer`;
  const onsiteTitle = `${marker} Onsite Designer`;
  await expect(page.getByRole('heading', { name: remoteTitle, exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: onsiteTitle, exact: true })).toBeVisible();

  const filters = page.locator('select');
  await filters.nth(0).selectOption('Remote');
  await filters.nth(1).selectOption('20000');
  await expect(page.getByRole('heading', { name: remoteTitle, exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: onsiteTitle, exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.getByRole('heading', { name: onsiteTitle, exact: true })).toBeVisible();

  const remoteCard = page.getByRole('heading', { name: remoteTitle, exact: true })
    .locator('xpath=ancestor::div[contains(@class, "group")][1]');
  await remoteCard.getByTitle('Save internship').click();
  await expect(remoteCard.getByTitle('Bookmarked')).toBeVisible();
  await remoteCard.getByRole('button', { name: 'Apply', exact: true }).click();
  await page.getByRole('button', { name: `Apply to ${marker} Remote Labs` }).click();
  await page.getByRole('button', { name: 'Submit Application' }).click();
  await page.getByRole('button', { name: 'Confirm & Apply Now' }).click();
  await expect(page.getByText('Application Submitted!')).toBeVisible();

  const token = await page.evaluate(() => localStorage.getItem('cc_token'));
  const apiPort = process.env.E2E_API_PORT ?? '5000';
  const internshipsResponse = await page.request.get(`http://localhost:${apiPort}/api/internships`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(internshipsResponse.ok()).toBeTruthy();
  const internships = await internshipsResponse.json() as Array<{
    title: string;
    isBookmarked: boolean;
    status?: string;
  }>;
  const savedInternship = internships.find((internship) => internship.title === remoteTitle);
  expect(savedInternship?.isBookmarked).toBe(true);
  expect(savedInternship?.status).toBe('Applied');

  await page.reload();
  await page.getByRole('button', { name: 'Internships', exact: true }).click();
  await search.fill(marker);
  const persistedCard = page.getByRole('heading', { name: remoteTitle, exact: true })
    .locator('xpath=ancestor::div[contains(@class, "group")][1]');
  await expect(persistedCard.getByRole('button', { name: 'Applied', exact: true })).toBeVisible();
  await expect(persistedCard.getByTitle('Bookmarked')).toBeVisible();
});

test('students can filter scholarships, check eligibility, bookmark, and apply', async ({ page }) => {
  email = createTestEmail();
  marker = createTestMarker();
  await registerStudent(page, email);
  await createStudentOpportunityFixtures(email, marker);

  await page.getByRole('button', { name: 'Scholarships', exact: true }).click();
  const search = page.getByPlaceholder('Search scholarships by name, foundation, or field...');
  await search.fill(marker);
  const eligibleTitle = `${marker} Women in STEM`;
  const stricterTitle = `${marker} High Merit`;
  await expect(page.getByRole('heading', { name: eligibleTitle, exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: stricterTitle, exact: true })).toBeVisible();

  const categoryFilters = page.getByRole('group', { name: 'Filter scholarships by category' });
  await categoryFilters.getByRole('button', { name: 'Women', exact: true }).click();
  await expect(page.getByRole('heading', { name: eligibleTitle, exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: stricterTitle, exact: true })).toHaveCount(0);
  await page.getByLabel('Filter by candidate gender').selectOption('Male');
  await expect(page.getByText('No scholarships found matching criteria')).toBeVisible();
  await page.getByLabel('Filter by candidate gender').selectOption('Female');
  await expect(page.getByRole('heading', { name: eligibleTitle, exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Check my eligibility' }).click();
  const eligibilityModal = page.getByRole('heading', { name: 'Smart Eligibility Checker' })
    .locator('xpath=ancestor::div[contains(@class, "max-w-xl")][1]');
  await expect(eligibilityModal.getByText(eligibleTitle, { exact: true })).toBeVisible();
  await expect(eligibilityModal.getByText(stricterTitle, { exact: true })).toHaveCount(0);
  await eligibilityModal.getByRole('button', { name: 'Done' }).click();

  const scholarshipCard = page.getByRole('heading', { name: eligibleTitle, exact: true })
    .locator('xpath=ancestor::div[contains(@class, "group")][1]');
  await scholarshipCard.getByRole('button', { name: `Save ${eligibleTitle}` }).click();
  await expect(scholarshipCard.getByRole('button', { name: `Remove ${eligibleTitle} from saved scholarships` })).toBeVisible();
  await scholarshipCard.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(page.getByText('Scholarship Application Submitted')).toBeVisible();

  const token = await page.evaluate(() => localStorage.getItem('cc_token'));
  const apiPort = process.env.E2E_API_PORT ?? '5000';
  const scholarshipsResponse = await page.request.get(`http://localhost:${apiPort}/api/scholarships`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(scholarshipsResponse.ok()).toBeTruthy();
  const scholarships = await scholarshipsResponse.json() as Array<{
    title: string;
    isBookmarked: boolean;
    status?: string;
  }>;
  const savedScholarship = scholarships.find((scholarship) => scholarship.title === eligibleTitle);
  expect(savedScholarship?.isBookmarked).toBe(true);
  expect(savedScholarship?.status).toBe('Applied');
});

test('students can filter events, register, view a pass, cancel, and verify persistence', async ({ page }) => {
  email = createTestEmail();
  marker = createTestMarker();
  await registerStudent(page, email);
  await createStudentOpportunityFixtures(email, marker);

  await page.getByRole('button', { name: 'Events', exact: true }).click();
  const workshopTitle = `${marker} Student Workshop`;
  const hackathonTitle = `${marker} Campus Hackathon`;
  await page.getByRole('button', { name: 'Hackathons', exact: true }).click();
  await expect(page.getByRole('heading', { name: hackathonTitle, exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: workshopTitle, exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'All', exact: true }).click();
  const globalSearch = page.getByPlaceholder('Search internships, scholarships, events...');
  await globalSearch.fill('Student Workshop');
  await expect(page.getByRole('heading', { name: workshopTitle, exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: hackathonTitle, exact: true })).toHaveCount(0);
  await globalSearch.fill('');
  await page.getByRole('button', { name: 'Workshops', exact: true }).click();

  const eventCard = page.getByRole('heading', { name: workshopTitle, exact: true })
    .locator('xpath=ancestor::div[contains(@class, "group")][1]');
  await eventCard.getByRole('button', { name: 'Register', exact: true }).click();
  await expect(eventCard.getByRole('button', { name: 'Cancel', exact: true })).toBeVisible();
  await eventCard.getByRole('button', { name: 'View Pass' }).click();
  await expect(page.getByText('Official Campus Entry Pass')).toBeVisible();
  await expect(page.getByRole('heading', { name: workshopTitle, exact: true }).last()).toBeVisible();
  await page.getByText('Official Campus Entry Pass').locator('..').getByRole('button').click();

  const token = await page.evaluate(() => localStorage.getItem('cc_token'));
  const apiPort = process.env.E2E_API_PORT ?? '5000';
  const registeredResponse = await page.request.get(`http://localhost:${apiPort}/api/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(registeredResponse.ok()).toBeTruthy();
  const registeredEvents = await registeredResponse.json() as Array<{
    title: string;
    isRegistered: boolean;
    registeredCount: number;
  }>;
  const registeredEvent = registeredEvents.find((event) => event.title === workshopTitle);
  expect(registeredEvent?.isRegistered).toBe(true);
  expect(registeredEvent?.registeredCount).toBe(1);

  await eventCard.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(eventCard.getByRole('button', { name: 'Register', exact: true })).toBeVisible();
  const cancelledResponse = await page.request.get(`http://localhost:${apiPort}/api/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const cancelledEvents = await cancelledResponse.json() as Array<{ title: string; isRegistered: boolean }>;
  expect(cancelledEvents.find((event) => event.title === workshopTitle)?.isRegistered).toBe(false);
});

test('students can save profile settings and persist their theme preference', async ({ page }) => {
  email = createTestEmail();
  await registerStudent(page, email);
  await page.getByRole('button', { name: 'Settings', exact: true }).click();

  const darkMode = page.getByRole('switch', { name: 'Dark mode' });
  await expect(darkMode).toHaveAttribute('aria-checked', 'false');
  await darkMode.click();
  await expect(darkMode).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('html')).toHaveClass(/dark/);

  const departmentInput = page.getByText('Department', { exact: true }).locator('..').locator('input');
  const bioInput = page.getByText('Bio', { exact: true }).locator('..').locator('textarea');
  await departmentInput.fill('Computer Science');
  await bioInput.fill('Student settings browser test');
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByText('Profile Updated')).toBeVisible();

  await page.reload();
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await expect(page.getByRole('switch', { name: 'Dark mode' })).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByText('Department', { exact: true }).locator('..').locator('input')).toHaveValue('Computer Science');
  await expect(page.getByText('Bio', { exact: true }).locator('..').locator('textarea')).toHaveValue('Student settings browser test');
});
