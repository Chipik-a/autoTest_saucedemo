export class HomePage {
  constructor(page) {
    this.page = page
    this.username = page.getByPlaceholder('Username')
    this.password = page.getByPlaceholder('Password')
    this.buttonLogin = page.locator('#login-button')
    this.errorMessage = page.locator('h3[data-test="error"]')
  }

  async goto(url) {
    await this.page.goto(url)
  }

  async login(email, password) {
    await this.username.fill(email)
    await this.password.fill(password)
    await this.buttonLogin.click()
  }
}
