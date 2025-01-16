export class ProductsPage {
  constructor(page) {
    this.page = page
    this.itemTitle = page.locator('.inventory_item_name')
    this.sortContainer = page.locator('[data-test="product-sort-container"]')
    this.itemPrice = page.locator('.inventory_item_price ')
    this.buttonAddToCart = page.getByRole('button', { name: 'Add to cart' })
    // this.buttonAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    this.cartWithItems = page.locator('.shopping_cart_badge')
  }

  async goto(url) {
    await this.page.goto(url)
  }

  async addToCartByIndex(index) {
    await this.buttonAddToCart.nth(index).click()
  }

  //   async addToCartByIndex(index) {
  //     // Проверяем, есть ли кнопки "Add to cart"
  //     const count = await this.buttonAddToCart.count();
  //     if (index >= count) {
  //       throw new Error(`Индекс ${index} выходит за пределы доступных кнопок: ${count}`);
  //     }
  //     await this.buttonAddToCart.nth(index).click();
  //   }
  // }

  // async addItemToCart() {
  // await this.buttonAddToCart.click()
  // }

  async sortByName(order = 'za') {
    await this.sortContainer.waitFor({ state: 'visible' })

    await this.sortContainer.selectOption({ value: order })
  }

  async getProductNames() {
    return await this.itemTitle.allTextContents()
  }
}
