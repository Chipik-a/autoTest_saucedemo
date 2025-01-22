import {expect, test} from '@playwright/test';
import fs from 'fs';
import path from 'node:path';

test('Check if storage state file exists and load it', async ({ page }) => {
    // Путь к файлу состояния
    const storageStatePath = path.resolve('./auth/auth-storage.json');

    // Проверяем, существует ли файл состояния
    if (!fs.existsSync(storageStatePath)) {
        console.log("Файл состояния не найден, убедитесь, что он был сохранен в globalSetup.");
        // Для теста можно бросить ошибку, чтобы показать, что файл не найден
        throw new Error("Файл состояния не найден!");
    } else {
        console.log(`Состояние успешно загружено из: ${storageStatePath}`);

        // Прочитаем и выведем содержимое файла для проверки
        const storageState = fs.readFileSync(storageStatePath, 'utf-8');
        console.log("Содержимое файла состояния:", storageState);

        // Добавляем cookies из файла состояния
        const parsedState = JSON.parse(storageState);
        await page.context().addCookies(parsedState.cookies);

        // Дополнительно можно проверить, что cookies были добавлены и страница загружается корректно
        await page.goto('https://www.saucedemo.com/inventory.html');
        await page.waitForLoadState('domcontentloaded');  // Подождем, пока страница не будет готова

        // Проверяем, что URL страницы соответствует ожидаемому
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }
});
