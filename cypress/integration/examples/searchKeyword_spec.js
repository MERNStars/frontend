/// <reference types="Cypress" />

describe( 'Testing search by keyword component', () => {
  it( 'Takes an input from the user and uses that to search through events and renders only events containing that keyword', () => {
    cy.visit('http://localhost:3000')
    const TESTWORD = "Gut"
    cy.contains( 'Events').click()
    cy.get('input').type( TESTWORD)
    cy.get('.events_eventContainer__1ATZ5').should( 'contain', TESTWORD )
    cy.screenshot('search-keyword-test')
  })
  it( 'Takes an input from the user and returns no events found response', () => {

    const TESTWORD = "qwerty"
    cy.visit('http://localhost:3000')
    cy.contains( 'Events').click()
    cy.get('input').type( TESTWORD)
    cy.get('.events_eventContainer__1ATZ5').should( 'contain', 'No events found' )
    
  })

  
})