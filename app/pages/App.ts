import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { ContactPage } from "./ContactPage";

export class App {

    protected page: Page;
    constructor(page: Page) {

        this.page = page;
    }

    public get LoginPage() {
        return new LoginPage(this.page);
    }

    public get ContactPage() {
        return new ContactPage(this.page);
    }
}