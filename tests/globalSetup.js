import { chromium } from '@playwright/test'
import { testUsers } from '../data/userData'
import path from 'node:path'
import fs from 'fs'

const storageState = path.resolve('./auth/auth-storage.json')
console.log(`Storage state will be saved to: ${storageState}`)

async function globalSetup() {
  const dir = path.dirname(storageState)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`Directory created: ${dir}`)
  } else {
    console.log(`Directory already exists: ${dir}`)
  }

  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  const { email, password } = testUsers.standartUser

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
  await context.storageState({ path: storageState })
  console.log(`Storage state saved successfully to: ${storageState}`)

  console.log(`Сохранено состояние авторизации для пользователя ${email}`)

  await browser.close()
}

export default globalSetup
