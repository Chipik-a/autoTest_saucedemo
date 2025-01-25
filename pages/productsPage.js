export default class ProductsPage {
  constructor(page) {
    this.page = page
    this.itemTitle = page.locator('.inventory_item_name')
    this.sortContainer = page.locator('[data-test="product-sort-container"]')
    this.itemPrice = page.locator('.inventory_item_price ')
    this.buttonAddToCart = page.locator('.pricebar .btn_inventory')
    this.cartWithItems = page.locator('.shopping_cart_badge')
    this.removeFromCart = page.getByRole('button', { name: 'Remove' }).nth(1)
  }

  async scrollToTop() {
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.locator('body').evaluate((el) => el.scrollTo(0, 0))
  }

  async goto(url) {
    await this.page.goto(url)
  }

  async addToCartByIndex() {
    // const button = this.buttonAddToCart.nth(index)
    // await this.scrollToTop()
    // await button.scrollIntoViewIfNeeded()
    //
    // await button.waitFor({ state: 'visible' })
    // await button.click()

    await this.buttonAddToCart.click()
  }

  async addMultipleItemsToCart(indices) {
    const buttonCount = await this.buttonAddToCart.count()
    console.log(`Number of buttons found: ${buttonCount}`)

    for (const index of indices) {
      const button = this.buttonAddToCart.nth(index)
      console.log(`Trying to interact with button at index: ${index}`)

      try {
        const isVisible = await button.isVisible()

        if (isVisible) {
          console.log(
            `Button at index ${index} is visible, attempting to click...`,
          )
          await button.click()
          console.log(`Successfully clicked button at index: ${index}`)
        } else {
          console.warn(`Button at index ${index} is not visible`)
        }
      } catch (error) {
        console.error(
          `Failed to interact with button at index ${index}: ${error.message}`,
        )
      }
    }
    return buttonCount
  }

  async sortByName(order = 'za') {
    await this.sortContainer.waitFor({ state: 'visible' })

    await this.sortContainer.selectOption({ value: order })
  }

  async getProductNames() {
    return await this.itemTitle.allTextContents()
  }
}
