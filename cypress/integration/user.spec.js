/// <reference types="Cypress" />
import { wait } from "@testing-library/react";

context("users component", () => {
    it("creates a new account", () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#form_SignUpButton__We7WW').click()
        cy.get('form > :nth-child(1)').type(`test${Math.floor(Math.random() * 9999)}@test.com`)
        cy.get('form > :nth-child(2)').type("leveleight")
        cy.get('form > :nth-child(3)').type("leveleight")
        cy.get('form > :nth-child(4)').type("Test")  
        cy.get('form > :nth-child(5)').type("Test")  
        cy.get('.form_SmallInput__266Gu').type("25")  
        cy.get('#rw_1_input > .rw-widget-input > .rw-input').click().type("{downarrow}").wait(1000)
        cy.get('#rw_2_input > .rw-widget-input > .rw-input').click().type("{downarrow}").wait(1000)
        cy.get(':nth-child(9) > .form_Categories__2HsTY > .rw-widget-input > div').click().type("{downarrow}").wait(1000).type("{enter}").type("{esc}")
        cy.get('.form_NextButton__1m1ae').click()
        wait(2000)
    })
})