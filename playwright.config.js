const path = require('path')

module.exports = {
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com/',
    // Используем абсолютный путь
    storageState: path.resolve(__dirname, './auth/auth-storage.json'),
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'loggedState',
      globalSetup: path.resolve('./tests/globalSetup.js'),
      testMatch: [
        /.*addToCart_standardUser.*\.spec\.js$/,
        /.*sortByName_standardUser.*\.spec\.js$/,
        /.*loginSaveState.*\.spec\.js$/,
      ],
      use: {
        baseURL: 'https://www.saucedemo.com/',
        storageState: path.resolve(__dirname, './auth/auth-storage.json'), // Путь для loggedState
      },
    },
    {
      name: 'noAuth',
      testMatch: [
        /.*login_lockedUser.*\.spec\.js$/,
        /.*login_standardUser.*\.spec\.js$/,
      ],
      use: {
        baseURL: 'https://www.saucedemo.com/',
      },
    },
  ],
}
