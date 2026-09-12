const { screenReaderConfig } = require("@guidepup/playwright");
const { devices } = require("@playwright/test");

const config = {
  ...screenReaderConfig,
  reportSlowTests: null,
  timeout: 3 * 60 * 1000,
  retries: 0,
  projects: [
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], headless: false },
    },
    {
      name: "windows",
      use: { ...devices["Desktop Edge"], headless: false },
    },
  ],
};

module.exports = config;