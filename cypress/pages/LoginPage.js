class LoginPage {
  elements = {
    usernameInput: () => cy.get('[name="username"]'),
    passwordInput: () => cy.get("[name='password']"),
    loginButton: () => cy.get('.oxd-button')
  };

  login(username, password) {
    this.elements.usernameInput().clear().type(username);
    this.elements.passwordInput().clear().type(password);
    this.elements.loginButton().click();
  }
}

module.exports = new LoginPage();
