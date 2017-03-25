import steps from "../steps/actionSteps"

export class LoginPage {

    //Elements
    welcomeText = "div.login-header";
    emailField = "input[name='email']";
    passwordField = "input[name='password']";
    loginButton = "button[name='login']";
    signUpButton = ".login-footer a";
    url = "/login";

    //Methods

    login(login, password) {
        steps.navigateTo(this.url);
        steps.enterText(this.emailField, login);
        steps.enterText(this.passwordField, password);
        browser.click(this.loginButton);
    }
}



