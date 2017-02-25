export class LoginPage {

    //Elements
    welcomeText = "div.login-header";
    emailField = "input[name='email']";
    passwordField = "input[name='password']";
    loginButton = "span[data-reactid='.0.1.0.1.2:$0.0.0.1.0']";
    signUpButton = "div[data-reactid='.0.1.0.2.1']";

    //Methods
    navigateTo() {
        return browser.url('/login');
    }

    getWelcomeText() {
        return browser.getText(this.welcomeText);
    }

    enterEmail(text) {
        browser.setValue(this.emailField, text);
    }

    enterPassword(text) {
        browser.setValue(this.passwordField, text);
    }
}



