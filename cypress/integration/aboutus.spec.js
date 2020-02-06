/// <reference types="Cypress" />

import { wait } from "@testing-library/react";

context("Tests about us page", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it("goes to about us page from home page", () => {
        cy.contains("About Us")
        cy.get('.right > :nth-child(2)').click().wait(1000).should(() => {
            expect(cy.contains("Services")).to.exist
        })
    })

    it("goes to about page and clicks the contact us button", () => {
        cy.get('.right > :nth-child(2)').click().wait(1000).should(() => {
            expect(cy.contains("Services")).to.exist
        })

        cy.get(':nth-child(1) > .content > a > #aboutus_list__1q9JL').click().wait(500).should(() => {
            expect(cy.get('.form_contactForm__2EOET')).to.exist
        })
        
    })


})