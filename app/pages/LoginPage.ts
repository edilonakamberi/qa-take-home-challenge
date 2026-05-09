import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly errorMessage: Locator;
   
    constructor(page: Page) {
      this.page = page; // page object
      this.emailInput = page.locator('#email'); 
      this.passwordInput = page.locator('#password'); 
      this.signInButton = page.locator('button:has-text("Sign In")'); 
      this.errorMessage = page.locator('.error-msg'); 
    }

    async fillEmailInput(email: string) {
        await this.emailInput.fill(email);
    }
    
    async fillPasswordInput(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.signInButton.click();
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
    
    async expectErrorMessage(text: string) {
        await expect.soft(this.errorMessage).toHaveText(text);
    }
}
