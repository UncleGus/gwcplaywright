import "dotenv/config";
import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

export default defineConfig({
  ...base,
  reporter: [
    [
      "playwright-xray",
      {
        jira: {
          url: "https://farmersmutualgroup.atlassian.net/",
          type: "cloud",
          apiVersion: "1.0",
        },
        cloud: {
          client_id: process.env.XRAY_CLIENT_ID,
          client_secret: process.env.XRAY_SECRET,
        },
        projectKey: "DEMO",
        testPlan: "DEMO-341",
        debug: false,
        dryRun: process.env.DRYRUN
      },
    ],
  ],
});
