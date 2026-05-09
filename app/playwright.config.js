/// <reference types="node" />
// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'ui',
      testMatch: /tests\/ui\/.*\.spec\.ts/,
    },
  
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
    },
  
    {
      name: 'mobile',
      testMatch: /tests\/ui\/mobile\.spec\.ts/,
      use: {
        viewport: devices['iPhone 13'].viewport,
        userAgent: devices['iPhone 13'].userAgent,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
