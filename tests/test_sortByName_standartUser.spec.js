import { test } from '@playwright/test'
import { ProductsPage } from '../pages/productsPage'
import path from 'node:path'
import fs from 'fs'

test('Sort items by name Z-A', async ({ page }) => {
  const storageStatePath = path.resolve('./auth/auth-storage.json')
  const storageState = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'))

  await page.context().addCookies(storageState.cookies)

  const productsPage = new ProductsPage(page)

  // Переход на страницу товаров
  await productsPage.goto('https://www.saucedemo.com/inventory.html')

  // Выполняем сортировку
  await productsPage.sortContainer.click()
  await productsPage.sortByName('za')
})
