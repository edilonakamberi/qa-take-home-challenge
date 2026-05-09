import { expect, Locator, Page } from "@playwright/test";

export type ContactCardDetails = {
  name: string;
  email: string;
  phone: string;
  department: string;
};

export class ContactPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly pageURL: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator; 
    readonly contactList: Locator;
    readonly noResults: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
      
      // Page elements
      this.page = page;
      this.pageTitle = page.locator('h1:has-text("Contacts")');
      // Search elements
      this.searchInput = page.locator('#searchInput');
      this.searchButton = page.locator('#searchBtn');
      // Contact list elements
      this.contactList = page.locator('#contactList > .contact-card');
      this.noResults = page.locator('#noResults').filter({ hasText: 'No contacts found.' });
      // Logout button elements
      this.logoutButton = page.locator('button:has-text("Logout")');
    }

    async getPageTitle() {
      expect.soft(await this.pageTitle.textContent()).toContain('Contacts');  // returns the text "Contacts"  
    }

    async clickLogoutButton() {
      await this.logoutButton.click();
    }
    
    async searchContacts(query: string) {
      await this.searchInput.fill(query);
      await this.searchButton.click();
    }

    async expectContactCards(expected: ContactCardDetails[]) {
      await expect(this.contactList).toHaveCount(expected.length);
      for (let i = 0; i < expected.length; i++) {
        const card = this.contactList.nth(i);
        const e = expected[i];
        await expect(card.locator("h3")).toHaveText(e.name);
        await expect(card.locator(".details")).toHaveText(`${e.email} · ${e.phone}`);
        await expect(card.locator(".dept")).toHaveText(e.department);
      }
    }

    async expectNoResults() {
      await expect(this.noResults).toBeVisible();
    }
    
  }
