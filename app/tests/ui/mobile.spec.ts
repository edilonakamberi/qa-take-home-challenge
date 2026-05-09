import { test } from '@playwright/test';
import { App } from '../../pages/App';

test.describe("Mobile Tests", () => {

    let cloudya: App;

    test.beforeEach(async ({ page }) => {
        cloudya = new App(page);
        await page.goto("/");
    });

    test('login works on mobile', async ({ page }) => {

       // Login
       await cloudya.LoginPage.login('user@cloudya.com', 'Welcome1!');

       // Check if the user is redirected to the contact page
       await cloudya.ContactPage.getPageTitle(); 
    });
});
