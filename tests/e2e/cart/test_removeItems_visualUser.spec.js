import { test, expect } from '@playwright/test'
import ProductsPage from '../../../pages/productsPage'

test.use({ storageState: './auth/visual_user.json' })

test('Add and remove items from the cart', async ({ page }) => {
  const productsPage = new ProductsPage(page)
  await productsPage.goto('/inventory.html')

  await expect(await productsPage.cartWithItems).toBeHidden()

  // const cartCount = await productsPage.cartWithItems.textContent()
  // const initialCount = parseInt(cartCount)
  //
  // await productsPage.removeFromCart.click()
  //
  // const cartCountText = await productsPage.cartWithItems.textContent()
  // const newCount = parseInt(cartCountText)
  //
  // expect(newCount).toBe(initialCount - 1)
})
