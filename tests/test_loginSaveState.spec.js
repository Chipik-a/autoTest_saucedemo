import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { testUsers } from '../data/userData'
import path from 'node:path'

test('logIn and save state', async ({ page }) => {
  const homePage = new HomePage(page)
  const { email, password } = testUsers.standardUser

  await homePage.goto('/')
  await homePage.login(email, password)

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

  const storageStatePath = path.resolve('./auth/auth-storage.json')

  await page.context().storageState({ path: storageStatePath })
  console.log(`Storage state saved to: ${storageStatePath}`)
})
