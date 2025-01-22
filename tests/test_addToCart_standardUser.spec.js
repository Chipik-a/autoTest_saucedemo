import { test, expect } from '@playwright/test'
import ProductsPage from '../pages/productsPage'

// test('All items can be added to the cart', async ({ page }) => {
//   const productsPage = new ProductsPage(page)
//   await productsPage.goto('https://www.saucedemo.com/inventory.html')
//
//   const buttonCount = await productsPage.buttonAddToCart.count()
//   console.log(`Number of buttons found ${buttonCount}`)
//
//   let cartCount = 0
//   await expect(productsPage.cartWithItems).toBeHidden()
//
//   for (let i = 0; i < buttonCount; i++) {
//     await productsPage.buttonAddToCart.nth(i).click()
//     console.log(`Clicked button at index: ${i}`)
//     await productsPage.scrollToTop()
//   }
//   await expect(cartCount).toEqual(buttonCount)
// })


test('Add One Item To Cart', async ({ page }) => {
  const productsPage = new ProductsPage(page)
  await productsPage.goto('https://www.saucedemo.com/inventory.html')

  await productsPage.addToCartByIndex(0)

  // checking the visibility of the product in the basket
  await expect(productsPage.cartWithItems).toBeVisible({ timeout: 10000 })
  console.log('add one item to cart')
})

// test('Add A Few Item To Cart', async ({ page }) => {
//   const productsPage = new ProductsPage(page)
//   await productsPage.goto('https://www.saucedemo.com/inventory.html')
//   await productsPage.addMultipleItemsToCart([0, 1, 2, 3, 4])
//   const cartCount = await productsPage.cartWithItems.textContent()
//
//   expect(cartCount).toEqual('5')
// })

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
