const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://playground.bondaracademy.com/",
    setupNodeEvents(on, config) {
      require("cypress-terminal-report/src/installLogsPrinter")(on, {
        compactLogs: 10,
      });
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 11000
  
})
