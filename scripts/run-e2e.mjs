import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTestEnvironment } from '../../backend/scripts/test-environment.mjs';

let testConfiguration;
try {
    testConfiguration = loadTestEnvironment();
} catch (error) {
    console.error(`Refusing to run browser tests: ${error.message}`);
    process.exit(1);
}

const frontendDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const apiPort = process.env.E2E_API_PORT ?? '5000';
const frontendPort = process.env.E2E_FRONTEND_PORT ?? '3000';
const result = spawnSync(npmCommand, ['exec', '--', 'playwright', 'test'], {
    cwd: frontendDirectory,
    env: {
        ...testConfiguration.environment,
        E2E_API_PORT: apiPort,
        E2E_FRONTEND_PORT: frontendPort,
        VITE_API_URL: `http://localhost:${apiPort}/api`,
    },
    stdio: 'inherit',
    shell: process.platform === 'win32',
});

if (result.error) {
    console.error(`Unable to run Playwright: ${result.error.message}`);
    process.exit(1);
}
process.exit(result.status ?? 1);
