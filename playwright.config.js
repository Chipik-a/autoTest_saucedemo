// import { defineConfig, devices } from '@playwright/test';
const path = require('path')
//const { defineConfig, devices } = require('@playwright/test');

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

  // Настройка глобального setup для авторизации
  //globalSetup: path.resolve(__dirname, './tests/globalSetup.js'),

  // Множество проектов с настройками для разных браузеров
  projects: [
    {
      name: 'loggedState',
      globalSetup: path.resolve('./tests/globalSetup.js'),
      testMatch: ['/addToCart_*\\.spec\\.js/', '/SortByName_*\\.spec\\.js/'],
      use: {
        baseURL: 'https://www.saucedemo.com/',
        storageState: path.resolve(__dirname, './auth/auth-storage.json'), // Путь для loggedState
      },
    },
    {
      name: 'noAuth',
      testMatch: ['/login_*\\.spec\\.js/', '**/*.spec.js'],
      testIgnore: ['/addToCart_*\\.spec\\.js/', '/SortByName_*\\.spec\\.js/'],
      use: {
        baseURL: 'https://www.saucedemo.com/',
      },
    },
  ],
}
