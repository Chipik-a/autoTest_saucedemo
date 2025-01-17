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
    for (const index of indices) {
      const button = this.buttonAddToCart.nth(index)
      await button.scrollIntoViewIfNeeded()

      // Ждем, пока кнопка не станет видимой
      await button.waitFor({ state: 'visible' })

      // Кликаем по кнопке
      await button.click()

      // const isButtonVisible = await button.isVisible();
      // if (!isButtonVisible) {
      //   await page.evaluate(() => window.scrollBy(0, -window.innerHeight)); // Прокрутка вверх
      //   await button.scrollIntoViewIfNeeded();
      //   await button.waitFor({ state: 'visible' });
      //   await button.click();
      // }

      //await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));

      // await this.buttonAddToCart.nth(index).scrollIntoViewIfNeeded()
      // await this.buttonAddToCart.nth(index).waitFor({ state: 'visible' });
      //
      // await this.buttonAddToCart.nth(index).click()
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
