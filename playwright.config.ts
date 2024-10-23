import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [["line"], ["allure-playwright"]],
  use: {
    baseURL: "https://www.brighthorizons.com/",
    permissions: ["geolocation"],
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: false,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
