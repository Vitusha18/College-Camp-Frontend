import { expect, test } from '@playwright/test';
import { closeTestDatabase, cleanupTestUser, createTestEmail, registerStudent } from './support';

let email = '';

test.afterEach(async () => {
  if (email) await cleanupTestUser(email);
  email = '';
});

test.afterAll(closeTestDatabase);

test('a student can navigate the opportunity, event, portfolio, notification, and settings pages', async ({ page }) => {
  email = createTestEmail();
  await registerStudent(page, email);

  await page.getByRole('button', { name: 'Internships', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Internship Finder' })).toBeVisible();
  await expect(page.getByPlaceholder('Search by role, skills, company...')).toBeVisible();

  await page.getByRole('button', { name: 'Scholarships', exact: true }).click();
  await expect(page.getByRole('heading', { name: /Scholarships that/ })).toBeVisible();
  await expect(page.getByPlaceholder('Search scholarships by name, foundation, or field...')).toBeVisible();

  await page.getByRole('button', { name: 'Events', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Campus Events & Hackathons' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Hackathons', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Portfolio', exact: true }).click();
  await expect(page.getByText('Certificates & Badges')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Projects', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Notifications', exact: true }).click();
  await expect(page.getByRole('main').getByRole('heading', { name: 'Notifications', level: 1 })).toBeVisible();

  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
});
