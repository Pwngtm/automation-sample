const errorMessage = require("../../fixtures/errorMessage.json");

describe("Gmail Login Test", () => {
  beforeEach(() => {
    // Visit the Gmail login page
    cy.visit("https://mail.google.com/");
  });

  it("Verify that user should be successfully logged in with valid credentials", () => {
    // Enter valid email and password
    cy.get("#identifierId").type(Cypress.env("validUserName"));
    cy.get("#identifierNext").click();
    cy.get('input[name="password"]').type(Cypress.env("validPassword"));
    cy.get("#passwordNext").click();
    cy.wait(1000);

    // Then assert the user is logged in, verify inbox
    cy.url().should("include", "/#inbox");

    // And perform one more check for compose button
    cy.get("button").contains("Compose").should("be.visible");
  });

  it("Verify that error message is with invalid username", () => {
    // Enter invalid username
    cy.get("#identifierId").type(Cypress.env("invalidUserName"));
    cy.get("#identifierNext").click();
    cy.wait(1000);

    // Assert the error message is displayed
    cy.contains(errorMessage.invalidUserName).should("be.visible");
  });

  it("Verify that error message is with invalid password", () => {
    // Enter valid username
    cy.get("#identifierId").type(Cypress.env("validUserName"));
    cy.get("#identifierNext").click();

    // Enter invalid password
    cy.get('input[name="password"]').type(Cypress.env("invalidPassword"));
    cy.get("#passwordNext").click();
    cy.wait(1000);

    // Assert the error message is displayed
    cy.contains(errorMessage.invalidPassword).should("be.visible");
  });
});
