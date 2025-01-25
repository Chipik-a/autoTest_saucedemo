import { test, expect } from '@playwright/test'
//import { HomePage } from '../pages/homePage';
import { testUsers } from '../../../data/userData'
//import path from 'node:path';
import ProductsPage from '../../../pages/productsPage'
import { addItemsToCart } from '../../../utils/cartUtils'

test.skip('Save cart state with items added', async ({ page }) => {
  // const homePage = new HomePage(page);
  const { email, password } = testUsers.visualUser
  const productsPage = new ProductsPage(page)

  await page.goto('https://www.saucedemo.com')
  await page.fill('[placeholder="Username"]', email)
  await page.fill('[placeholder="Password"]', password)
  await page.click('#login-button')
  await page.waitForURL('https://www.saucedemo.com/inventory.html')

  await addItemsToCart(productsPage, [0, 2]) // Добавляем товары по индексам 0 и 2

  const cartBadge = await page.locator('.shopping_cart_badge')
  const badgeText = await cartBadge.textContent()
  expect(Number(badgeText)).toBeGreaterThan(0) // Проверка, что товары в корзине

  const storageStatePath = './auth/cart-storage.json'
  await page.context().storageState({ path: storageStatePath })
  console.log(`Cart state saved to: ${storageStatePath}`)
})
