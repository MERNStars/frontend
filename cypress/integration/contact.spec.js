/// <reference types="Cypress" />

import { wait } from "@testing-library/react";

context("Testing contact form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/contact");
  });

  it("checks if form has rendered", () => {
    expect(cy.get(".form_contactForm__2EOET")).to.exist;
  });

  it("fills in the form and sends off an email with a success message", () => {
    cy.get("form > :nth-child(2)").type("Test");
    cy.get("#Email").type("test@test.com");
    cy.get("form > :nth-child(4)").type("this is a test");
    cy.get("#Text").type("this is a test message for testing purposes");
    cy.get('[type="submit"]')
      .click()
      .wait(2000)
      .should(() => {
        expect(cy.get("#events_contactSubmit__3IGd6")).to.exist;
      });
  });
});
