const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://testeqa.pge.ce.gov.br',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    video: true,
    screenshotOnRunFailure: true,
    downloadsFolder: 'cypress/downloads',
    setupNodeEvents(on, config) {
      return config
    },
  },
})
