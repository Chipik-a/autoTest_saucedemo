import { test, expect } from '@playwright/test'
import { HomePage } from '../../../pages/homePage'
import { testUsers } from '../../../data/userData'

test.skip('log In', async ({ page }) => {
  const homePage = new HomePage(page)
  const { email, password } = testUsers.standardUser

  await homePage.goto('/')
  await homePage.login(email, password)

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

  console.log(
    `User with email ${testUsers.standardUser.email} and password ${testUsers.standardUser.password} was logged in`,
  )
})
