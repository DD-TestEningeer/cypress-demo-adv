# cypress-demo-adv
# 🚀 Step 1 — Create base project folder

```powershell
mkdir cypress-web-automation
cd cypress-web-automation
npm init -y
```

---

# 🚀 Step 2 — Install dependencies

```powershell
npm install --save-dev cypress cypress-mochawesome-reporter mochawesome mochawesome-merge marge cypress-terminal-report fs-extra cypress-grep

```

---

# 🚀 Step 3 — Create folder structure

```powershell
mkdir cypress\e2e
mkdir cypress\fixtures
mkdir cypress\pages
mkdir cypress\support
mkdir scripts
```

Now you’ll have:

```
cypress-web-automation/
  cypress/
    e2e/
    fixtures/
    pages/
    support/
  scripts/
  package.json
```

---

# 🚀 Step 4 — Add starter fixture

`cypress/fixtures/users.json`

```json
{
  "validUser": { "username": "admin", "password": "password123" },
  "invalidUser": { "username": "wrong", "password": "wrongpass" }
}
```

---

# 🚀 Step 5 — Add Page Object

`cypress/pages/LoginPage.js`

```javascript
class LoginPage {
  elements = {
    username: () => cy.get('#username'),
    password: () => cy.get('#password'),
    loginBtn: () => cy.get('#loginBtn')
  }

  login(user, pass) {
    this.elements.username().clear().type(user);
    this.elements.password().clear().type(pass);
    this.elements.loginBtn().click();
  }
}

module.exports = new LoginPage();
```

---

# 🚀 Step 6 — Add custom command

`cypress/support/commands.js`

```javascript
Cypress.Commands.add("login", (user, pass) => {
  cy.get("#username").clear().type(user);
  cy.get("#password").clear().type(pass);
  cy.get("#loginBtn").click();
});
```

---

# 🚀 Step 7 — Add support entry file

`cypress/support/e2e.js`

```javascript
import "./commands";
import "cypress-mochawesome-reporter/register";
```

---

# 🚀 Step 8 — Add sample E2E test

`cypress/e2e/login.cy.js`

```javascript
const LoginPage = require("../pages/LoginPage");

describe("Login flows", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("logs in with valid user (POM)", () => {
    LoginPage.login("admin", "password123");
    cy.contains("Dashboard").should("be.visible");
  });

  it("shows error with invalid user (custom command)", () => {
    cy.login("wrong","wrongpass");
    cy.contains("Invalid username or password").should("be.visible");
  });

  it("logs in using fixture data", () => {
    cy.fixture("users").then(u => {
      LoginPage.login(u.validUser.username, u.validUser.password);
    });
    cy.contains("Dashboard").should("be.visible");
  });
});
```

---

# 🚀 Step 9 — Add Cypress config

`cypress.config.js`

```javascript
const { defineConfig } = require("cypress");
const fs = require("fs-extra");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    baseUrl: "http://localhost:3000", // change to your app URL
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    video: true,
    screenshotsFolder: "cypress/reports/screenshots",
    videosFolder: "cypress/reports/videos",

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      require("cypress-terminal-report/src/installLogsPrinter")(on);

      on("before:run", async () => {
        try { fs.removeSync("cypress/reports"); console.log("Cleaned reports"); }
        catch (e) {}
      });

      return config;
    }
  }
});
```

---

# 🚀 Step 10 — Add cleanup script

`scripts/cleanReports.js`

```javascript
const fs = require('fs-extra');
const path = 'cypress/reports';
if (fs.existsSync(path)) {
  fs.removeSync(path);
  console.log("🧹 Cleaned", path);
} else {
  console.log("No reports found.");
}
```

---

# 🚀 Step 11 — Add npm scripts

Open `package.json` → add:

```json
"scripts": {
  "clean:reports": "node ./scripts/cleanReports.js",
  "cypress:open": "npx cypress open",
  "cypress:run": "npm run clean:reports && npx cypress run",
  "cypress:run:spec": "npx cypress run --spec",
  "report": "npx mochawesome-merge cypress/reports/html/*.json > cypress/reports/report.json && npx marge cypress/reports/report.json -o cypress/reports/html"
}
```

---

# 🚀 Step 12 — .gitignore

Create `.gitignore`:

```
node_modules/
cypress/reports/
cypress/screenshots/
cypress/videos/
.env
```

---

# ✅ Final Project Tree

```
cypress-web-automation/
│ package.json
│ cypress.config.js
│ .gitignore
│
├── cypress/
│   ├── e2e/
│   │   └── login.cy.js
│   ├── fixtures/
│   │   └── users.json
│   ├── pages/
│   │   └── LoginPage.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
│
└── scripts/
    └── cleanReports.js
```

---

# 🎯 Run the framework

* Open Cypress UI:

  ```powershell
  npm run cypress:open
  ```
* Run all tests headless (with logs, screenshots, videos, reports):

  ```powershell
  npm run cypress:run
  ```
* View merged report:

  ```powershell
  npm run report
  ii .\cypress\reports\html\report.html
  ```

---
