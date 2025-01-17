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
  await productsPage.addMultipleItemsToCart([0, 1, 3])
  const cartCount = await productsPage.cartWithItems.textContent()

  expect(cartCount).toEqual('3')
})

// test('Inspect AddToCart buttons', async ({ page }) => {
//   const productsPage = new ProductsPage(page);
//   await productsPage.goto('https://www.saucedemo.com/inventory.html');
//
//   const buttons = await productsPage.buttonAddToCart;
//   const count = await buttons.count();
//   console.log('Number of buttons:', count);
//
//   for (let i = 0; i < count; i++) {
//     console.log(`Button ${i}:`, await buttons.nth(i).textContent());
//   }
// });
