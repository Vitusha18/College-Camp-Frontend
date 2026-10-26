import { defineConfig, devices } from '@playwright/test';

const apiPort = process.env.E2E_API_PORT ?? '5000';
const frontendPort = process.env.E2E_FRONTEND_PORT ?? '3000';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  timeout: 60000,
  expect: { timeout: 10000 },
  use: {
    baseURL: `http://localhost:${frontendPort}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [{
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  }],
  webServer: [
    {
      command: 'npm run test:server --prefix ..\\backend',
      url: `http://localhost:${apiPort}/api/health`,
      reuseExistingServer: false,
      timeout: 120000,
      env: { E2E_API_PORT: apiPort, PORT: apiPort },
    },
    {
      command: `npm run dev -- --port=${frontendPort}`,
      url: `http://localhost:${frontendPort}`,
      reuseExistingServer: false,
      timeout: 120000,
      env: { E2E_API_PORT: apiPort, E2E_FRONTEND_PORT: frontendPort },
    },
  ],
});
