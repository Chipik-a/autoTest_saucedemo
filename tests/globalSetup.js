// @ts-check
const { chromium } = require('@playwright/test')
const { testUsers } = require('../data/userData.js')
const path = require('path')
const fs = require('fs')

const storageState = path.resolve('./auth/auth-storage.json')

async function globalSetup() {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  const { email, password } = testUsers.standardUser

  await page.goto('https://www.saucedemo.com')
  console.log('Страница загружена')

  await page.fill('[placeholder="Username"]', email)
  await page.fill('[placeholder="Password"]', password)
  await page.click('#login-button')
  console.log('Логин выполнен')

  await page.waitForURL('https://www.saucedemo.com/inventory.html')
  console.log('Переход на страницу товаров успешен')

  // Сохранение состояния в файл
  console.log(`Attempting to save storage state to: ${storageState}`)
  await page.context().storageState({ path: storageState })
  console.log(`Storage state saved successfully to: ${storageState}`)

  console.log(`Сохранено состояние авторизации для пользователя ${email}`)

  await browser.close()
}

console.log('File exists:', fs.existsSync(storageState))

module.exports = globalSetup // Используй module.exports вместо export default
