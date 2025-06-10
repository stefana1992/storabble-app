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

    // Test 1: Invalid credentials (invalid email and invalid password)
    test('User should not be able to log in with invalid email and password', async () => {
        await loginPage.fillEmail(loginForm.invalidCredentials.email);
        await loginPage.fillPassword(loginForm.invalidCredentials.password);
        await loginPage.clickLogin();
        await loginPage.verifyLoginErrorMessages(loginForm.errorMessages.invalidEmail, loginForm.errorMessages.invalidPassword);
    });

    // Test 2: Valid email and invalid password
    test('User should not be able to log in with a valid email and invalid password', async () => {
        await loginPage.fillEmail(loginForm.validCredentials.email);
        await loginPage.fillPassword(loginForm.invalidCredentials.password)
        await loginPage.clickLogin();
        await loginPage.verifyLoginErrorMessages(loginForm.errorMessages.invalidEmail, loginForm.errorMessages.invalidPassword);
    });

    // Test 3: Invalid email and valid password
    test('User should not be able to log in with an invalid email and valid password', async () => {
        await loginPage.fillEmail(loginForm.invalidCredentials.email);
        await loginPage.fillPassword(loginForm.validCredentials.password)
        await loginPage.clickLogin();
        await loginPage.verifyLoginErrorMessages(loginForm.errorMessages.invalidEmail, loginForm.errorMessages.invalidPassword);
    });

    // Test 4: Valid email and empty password
    test('User should not be able to log in with a valid email and empty password', async () => {
        await loginPage.fillEmail(loginForm.validCredentials.email);
        await loginPage.clickLogin();
        await loginPage.verifyPasswordErrorMessageVisibility(loginForm.errorMessages.emptyEmailOrPassword);
    });

    // Test 5: Empty email and valid password
    test('User should not be able to log in with empty email and valid password', async () => {
        await loginPage.fillPassword(loginForm.validCredentials.password);
        await loginPage.clickLogin();
        await loginPage.verifyEmailErrorMessageVisibility(loginForm.errorMessages.emptyEmailOrPassword);
    });

    // Test 6: Empty email and password fields
    test('User should not be able to log in when required fields are left empty', async () => {
        await loginPage.clickLogin();
        await loginPage.verifyLoginErrorMessages(loginForm.errorMessages.emptyEmailOrPassword, loginForm.errorMessages.emptyEmailOrPassword);
    });
});

test.describe('Positive Test Cases for Login', () => {
       let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.acceptCookie();
    });

    // Test 1: Valid credentials (correct email and password)
    test('User should be able to log in with valid credentials', async () => {
        await loginPage.fillEmail(loginForm.validCredentials.email);
        await loginPage.fillPassword(loginForm.validCredentials.password);
        await loginPage.clickLogin();

        //Expect the My Storabble listings page to be visible after a successful login
        await loginPage.verifyRedirectedToMyStorageListingsPage();
    });

    // Test 2: Verify that user can access the forgot password page
    test('User should be able to access the forgot password page', async()=>{
        await loginPage.navigateToForgotPasswordPage();
        await loginPage.verifyResetPasswordButtonVisibility(); 
    });
});