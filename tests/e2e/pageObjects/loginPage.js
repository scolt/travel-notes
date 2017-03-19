import steps from "../steps/actionSteps"

export class LoginPage {

    //Elements
    welcomeText = "div.login-header";
    emailField = "input[name='email']";
    passwordField = "input[name='password']";
    loginButton = "button[name='login']";
    signUpButton = "a[data-reactid='.0.1.0.2.1']";
    url = "/login";

    //Methods
    enterEmail(email) {
        browser.setValue(this.emailField, email);
    }

    enterPassword(password) {
        browser.setValue(this.passwordField, password);
    }

    login(login, password) {
        steps.navigateTo(this.url);
        this.enterEmail(login);
        this.enterPassword(password);
        browser.click(this.loginButton);
    }
}



