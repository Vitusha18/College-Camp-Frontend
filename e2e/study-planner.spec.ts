import { expect, test } from '@playwright/test';
import { closeTestDatabase, cleanupTestUser, createTestEmail, registerStudent } from './support';

let email = '';

test.afterEach(async () => {
  if (email) await cleanupTestUser(email);
  email = '';
});

test.afterAll(closeTestDatabase);

test('a student can plan, complete, reload, and delete a study task', async ({ page }) => {
  email = createTestEmail();
  await registerStudent(page, email);
  await page.getByRole('button', { name: 'Study Planner', exact: true }).click();

  await page.getByRole('button', { name: 'Add Task' }).click();
  await page.getByLabel('Task Title *').fill('Browser test: review algorithms');
  await page.getByLabel('Subject / Course').fill('Algorithms');
  await page.getByLabel('Priority').selectOption('High');
  await page.getByLabel('Category').selectOption('Assignment');
  await page.getByLabel('Estimated Time').selectOption('90');
  await page.getByLabel('Notes (Optional)').fill('Review graph traversal');
  await page.getByRole('button', { name: 'Schedule Task' }).click();

  await expect(page.getByRole('heading', { name: 'Browser test: review algorithms' })).toBeVisible();
  await expect(page.getByText('Task Scheduled')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Mark Browser test: review algorithms complete' }).click();
  await expect(page.getByRole('checkbox', { name: 'Mark Browser test: review algorithms incomplete' })).toBeChecked();
  await expect(page.getByText('Task Completed! 🎯')).toBeVisible();

  await page.reload();
  await page.getByRole('button', { name: 'Study Planner', exact: true }).click();
  const completedTask = page.getByRole('checkbox', { name: 'Mark Browser test: review algorithms incomplete' });
  await expect(completedTask).toBeChecked();
  await page.getByRole('button', { name: 'Delete Browser test: review algorithms' }).click();
  await expect(page.getByRole('heading', { name: 'Browser test: review algorithms' })).toHaveCount(0);
});
