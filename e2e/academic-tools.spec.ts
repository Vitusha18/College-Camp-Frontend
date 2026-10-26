import { expect, test } from '@playwright/test';
import { closeTestDatabase, cleanupTestUser, createTestEmail, registerStudent } from './support';

let email = '';

test.afterEach(async () => {
  if (email) await cleanupTestUser(email);
  email = '';
});

test.afterAll(closeTestDatabase);

test('the GPA calculator persists subjects, recalculates grades, and removes subjects', async ({ page }) => {
  email = createTestEmail();
  await registerStudent(page, email);
  await page.getByRole('button', { name: 'GPA Calculator', exact: true }).click();

  await page.getByRole('button', { name: 'Add Subject' }).click();
  await page.getByPlaceholder('e.g. Database Management Systems').fill('Browser Test Mathematics');
  await page.getByPlaceholder('e.g. CS201').fill('MA201');
  const modal = page.getByRole('heading', { name: 'Add Subject to Semester 1' }).locator('..').locator('..');
  await modal.getByText('Credits', { exact: true }).locator('..').getByRole('combobox').selectOption('4');
  await modal.getByText('Grade Expected/Received', { exact: true }).locator('..').getByRole('combobox').selectOption('A');
  await page.getByRole('button', { name: 'Add Subject', exact: true }).last().click();

  const subjectRow = page.getByRole('table').getByRole('row').nth(1);
  await expect(subjectRow).toBeVisible();
  await expect(subjectRow.getByRole('textbox')).toHaveValue('Browser Test Mathematics');
  await expect(subjectRow).toContainText('9');
  const sgpaCard = page.getByText('SGPA (Semester 1)').locator('..');
  const cgpaCard = page.getByText('CGPA (Cumulative)').locator('..');
  await expect(sgpaCard.getByText('9.00', { exact: true })).toBeVisible();
  await expect(cgpaCard.getByText('9.00', { exact: true })).toBeVisible();

  await subjectRow.getByRole('combobox').nth(1).selectOption('A+');
  await expect(subjectRow).toContainText('9.5');
  await expect(sgpaCard.getByText('9.50', { exact: true })).toBeVisible();
  await expect(cgpaCard.getByText('9.50', { exact: true })).toBeVisible();

  await page.waitForTimeout(1000);
  await page.reload();
  await page.getByRole('button', { name: 'GPA Calculator', exact: true }).click();
  const persistedRow = page.getByRole('table').getByRole('row').nth(1);
  await expect(persistedRow).toBeVisible();
  await expect(persistedRow.getByRole('textbox')).toHaveValue('Browser Test Mathematics');
  await expect(persistedRow).toContainText('A+');

  await persistedRow.getByRole('button', { name: 'Remove subject' }).click();
  await expect(page.getByRole('table').getByRole('row')).toHaveCount(1);
});
