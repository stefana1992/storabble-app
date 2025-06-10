export const loginForm = {

    validCredentials: {
        email: 'tomic.stefana92@gmail.com',
        password: 'StPass0210!',
    },

    //Invalid credentials for negative tests
    invalidCredentials: {
        email: 'test@example.com',
        password: 'WrongPass0210!',
    },

    //Error messages for vaious scenarios
    errorMessages: {
        invalidEmail: 'Please enter a valid email address.',
        invalidPassword: 'Your password is incorrect.',
        emptyEmailOrPassword: 'This field is required.',
    }
}