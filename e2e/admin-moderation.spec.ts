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

test('an administrator can pin and remove a community post and verify the updated state', async ({ page }) => {
  email = createTestEmail();
  marker = createTestMarker();
  await createAdminSession(page, email);

  const content = `${marker} moderation test post`;
  const token = await page.evaluate(() => localStorage.getItem('cc_token'));
  const apiPort = process.env.E2E_API_PORT ?? '5000';
  const createResponse = await page.request.post(`http://localhost:${apiPort}/api/posts`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      title: `${marker} moderation title`,
      content,
      category: 'Coding',
      tags: ['admin-test'],
    },
  });
  expect(createResponse.status()).toBe(201);
  const createdPost = await createResponse.json() as { id: string };

  await page.getByRole('button', { name: 'Moderation', exact: true }).click();
  const postCard = page.getByText(content, { exact: true }).locator('..').locator('..');
  await expect(postCard).toBeVisible();
  await postCard.getByRole('button', { name: 'Pin' }).click();
  await expect(postCard.getByText('Pinned', { exact: true })).toBeVisible();

  const postsResponse = await page.request.get(`http://localhost:${apiPort}/api/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(postsResponse.ok()).toBeTruthy();
  const posts = await postsResponse.json() as Array<{ id: string; isPinned: boolean }>;
  expect(posts.find((post) => post.id === createdPost.id)?.isPinned).toBe(true);

  await postCard.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByText(content, { exact: true })).toHaveCount(0);
  const remainingPostsResponse = await page.request.get(`http://localhost:${apiPort}/api/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const remainingPosts = await remainingPostsResponse.json() as Array<{ id: string }>;
  expect(remainingPosts.some((post) => post.id === createdPost.id)).toBe(false);
});
