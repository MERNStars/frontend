/// <reference types="Cypress" />

import { wait } from "@testing-library/react";

context("Testing contact form",() => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/contact');
    })
})