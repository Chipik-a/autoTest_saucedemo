import { test, expect } from '@playwright/test'
import { ProductsPage } from '../pages/productsPage'

test('Add One Item To Cart', async ({ page }) => {
  const productsPage = new ProductsPage(page)
  await productsPage.goto('https://www.saucedemo.com/inventory.html')

  await productsPage.addToCartByIndex(0)

  // checking the visibility of the product in the basket
  await expect(productsPage.cartWithItems).toBeVisible({ timeout: 10000 })
  console.log('add one item to cart')
})

test('Add A Few Item To Cart', async ({ page }) => {
  const productsPage = new ProductsPage(page)
  await productsPage.goto('https://www.saucedemo.com/inventory.html')

  await productsPage.addMultipleItemsToCart([0, 1, 2, 0, 1])

  const cartCount = await productsPage.cartWithItems.textContent()

  expect(cartCount).toEqual('4')
})
