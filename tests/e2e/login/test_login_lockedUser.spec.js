import { expect, test } from '@playwright/test'
import { HomePage } from '../../../pages/homePage'
import { testUsers } from '../../../data/userData'

test.skip('Log in - 2', async ({ page }) => {
  //test.slow()
  const homePage = new HomePage(page)
  const { email, password } = testUsers.lockedUser

  await homePage.goto('/')
  await homePage.login(email, password)

  await expect(homePage.errorMessage).toBeVisible()

  console.log(
    `User with email ${testUsers.lockedUser.email} and password ${testUsers.lockedUser.password} wasn't logged in`,
  )
})
