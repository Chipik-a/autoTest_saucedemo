const path = require('path')
const fs = require('fs');

module.exports = {
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  env: {
    browser: true,
    node: true,
  },
  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'loggedState',
      globalSetup: path.resolve('./tests/globalSetup.js'),
      testMatch: [
        /.*addToCart_standardUser.*\.spec\.js$/,
        /.*sortByName_standardUser.*\.spec\.js$/,
        /.*addRemoveItems_standardUser.*\.spec\.js$/,
        /.*loginSaveState.*\.spec\.js$/,
      ],
      use: {
        baseURL: 'https://www.saucedemo.com/',
        storageState: path.resolve(__dirname, './auth/auth-storage.json'),
      },
    },
    {
      name: 'cartWithItem',
      globalSetup: path.resolve(__dirname, './tests/globalSetup.js'),
      testMatch: [
        /.*cartWithItemsSaveState\.spec\.js$/,   // Этот тест создает сохраненное состояние
      ],
      use: {
        // Не указываем storageState, так как cartWithItemsSaveState должен создать файл
      },
    },
    {
      name: 'cartWithSavedState', // Проект для тестов, которые используют сохраненное состояние
      globalSetup: path.resolve(__dirname, './tests/globalSetup.js'),
      testMatch: [
        /.*removeItems_visualUser.*\.spec\.js$/,
      ],
      use: {
        storageState: './auth/cart-storage.json',
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
