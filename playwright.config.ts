import "dotenv/config";
import environments from "./config/environments.json";
import { defineConfig, expect } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const validEnvironments = Object.getOwnPropertyNames(environments);
const environmentErrorMessage = `Environment name not found. Edit .env in the root directory to set GALAXY=<environment name>, using one of the following options:
${validEnvironments}`;
expect(validEnvironments, environmentErrorMessage).toContain(
  process.env.GALAXY
);
console.log(`Using environment ${process.env.GALAXY}`);

const testDir = defineBddConfig({
  features: 'tests/features/**/*.feature',
  steps: 'tests/**/*.ts',
});

export default defineConfig({
  testDir,
  reporter: 'html',
});
