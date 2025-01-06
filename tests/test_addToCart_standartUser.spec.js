import { test, expect } from '@playwright/test'
import { ProductsPage } from '../pages/productsPage'
import fs from 'fs'
import path from 'path'

test('Add Item To Cart', async ({ page }) => {
  // Загружаем сохранённое состояние
  const storageStatePath = path.resolve('./auth/auth-storage.json')
  const storageState = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'))

  // Добавляем cookies из storageState
  await page.context().addCookies(storageState.cookies)

  // Переход на страницу с товарами
  const productsPage = new ProductsPage(page)
  await productsPage.goto('https://www.saucedemo.com/inventory.html')

  await productsPage.buttonAddToCart.click()

  // Проверка видимости корзины
  await expect(productsPage.cartWithItems).toBeVisible({ timeout: 10000 })
  console.log(
    'товар добавлен, но название кнопки конкретное, надо обобзенное сделать',
  )
})
