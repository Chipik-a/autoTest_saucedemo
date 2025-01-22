import {test, expect} from "@playwright/test";
import ProductsPage from "../pages/productsPage";


test('Add and remove items from the cart', async ({ page}) => {
    const productsPage = new ProductsPage(page)
    await productsPage.goto('https://www.saucedemo.com/inventory.html')

    const isVisible = await productsPage.cartWithItems.isVisible()
    expect(isVisible).toBe(true)

    const cartCount = await productsPage.cartWithItems.textContent()
    const initialCount = parseInt(cartCount)

    await productsPage.removeFromCart.click()

    const cartCountText = await productsPage.cartWithItems.textContent()
    const newCount = parseInt(cartCountText)

    expect(newCount).toBe(initialCount - 1)
})

