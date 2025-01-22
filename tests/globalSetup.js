// @ts-check
const { chromium } = require('@playwright/test');
const { testUsers } = require('../data/userData.js');
const path = require('path');
const ProductsPage = require('../pages/productsPage');
const { logInAndSaveState, addItemsToCart } = require('../utils/cartUtils');

const storageState = path.resolve('./auth/auth-storage.json');
const cartStorageState = path.resolve('./auth/cart-storage.json');

async function globalSetup() {

  const browser = await chromium.launch();

  const context1 = await browser.newContext();
  const page1 = await context1.newPage();
  await logInAndSaveState(page1, testUsers.standardUser.email, testUsers.standardUser.password, storageState);
  console.log(`Storage state saved successfully to: ${storageState}`);

  await context1.close();

  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  const productsPage = new ProductsPage(page2);

  try {
    // Проверяем, существует ли директория
    const dirPath = path.dirname(cartStorageState);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, {recursive: true}); // Создаём директорию
    }

    await logInAndSaveState(page2, testUsers.visualUser.email, testUsers.visualUser.password, cartStorageState);
    await addItemsToCart(productsPage, [0, 2]);
    await page2.context().storageState({path: cartStorageState});

    await context2.close();
    await browser.close();
  } catch (error) {
    console.error(`Ошибка в globalSetup: ${error.message}`);
  }
}

module.exports = globalSetup;
