import { expect, test } from '@playwright/test'
import ProductsPage from '../pages/productsPage'

test('Sort items by name Z-A', async ({ page }) => {
  const productsPage = new ProductsPage(page)
  await productsPage.goto('https://www.saucedemo.com/inventory.html')

  await productsPage.sortContainer.click()
  await productsPage.sortByName('za')

  const itemTitle = await page.locator('.inventory_item_name').allTextContents()
  console.log('Product Titles:', itemTitle)

  const productsNames = await productsPage.getProductNames()
  console.log(productsNames)
  const sortedNames = [...productsNames].sort((a, b) => b.localeCompare(a))
  expect(productsNames).toEqual(sortedNames)
  console.log('Successful sort "ZA')
})
