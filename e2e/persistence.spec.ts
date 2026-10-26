import { expect, test } from '@playwright/test';
import { closeTestDatabase, cleanupTestUser, createTestEmail, registerStudent } from './support';

let email = '';

test.afterEach(async () => {
  if (email) await cleanupTestUser(email);
  email = '';
});

test.afterAll(closeTestDatabase);

test('profile and certificate data survive a browser reload', async ({ page }) => {
  email = createTestEmail();
  await registerStudent(page, email);

  await page.getByRole('button', { name: 'Toggle notifications drawer' }).click();
  await page.getByRole('region', { name: 'Notifications drawer' }).getByRole('button', { name: 'Settings' }).click();
  await page.getByText('Department', { exact: true }).locator('..').locator('input').fill('Computer Science');
  await page.getByText('CGPA (out of 10)', { exact: true }).locator('..').locator('input').fill('8.6');
  await page.getByRole('button', { name: /save changes/i }).click();
  await expect(page.getByText('Profile Updated')).toBeVisible();

  await page.getByRole('button', { name: 'Portfolio', exact: true }).click();
  await page.getByRole('button', { name: '+ Add New' }).click();
  await page.getByPlaceholder('e.g. AWS Certified Cloud Practitioner').fill('Browser Test Certificate');
  await page.getByPlaceholder('e.g. Amazon Web Services / Coursera').fill('Playwright Academy');
  await page.getByRole('button', { name: 'Save Certificate' }).click();
  await expect(page.getByRole('heading', { name: 'Browser Test Certificate' })).toBeVisible();
  await expect(page.getByText('Unverified')).toBeVisible();

  await page.reload();
  await page.getByRole('button', { name: 'Toggle notifications drawer' }).click();
  await page.getByRole('region', { name: 'Notifications drawer' }).getByRole('button', { name: 'Settings' }).click();
  await expect(page.getByText('Department', { exact: true }).locator('..').locator('input')).toHaveValue('Computer Science');
  await expect(page.getByText('CGPA (out of 10)', { exact: true }).locator('..').locator('input')).toHaveValue('8.6');

  await page.getByRole('button', { name: 'Portfolio', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Browser Test Certificate' })).toBeVisible();
  await expect(page.getByText('Unverified')).toBeVisible();
});
