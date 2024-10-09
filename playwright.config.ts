import "dotenv/config";
import environments from "./config/environments.json";
import { defineConfig, expect } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const validEnvironments = Object.getOwnPropertyNames(environments);
const environmentErrorMessage = `Environment name not found. Edit .env in the root directory to set GALAXY=<environment name>, using one of the following options:
${validEnvironments}`;
expect(validEnvironments, environmentErrorMessage).toContain(
  process.env.GALAXY
);
console.log(`Using environment ${process.env.GALAXY}`);

const bddTestDir = defineBddConfig({
  features: "tests/bdd/features/*.feature",
  steps: ["tests/bdd/steps/**/*.ts", "tests/fixtures/*.ts"],
});

export default defineConfig({
  projects: [
    {
      name: "bdd",
      testDir: bddTestDir,
    },
    {
      name: "non-bdd",
      testDir: "tests/nonbdd",
      use: { browserName: "chromium", viewport: { width: 1280, height: 880 } },
    },
  ],
  reporter: "html",
});
