import { test } from '@playwright/test';
import { App } from '../../pages/App';

test.describe("Login Page Tests", () => {

    let cloudya: App;
  
    test.beforeEach(async ({ page }) => {
      cloudya = new App(page);
      await page.goto("/");
    });

  test('successful login', async ({ page }) => {

   await cloudya.LoginPage.fillEmailInput('admin@cloudya.com');
   await cloudya.LoginPage.fillPasswordInput('Test1234!');
   await cloudya.LoginPage.clickLoginButton();

   await cloudya.ContactPage.getPageTitle();  // checks if the page title is "Contacts" and the user is redirected to the contact page
  });

  test('invalid login shows error', async ({ page }) => {

   await cloudya.LoginPage.fillEmailInput('admin@cloudya.com');
   await cloudya.LoginPage.fillPasswordInput('wrongpassword');   
   await cloudya.LoginPage.clickLoginButton();

   await cloudya.LoginPage.expectErrorMessage('Invalid credentials');
  });

})