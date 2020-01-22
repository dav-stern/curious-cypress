// / <reference types="Cypress" />

context( `User ${email} creation and interaction`, () => {
  before( () => {
    cy.visit( Cypress.config( 'defaultPage' ) );
  } );

  context( 'User creation', () => {
    it( 'User should be created', () => {
      cy.get( 'h1' ).isInside( 'viewport', true );
    } );

  } );
  
} );