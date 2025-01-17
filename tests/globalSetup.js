// @ts-check
const { chromium } = require('@playwright/test')
const { testUsers } = require('../data/userData.js')
const path = require('path')
//const fs = require('fs')

const storageState = path.resolve('./auth/auth-storage.json')

async function globalSetup() {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  const { email, password } = testUsers.standardUser

  await page.goto('https://www.saucedemo.com')

  await page.fill('[placeholder="Username"]', email)
  await page.fill('[placeholder="Password"]', password)
  await page.click('#login-button')

  await page.waitForURL('https://www.saucedemo.com/inventory.html')

  await page.context().storageState({ path: storageState })
  console.log(`Storage state saved successfully to: ${storageState}`)

  await browser.close()
}

module.exports = globalSetup
