/// <reference types="Cypress" />

// Cypress.on( 'uncaught:exception', ( err, runnable ) => {
//   // returning false here prevents Cypress from
//   // failing the test
//   return false;
// } );

var faker = require( 'faker' );

const user = {
  name:faker.name.findName(),
  email:faker.internet.email(),
  password:faker.internet.password()
};

context( 'Login form behavior', () => {
  before( () => {
    cy.visit( Cypress.config( 'defaultPage' ) );
  } );
  
  it( 'Login tab should be selected', () => {
    cy.get( '.form-wrapper' )
      .find( '.form-header > :nth-child(1)' )
      .should( 'have.class', 'login-selector selected' );
    cy.get( '.form-wrapper' )
      .find( '.form-header > :nth-child(2)' )
      .should( 'not.have.class', 'login-selector selected' );
  } );
  it( 'Signup tab should properly select when clicking', () => {
    cy.get( '.form-wrapper' )
      .find( '.form-header > :nth-child(2)' )
      .click()
      .should( 'have.class', 'login-selector selected' );
    cy.get( '.form-wrapper' )
      .find( '.form-header > :nth-child(1)' )
      .should( 'not.have.class', 'login-selector selected' );
  } );
  it( 'Login tab should properly select when clicking', () => {
    cy.get( '.form-wrapper' )
      .find( '.form-header > :nth-child(1)' )
      .click()
      .should( 'have.class', 'login-selector selected' );
    cy.get( '.form-wrapper' )
      .find( '.form-header > :nth-child(2)' )
      .should( 'not.have.class', 'login-selector selected' );
  } );
  it( 'Should change the name of the submit button depending on the select tab', () => {
    cy.get( '.form-wrapper' )
      .find( '.submit' )
      .should( 'contain', 'Login' );
    cy.get( '.form-wrapper' )
      .find( '.form-header > :nth-child(2)' )
      .click();
    cy.get( '.form-wrapper' )
      .find( '.submit' )
      .should( 'contain', 'Sign Up' );
  } );

} );

context( 'Login and signup functionality', () => {
  before( () => {
    cy.visit( Cypress.config( 'defaultPage' ) );
  } );

  it( 'Should allow the signup and sign out a new user',  () => {
    cy.get( '.form-wrapper' )
      .find( '.form-header > :nth-child(2)' )
      .click();

    cy.get( '[name="name"]' )
      .type( user.name );
    
    cy.get( '[name="email"]' )
      .type( user.email );

    cy.get( '[name="password"]' )
      .type( user.password );
      
    cy.get( '.submit' )
      .click()
      .url( ).should( 'eq',`${Cypress.config( 'defaultPage' )}dashboard` );

    cy.get( '.navbar-container' )
      .find( '#js-menu' )
      .find( 'li:nth-child(3)' )
      .click()
      .url( ).should( 'eq',`${Cypress.config( 'defaultPage' )}login` );

  } );

  it( 'Should allow a user to login',  () => {
    
    cy.get( '[name="email"]' )
      .type( user.email );

    cy.get( '[name="password"]' )
      .type( user.password );
      
    cy.get( '.submit' )
      .click()
      .url( ).should( 'eq',`${Cypress.config( 'defaultPage' )}dashboard` );

  } );
  
} );
