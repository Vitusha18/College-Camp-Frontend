import { expect, test } from '@playwright/test';
import { closeTestDatabase, cleanupTestUser, createTestEmail, registerStudent } from './support';

let email = '';

test.afterEach(async () => {
  if (email) await cleanupTestUser(email);
  email = '';
});

test.afterAll(closeTestDatabase);

test('a student can publish, categorize, vote on, and comment on a community post', async ({ page }) => {
  email = createTestEmail();
  await registerStudent(page, email);
  await page.getByRole('button', { name: 'Community', exact: true }).click();
  await page.getByRole('button', { name: 'Create Post' }).click();

  await page.getByPlaceholder('e.g. Best resources for learning System Design').fill('Browser test scholarship resources');
  await page.getByRole('combobox').selectOption('Scholarships');
  await page.getByPlaceholder('Ask a question, share job links, or initiate a project collaboration...').fill(
    'Does anyone have funding resources for graduate study?'
  );
  await page.getByPlaceholder('e.g. coding, placements, resume').fill('funding, graduate-study');
  await page.getByRole('button', { name: 'Publish Discussion' }).click();

  await expect(page.getByText('Browser test scholarship resources')).toBeVisible();
  await expect(page.getByText('#funding')).toBeVisible();
  await page.getByRole('button', { name: 'Upvote' }).click();
  await expect(page.getByRole('button', { name: 'Remove upvote' })).toBeVisible();

  await page.getByRole('button', { name: 'Show comments' }).click();
  await page.getByPlaceholder('Write a helpful response...').fill('Check the university funding portal.');
  await page.getByRole('button', { name: 'Post comment' }).click();
  await expect(page.getByText('Check the university funding portal.')).toBeVisible();

  await page.reload();
  await page.getByRole('button', { name: 'Community', exact: true }).click();
  await page.getByRole('main').getByRole('button', { name: 'Scholarships', exact: true }).click();
  await expect(page.getByText('Browser test scholarship resources')).toBeVisible();
  await expect(page.getByText('#funding')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Remove upvote' })).toBeVisible();
  await page.getByRole('button', { name: 'Show comments' }).click();
  await expect(page.getByText('Check the university funding portal.')).toBeVisible();
});
