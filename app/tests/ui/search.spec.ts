import { test } from '@playwright/test';
import { App } from '../../pages/App';

test.describe("Search Page Tests", () => {

    let cloudya: App;
  
    test.beforeEach(async ({ page }) => {
      cloudya = new App(page);
      await page.goto("/");
    });

    test('search existing contact', async ({ page }) => {          
        // Login
        await cloudya.LoginPage.login('admin@cloudya.com', 'Test1234!');

        // Search for existing contact
        await cloudya.ContactPage.searchContacts('Anna Schmidt');
        await cloudya.ContactPage.expectContactCards([
            {
                name: 'Anna Schmidt',
                email: 'anna.schmidt@nfon.com',
                phone: '+49 170 1234567',
                department: 'Engineering',
            },
        ]);
    });

    test('search non-existing contact', async ({ page }) => {

        // Login
        await cloudya.LoginPage.login('admin@cloudya.com', 'Test1234!');    

        // Search for non-existing contact
        await cloudya.ContactPage.searchContacts('non-existing contact');    
        await cloudya.ContactPage.expectNoResults();
    }); 
});

