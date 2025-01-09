export class ProductsPage {
  constructor(page) {
    this.page = page
    this.itemTitle = page.locator('[data-test="item_4_title_link"]')
    this.sortContainer = page.locator('[data-test="product-sort-container"]')
    this.itemPrice = page.locator('.inventory_item_price ').first()
    this.buttonAddToCart = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    )
    this.cartWithItems = page.locator('.shopping_cart_badge')
  }

  async goto(url) {
    await this.page.goto(url)
  }

  async addItemToCart() {
    await this.buttonAddToCart.click()
  }

  async sortByName(order = 'za') {
    await this.sortContainer.waitFor({ state: 'visible' })

    await this.sortContainer.selectOption({ value: order })
  }

  // async sortByName(order='za'){
  //   await this.sortContainer.selectOption({value: order})
  // }
}
