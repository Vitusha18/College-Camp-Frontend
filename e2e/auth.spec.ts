import { expect, test } from '@playwright/test';
import { closeTestDatabase, cleanupTestUser, createTestEmail, registerStudent } from './support';

let email = '';

test.afterEach(async () => {
  if (email) await cleanupTestUser(email);
  email = '';
});

test.afterAll(closeTestDatabase);

test('student registration selects a university and opens the authenticated app', async ({ page }) => {
  email = createTestEmail();
  await registerStudent(page, email);

  await expect(page.getByRole('button', { name: 'Portfolio', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /join as student/i })).toHaveCount(0);
});

test('invalid credentials remain on the sign-in form with visible feedback', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByPlaceholder('you@university.edu').fill(createTestEmail());
  await page.getByPlaceholder('••••••••').fill('incorrect-password');
  await page.getByRole('button', { name: 'Sign In Securely' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In Securely' })).toBeVisible();
});
