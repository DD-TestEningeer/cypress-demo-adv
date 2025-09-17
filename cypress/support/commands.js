Cypress.Commands.add("login", (username, password) => {
  cy.get("[name='username']").clear().type(username);
  cy.get("[name='password']").clear().type(password);
  cy.get(".oxd-button").click();
});
