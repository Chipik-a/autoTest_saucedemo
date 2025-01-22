const path = require('path');

async function logInAndSaveState(page, email, password, storageStatePath) {
    await page.goto('https://www.saucedemo.com')
    await page.fill('[placeholder="Username"]', email)
    await page.fill('[placeholder="Password"]', password)
    await page.click('#login-button')
    await page.waitForURL('https://www.saucedemo.com/inventory.html')

    await page.context().storageState({ path: storageStatePath })
    console.log(`Storage state saved successfully to: ${storageStatePath}`)
}

async function addItemsToCart(productsPage, indexes){
console.log(`Added to carts page: ${indexes}`)
    for (const index of indexes) {
        await productsPage.addToCartByIndex(index)
    }
    console.log(`Successfully added items: ${indexes}`)
}

module.exports = {
    logInAndSaveState,
    addItemsToCart,
};