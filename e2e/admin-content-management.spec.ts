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

test('an administrator can create, verify, and remove internships, scholarships, and campus events', async ({ page }) => {
  email = createTestEmail();
  marker = createTestMarker();
  await createAdminSession(page, email);

  const internshipTitle = `${marker} Software Internship`;
  await page.getByRole('button', { name: 'Internships', exact: true }).click();
  await page.getByRole('button', { name: 'Post New Internship' }).click();
  await page.getByPlaceholder('e.g. AI Research Intern').fill(internshipTitle);
  await page.getByPlaceholder('e.g. Google India').fill(`${marker} Labs`);
  const internshipForm = page.getByPlaceholder('e.g. AI Research Intern').locator('xpath=ancestor::form');
  await internshipForm.locator('input[type="date"]').fill('2027-12-31');
  await internshipForm.getByRole('button', { name: 'Publish Opening' }).click();
  await expect(page.getByText(internshipTitle, { exact: true })).toBeVisible();
  await expect(page.getByText(new RegExp(`${marker} Labs`))).toBeVisible();
  await page.getByRole('button', { name: `Delete internship ${internshipTitle}` }).click();
  await expect(page.getByText(internshipTitle, { exact: true })).toHaveCount(0);

  const scholarshipTitle = `${marker} Merit Scholarship`;
  await page.getByRole('button', { name: 'Scholarships', exact: true }).click();
  await page.getByRole('button', { name: 'Add Scholarship' }).click();
  await page.getByPlaceholder('e.g. Siemens STEM Fellowship').fill(scholarshipTitle);
  await page.getByPlaceholder('e.g. Siemens Foundation').fill(`${marker} Foundation`);
  const scholarshipForm = page.getByPlaceholder('e.g. Siemens STEM Fellowship').locator('xpath=ancestor::form');
  await scholarshipForm.locator('input[type="date"]').fill('2027-12-31');
  await scholarshipForm.getByRole('button', { name: 'Publish Scholarship' }).click();
  await expect(page.getByText(scholarshipTitle, { exact: true })).toBeVisible();
  await expect(page.getByText(new RegExp(`${marker} Foundation`))).toBeVisible();
  await page.getByRole('button', { name: `Delete scholarship ${scholarshipTitle}` }).click();
  await expect(page.getByText(scholarshipTitle, { exact: true })).toHaveCount(0);

  const eventTitle = `${marker} Campus Workshop`;
  await page.getByRole('button', { name: 'Events', exact: true }).click();
  await page.getByRole('button', { name: 'Schedule Event' }).click();
  await page.getByPlaceholder('e.g. NextGen Web3 Hackathon').fill(eventTitle);
  const eventForm = page.getByPlaceholder('e.g. NextGen Web3 Hackathon').locator('xpath=ancestor::form');
  await eventForm.locator('input[type="date"]').fill('2027-12-31');
  await eventForm.getByRole('button', { name: 'Schedule Event' }).click();
  await expect(page.getByText(eventTitle, { exact: true })).toBeVisible();
  await page.getByRole('button', { name: `Delete event ${eventTitle}` }).click();
  await expect(page.getByText(eventTitle, { exact: true })).toHaveCount(0);
});
