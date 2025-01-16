import { test, expect } from '@playwright/test'
import { ProductsPage } from '../pages/productsPage'

test('Add One Item To Cart', async ({ page }) => {
  // // Загружаем сохранённое состояние
  // const storageStatePath = path.resolve('./auth/auth-storage.json')
  // const storageState = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'))
  //
  // // Добавляем cookies из storageState
  // await page.context().addCookies(storageState.cookies)

  const productsPage = new ProductsPage(page)
  await productsPage.goto('https://www.saucedemo.com/inventory.html')

  await productsPage.addToCartByIndex(0)

  // Проверка видимости корзины
  await expect(productsPage.cartWithItems).toBeVisible({ timeout: 10000 })
  console.log('add one item to cart')
})

// test ('Add A Few Item To Cart', async ({  }) => {
//
// })
