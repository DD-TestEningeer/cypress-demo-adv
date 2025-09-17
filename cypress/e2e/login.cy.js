const LoginPage = require("../pages/LoginPage");

describe("Login Tests", () => {

  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  });

  it("logs in with valid credentials (POM)", () => {
    LoginPage.login("admin", "admin123"); // calling methods 
    cy.contains("Dashboard").should("be.visible");
  });


  it("shows error for invalid credentials (custom command)", () => {
    cy.login("wrong", "wrongpass");
    cy.contains("Invalid credentials").should("be.visible");
  });


    /*
  it("logs in using fixture data", () => {
    cy.fixture("users").then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password); // test data
    });
    cy.contains("Dashboard").should("be.visible");
  });

  */
});
