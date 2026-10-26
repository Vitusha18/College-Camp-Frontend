import { expect, test } from '@playwright/test';
import {
  cleanupAdminFixtures,
  cleanupTestUser,
  createAdminSession,
  createTestEmail,
  createTestMarker,
} from './support';

let email = '';
let marker = '';

test.afterEach(async () => {
  if (marker) await cleanupAdminFixtures(marker);
  if (email) await cleanupTestUser(email);
  email = '';
  marker = '';
});

test('admin forms enforce required fields and scholarship CGPA bounds and can be cancelled', async ({ page }) => {
  email = createTestEmail();
  await createAdminSession(page, email);

  await page.getByRole('button', { name: 'Internships', exact: true }).click();
  await page.getByRole('button', { name: 'Post New Internship' }).click();
  const internshipForm = page.getByRole('heading', { name: 'Post Internship Opening' }).locator('..').locator('..').locator('form');
  expect(await internshipForm.evaluate((form) => (form as HTMLFormElement).checkValidity())).toBe(false);
  await page.getByRole('button', { name: 'Close internship form' }).click();

  await page.getByRole('button', { name: 'Scholarships', exact: true }).click();
  await page.getByRole('button', { name: 'Add Scholarship' }).click();
  const scholarshipForm = page.getByRole('heading', { name: 'Add Scholarship Scheme' }).locator('..').locator('..').locator('form');
  await page.getByPlaceholder('e.g. Siemens STEM Fellowship').fill(`${createTestMarker()} Test Scholarship`);
  await page.getByPlaceholder('e.g. Siemens Foundation').fill('E2E Foundation');
  const cgpaInput = scholarshipForm.locator('input[type="number"]');
  await cgpaInput.fill('10.1');
  expect(await scholarshipForm.evaluate((form) => (form as HTMLFormElement).checkValidity())).toBe(false);
  await page.getByRole('button', { name: 'Publish Scholarship' }).click();
  await expect(page.getByRole('heading', { name: 'Add Scholarship Scheme' })).toBeVisible();
  await cgpaInput.fill('10');
  expect(await scholarshipForm.evaluate((form) => (form as HTMLFormElement).checkValidity())).toBe(true);
  await page.getByRole('button', { name: 'Close scholarship form' }).click();

  await page.getByRole('button', { name: 'Events', exact: true }).click();
  await page.getByRole('button', { name: 'Schedule Event' }).click();
  const eventForm = page.getByRole('heading', { name: 'Schedule Campus Event' }).locator('..').locator('..').locator('form');
  expect(await eventForm.evaluate((form) => (form as HTMLFormElement).checkValidity())).toBe(false);
  await page.getByRole('button', { name: 'Close event form' }).click();
  await expect(page.getByRole('heading', { name: 'Schedule Campus Event' })).toHaveCount(0);
});

test('failed scholarship creation is explained and can be retried without losing form data', async ({ page }) => {
  email = createTestEmail();
  marker = createTestMarker();
  await createAdminSession(page, email);
  await page.getByRole('button', { name: 'Scholarships', exact: true }).click();
  await page.getByRole('button', { name: 'Add Scholarship' }).click();
  const title = `${marker} Retry Scholarship`;
  await page.getByPlaceholder('e.g. Siemens STEM Fellowship').fill(title);
  await page.getByPlaceholder('e.g. Siemens Foundation').fill(`${marker} Foundation`);

  const routePattern = '**/api/scholarships';
  await page.route(routePattern, async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Scholarship service unavailable' }),
      });
      return;
    }
    await route.continue();
  });
  await page.getByRole('button', { name: 'Publish Scholarship' }).click();
  await expect(page.getByRole('alert')).toHaveText('Scholarship service unavailable');
  await expect(page.getByPlaceholder('e.g. Siemens STEM Fellowship')).toHaveValue(title);

  await page.unroute(routePattern);
  await page.getByRole('button', { name: 'Publish Scholarship' }).click();
  await expect(page.getByText(title, { exact: true })).toBeVisible();
});

test('failed admin delete and pin requests preserve content and show errors; pin can be toggled back off', async ({ page }) => {
  email = createTestEmail();
  marker = createTestMarker();
  await createAdminSession(page, email);
  const apiPort = process.env.E2E_API_PORT ?? '5000';

  const internshipTitle = `${marker} Deletion Failure Internship`;
  await page.getByRole('button', { name: 'Internships', exact: true }).click();
  await page.getByRole('button', { name: 'Post New Internship' }).click();
  await page.getByPlaceholder('e.g. AI Research Intern').fill(internshipTitle);
  await page.getByPlaceholder('e.g. Google India').fill(`${marker} Labs`);
  const internshipForm = page.getByPlaceholder('e.g. AI Research Intern').locator('xpath=ancestor::form');
  await internshipForm.locator('input[type="date"]').fill('2027-12-31');
  await page.getByRole('button', { name: 'Publish Opening' }).click();
  await expect(page.getByText(internshipTitle, { exact: true })).toBeVisible();

  const deletePattern = '**/api/internships/*';
  await page.route(deletePattern, async (route) => {
    if (route.request().method() === 'DELETE') {
      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Delete service unavailable' }),
      });
      return;
    }
    await route.continue();
  });
  await page.getByRole('button', { name: `Delete internship ${internshipTitle}` }).click();
  await expect(page.getByText('Unable to delete internship')).toBeVisible();
  await expect(page.getByText(internshipTitle, { exact: true })).toBeVisible();
  await page.unroute(deletePattern);

  const token = await page.evaluate(() => localStorage.getItem('cc_token'));
  const createPostResponse = await page.request.post(`http://localhost:${apiPort}/api/posts`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      title: `${marker} pin failure title`,
      content: `${marker} pin failure content`,
      category: 'Coding',
      tags: ['admin-test'],
    },
  });
  expect(createPostResponse.status()).toBe(201);
  const createdPost = await createPostResponse.json() as { id: string };

  await page.getByRole('button', { name: 'Moderation', exact: true }).click();
  const postCard = page.getByText(`${marker} pin failure content`, { exact: true }).locator('..').locator('..');
  const pinPattern = `**/api/posts/${createdPost.id}/pin`;
  await page.route(pinPattern, async (route) => {
    await route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Moderation service unavailable' }),
    });
  });
  await postCard.getByRole('button', { name: 'Pin' }).click();
  await expect(page.getByText('Unable to update post pin')).toBeVisible();
  await expect(postCard.getByText('Pinned', { exact: true })).toHaveCount(0);
  await page.unroute(pinPattern);

  await postCard.getByRole('button', { name: 'Pin' }).click();
  await expect(postCard.getByText('Pinned', { exact: true })).toBeVisible();
  await postCard.getByRole('button', { name: 'Pin' }).click();
  await expect(postCard.getByText('Pinned', { exact: true })).toHaveCount(0);

  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByText(`${marker} pin failure content`, { exact: true })).toHaveCount(0);
});
