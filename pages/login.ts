import { expect, Page, Locator } from '@playwright/test';


export class LoginPage {
    private page: Page;
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private cookieButton: Locator;
    private emailErrorMessage: Locator;
    private passwordErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = this.page.locator("#email");
        this.passwordInput = this.page.locator("#password");
        this.loginButton = this.page.locator("//button[@type='submit']");
        this.cookieButton = this.page.locator("//button[normalize-space()='Ok']");
        this.emailErrorMessage = this.page.locator("//span[contains(@class, 'invalid-msg')][1]");
        this.passwordErrorMessage = this.page.locator("//span[contains(@class, 'invalid-msg')][2]");
    }

    async navigateTo() {
        await this.page.goto('/en/login');
    }

    async acceptCookie() {
        await this.cookieButton.click();
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async verifyLoginErrorMessages(exectedEmailMessage: string, expectedPasswordMessage: string) {
        await this.verifyEmailErrorMessageVisibility(exectedEmailMessage);
        await this.verifyPasswordErrorMessageVisibility(expectedPasswordMessage);
    }

    async verifyEmailErrorMessageVisibility(expectedEmailMessage: string) {
        await expect(this.emailErrorMessage).toBeVisible();
        await expect(this.emailErrorMessage).toHaveText(expectedEmailMessage);
    }

    async verifyPasswordErrorMessageVisibility(expectedPasswordMessage: string) {
        await expect(this.passwordErrorMessage).toBeVisible();
        await expect(this.passwordErrorMessage).toHaveText(expectedPasswordMessage);
    }
}