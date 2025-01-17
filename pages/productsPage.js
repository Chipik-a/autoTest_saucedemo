export class ProductsPage {
  constructor(page) {
    this.page = page
    this.itemTitle = page.locator('.inventory_item_name')
    this.sortContainer = page.locator('[data-test="product-sort-container"]')
    this.itemPrice = page.locator('.inventory_item_price ')
    this.buttonAddToCart = page.getByRole('button', { name: 'Add to cart' })
    this.cartWithItems = page.locator('.shopping_cart_badge')
  }

  async goto(url) {
    await this.page.goto(url)
  }

  async addToCartByIndex(index) {
    await this.buttonAddToCart.nth(index).click()
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
  }

  async sortByName(order = 'za') {
    await this.sortContainer.waitFor({ state: 'visible' })

    await this.sortContainer.selectOption({ value: order })
  }

  async getProductNames() {
    return await this.itemTitle.allTextContents()
  }
}
