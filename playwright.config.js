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
      use: {
        ...devices["Desktop Safari"],
        headless: false,
        launchOptions: {
          args: [
            '--start-maximized',     // Works primarily on Windows/Linux
            '--window-position=0,0', // Positions browser at the top-left coordinate of macOS
            '--window-size=1920,1080' // Manually specifies the boundary width and height
          ]
        },
      },
    },
  ],
};

module.exports = config;