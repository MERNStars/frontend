/// <reference types="Cypress" />

describe( 'Testing category search filter', () => {
  it( 'Filtering through events and rendering only events within category selected', () => {
    cy.visit('http://localhost:3000')

    cy.contains( 'Events').click()
    cy.get('.fluid > .dropdown').type('{downarrow}{enter}')
    cy.get('.events_eventContainer__1ATZ5').should( 'contain', 'career seminar' )
  })
})