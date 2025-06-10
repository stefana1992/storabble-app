import { test } from '@playwright/test'
import { LoginPage } from '../pages/login';
import { loginForm } from '../data/login-form';

test.describe('Negative test cases for login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.acceptCookie();
    });

    // Test 1: Invalid credentials (wrong email and password)
    test('User should not be able to log in with invalid email and password', async () => {
        await loginPage.fillEmail(loginForm.invalidCredentials.email);
        await loginPage.fillPassword(loginForm.invalidCredentials.password);
        await loginPage.clickLogin();
        await loginPage.verifyLoginErrorMessages(loginForm.errorMessages.invalidEmail, loginForm.errorMessages.invalidPassword);
    });
});