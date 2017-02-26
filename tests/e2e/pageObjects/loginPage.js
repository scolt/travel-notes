export class LoginPage {

    //Elements
    welcomeText = "div.login-header";
    emailField = "input[name='email']";
    passwordField = "input[name='password']";
    loginButton = "button[name='login']";
    signUpButton = "div[data-reactid='.0.1.0.2.1']";

    //Methods
    navigateTo() {
        return browser.url('/login');
    }

    getWelcomeText() {
        return browser.getText(this.welcomeText);
    }

    enterEmail(email) {
        browser.setValue(this.emailField, email);
    }

    enterPassword(password) {
        browser.setValue(this.passwordField, password);
    }

    login(login, password) {
        this.enterEmail(login);
        this.enterPassword(password);
        browser.click(this.loginButton);
    }
}



