const { defineConfig } = require("cypress");
const fs = require("fs-extra");

module.exports = defineConfig({
  // reporter at top-level so reporter options apply
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", // << change to your app URL
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    video: true,

    screenshotsFolder: "cypress/reports/screenshots",
    videosFolder: "cypress/reports/videos",

    setupNodeEvents(on, config) {
      // 1) register mochawesome reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);

      // 2) install terminal report printer
      // require("cypress-terminal-report/src/installLogsPrinter")(on);

      // 3) Clean reports folder BEFORE each run (optional)
      on("before:run", async () => {
        try {
          fs.removeSync("cypress/reports");
          console.log("Cleaned cypress/reports");
        } catch (err) {
          console.warn("No reports folder to remove.");
        }
      });

      return config;
    }
  }
});