/// <reference types="Cypress" />


import { wait } from "@testing-library/react";

context("tests features on admin dashboard", () => {
    // beforeEach(() => {
    //     cy.visit('http://localhost:3000/login');
    //     cy.get('[type="text"]').type("christophertri90@gmail.com")
    //     cy.get('[type="password"]').type("leveleight")
    //     cy.get('.form_SubmitButton__1Fwci').click()
        
    // })

    it("goes to the admin dashboard",() => {
        cy.visit('http://localhost:3000/login');
        cy.get('[type="text"]').type("christophertri90@gmail.com")
        cy.get('[type="password"]').type("leveleight")
        cy.get('.form_SubmitButton__1Fwci').click().wait(2000)
        cy.visit('http://localhost:3000/admin'); 
    })


})