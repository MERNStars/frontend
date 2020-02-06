/// <reference types="Cypress" />

import { wait } from "@testing-library/react";




  context("tests admin login component", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    })


    it("Logins and returns a token from backend server", () => {
        cy.get('[type="text"]').type("test@test.com")
        cy.get('[type="password"]').type("leveleight")

        cy.get('.form_SubmitButton__1Fwci').click().wait(1000).should(() => {
            expect(localStorage.getItem('weexplore_token')).to.exist
          })

        wait(1000)

        cy.get('.notification').click()
        cy.get('.simple').click()
        cy.get('a > div > .ui').click()
    })

    it("tests if error message is returned when incorrect login details is used", () => {
        cy.get('[type="text"]').type("test@test.com")
        cy.get('[type="password"]').type("fakepassword")
        cy.get('.form_SubmitButton__1Fwci').click()
        wait(1000)
        cy.get('.title').contains("Incorrect Email or Password, Please try again").should("be.visible")
    }
    )

    it("logins in with normal users details and admin tab should not be visible", () => {
        cy.get('[type="text"]').type("test@test.com")
        cy.get('[type="password"]').type("leveleight")

        cy.get('.form_SubmitButton__1Fwci').click()

        wait(1000)
       
        cy.get('.right > :nth-child(5)').should('not.exist')
    })

    it("logins and logs out the account and checks if token has been removed", () => {
        cy.get('[type="text"]').type("test@test.com")
        cy.get('[type="password"]').type("leveleight")
        cy.get('.form_SubmitButton__1Fwci').click()
        wait(1000)
        cy.get('.notification').click()
        cy.get('.simple').click()
        cy.get('a > div > .ui').click()
    })

    it("Logins with admin details and shows admin tab in DOM", () => {
        cy.get('[type="text"]').type("christophertri90@gmail.com")
        cy.get('[type="password"]').type("leveleight")
        cy.get('.form_SubmitButton__1Fwci').click()
        wait(1000)
        cy.get('.right > :nth-child(5)').should("be.visible")
        cy.get('.notification').click()
        cy.get('.simple').click()
        cy.get('a > div > .ui').click()
    })
    

    
  })