module.exports = {
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  // env: {
  //   browser: true,
  //   node: true,
  // },
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    headless: false,
    screenshot: { mode: 'only-on-failure', fullPage: true },
  },
  projects: [
    {
      name: 'setup',
      testDir: './test/e2e',
      testMatch: '**/login.spec.js',
    },
    {
      name: 'test',
      testDir: './tests/e2e/',
      dependencies: ['setup'],
      // use:{
      //   storageState: './auth/visual_user.json'
      // }
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://cat-fact.herokuapp.com/',
      },
    },
  ],

  // projects: [
  //   {
  //     name: 'loggedState',
  //     globalSetup: path.resolve('./tests/globalSetup.js'),
  //     testDir: path.resolve('./tests/login'),
  //     // testMatch: [
  //     //   /.*addToCart_standardUser.*\.spec\.js$/,
  //     //   /.*sortByName_standardUser.*\.spec\.js$/,
  //     //   /.*addRemoveItems_standardUser.*\.spec\.js$/,
  //     //   /.*loginSaveState.*\.spec\.js$/,
  //     // ],
  //     testMatch: '*.spec.js',
  //     use: {
  //       storageState: path.resolve(__dirname, './auth/auth-storage.json'),
  //     },
  //   },
  // {
  //   name: 'cartWithItem',
  //   globalSetup: path.resolve(__dirname, './tests/globalSetup.js'),
  //   testMatch: [
  //     /.*cartWithItemsSaveState\.spec\.js$/,   // Этот тест создает сохраненное состояние
  //   ],
  //   use: {
  //     // Не указываем storageState, так как cartWithItemsSaveState должен создать файл
  //   },
  // },
  // {
  //   name: 'cartWithSavedState', // Проект для тестов, которые используют сохраненное состояние
  //   globalSetup: path.resolve(__dirname, './tests/globalSetup.js'),
  //   testMatch: [
  //     /.*removeItems_visualUser.*\.spec\.js$/,
  //   ],
  //   use: {
  //     storageState: './auth/cart-storage.json',
  //   },
  // },
  // {
  //   name: 'noAuth',
  //   testMatch: [
  //     /.*login_lockedUser.*\.spec\.js$/,
  //     /.*login_standardUser.*\.spec\.js$/,
  //   ],
  //   use: {
  //     baseURL: 'https://www.saucedemo.com/',
  //   },
  // },
  // ],
}
