/// <reference types="Cypress" />

import { wait } from "@testing-library/react";

context("tests features on admin dashboard", () => {
  it("goes to the admin dashboard", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('[type="text"]').type("christophertri90@gmail.com");
    cy.get('[type="password"]').type("leveleight");
    cy.get(".form_SubmitButton__1Fwci")
      .click()
      .wait(2000);
    cy.visit("http://localhost:3000/admin").should(() => {
      expect(cy.contains("Admin Dashboard")).to.exist;
    });
  });

  it("Creates a new event", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('[type="text"]').type("christophertri90@gmail.com");
    cy.get('[type="password"]').type("leveleight");
    cy.get(".form_SubmitButton__1Fwci")
      .click()
      .wait(2000);
    cy.visit("http://localhost:3000/admin");
    cy.get("a.card").click();
    cy.get("form > :nth-child(1)").type("Test Event");
    cy.get("form > :nth-child(2)").type("This is a test event");
    cy.get("form > :nth-child(3)").type("2020-02-20");
    cy.get("form > :nth-child(4)").type("18:30");
    cy.get("form > :nth-child(5)").type("19:30");
    cy.get("form > :nth-child(6)").type("2020-02-18");
    cy.get(":nth-child(8) > .form_SmallInput__266Gu").type("18");
    cy.get(":nth-child(9) > .form_SmallInput__266Gu").type("50");
    cy.get(".rw-btn")
      .click()
      .type("{downarrow}");
    cy.get(".form_NextButton__1m1ae").click();
    cy.get(".rw-widget-input > div")
      .click()
      .type("{downarrow}")
      .wait(2000)
      .type("{enter}");
    cy.get('[type="submit"]').click();
    cy.get('[type="submit"]').click();
    cy.get(".ten > .secondary > :nth-child(2)").click();
    expect(cy.contains("Test Event")).to.exist;
  });

  it("deletes newly created event", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('[type="text"]').type("christophertri90@gmail.com");
    cy.get('[type="password"]').type("leveleight");
    cy.get(".form_SubmitButton__1Fwci")
      .click()
      .wait(2000);
    cy.visit("http://localhost:3000/admin");
    cy.get(".ten > .secondary > :nth-child(2)").click();
    cy.contains("Test Event");
    cy.get(":nth-child(2) > :nth-child(3) > :nth-child(2)").click();
    cy.get(".description > .ui").click();
    cy.wait(2000);
    cy.contains("Test Event").should("not.exist");
  });
});
