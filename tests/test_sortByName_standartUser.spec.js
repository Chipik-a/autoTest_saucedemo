import { expect, test } from '@playwright/test'
import { ProductsPage } from '../pages/productsPage'
import path from 'node:path'
import fs from 'fs'

test('Sort items by name Z-A', async ({ page }) => {
  const storageStatePath = path.resolve('./auth/auth-storage.json')
  const storageState = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'))

  await page.context().addCookies(storageState.cookies)

  const productsPage = new ProductsPage(page)
  await productsPage.goto('https://www.saucedemo.com/inventory.html')

  await productsPage.sortContainer.click()
  await productsPage.sortByName('za')

  const itemTitle = await page.locator('.inventory_item_name').allTextContents()
  console.log('Product Titles:', itemTitle)

  const productNames = await productsPage.getProductNames()
  console.log(productNames)
  const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a))
  expect(productNames).toEqual(sortedNames)
  console.log('Successful sort "ZA')
})
