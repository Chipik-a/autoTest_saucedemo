import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/homePage'
import { testUsers } from '../../data/userData'
import path from 'node:path'

const users = [testUsers.standardUser, testUsers.visualUser]

for (const user of users) {
  // if (await yourFunc) test.skip()

  test(`log In for ${user.email}`, async ({ page }) => {
    const homePage = new HomePage(page)
    const { email, password } = user

    await homePage.goto('/')
    await homePage.login(email, password)

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html') // need to check some element

    // TODO create check for file exist and add date key with value and check date time less than 5 min for example

    //fs.sync
    await page
      .context()
      .storageState({
        path: path.join(__dirname, `../auth/${user.email}.json`),
      })
  })
}
