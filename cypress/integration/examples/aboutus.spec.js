/// <reference types="Cypress" />

import { wait } from "@testing-library/react";

context("Tests about us page", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it("goes to about us page from home page", () => {
        cy.contains("About Us")
        cy.get('.right > :nth-child(2)').click()
        expect(cy.get('.aboutus_section__2DDVa > :nth-child(1)')).to.exist
    })

})