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
  beforeEach( () => {
    cy.visit( Cypress.config( 'defaultPage' ) );
  } );
  
  // it( 'Login tab should be selected', () => {
  //   cy.get( '.form-wrapper' )
  //     .find( '.form-header > :nth-child(1)' )
  //     .should( 'have.class', 'login-selector selected' );
  //   cy.get( '.form-wrapper' )
  //     .find( '.form-header > :nth-child(2)' )
  //     .should( 'not.have.class', 'login-selector selected' );
  // } );
  // it( 'Signup tab should properly select when clicking', () => {
  //   cy.get( '.form-wrapper' )
  //     .find( '.form-header > :nth-child(2)' )
  //     .click()
  //     .should( 'have.class', 'login-selector selected' );
  //   cy.get( '.form-wrapper' )
  //     .find( '.form-header > :nth-child(1)' )
  //     .should( 'not.have.class', 'login-selector selected' );
  // } );
  // it( 'Login tab should properly select when clicking', () => {
  //   cy.get( '.form-wrapper' )
  //     .find( '.form-header > :nth-child(1)' )
  //     .click()
  //     .should( 'have.class', 'login-selector selected' );
  //   cy.get( '.form-wrapper' )
  //     .find( '.form-header > :nth-child(2)' )
  //     .should( 'not.have.class', 'login-selector selected' );
  // } );
  // it( 'Should change the name of the submit button depending on the select tab', () => {
  //   cy.get( '.form-wrapper' )
  //     .find( '.submit' )
  //     .should( 'contain', 'Login' );
  //   cy.get( '.form-wrapper' )
  //     .find( '.form-header > :nth-child(2)' )
  //     .click();
  //   cy.get( '.form-wrapper' )
  //     .find( '.submit' )
  //     .should( 'contain', 'Sign Up' );
  // } );

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

  // it( 'Should allow you to click login button', () => {
  //   cy.get( '.submit' ).click();
  // } );
  // it( 'Should redirects you to dashboard when clicking on login', () => {
  //   // https://on.cypress.io/submit
  //   cy.get( '.form-wrapper' )
  //     .find( '[type="email"]' ).type( 'cipriana@cipriana.com' );
  //   cy.get( '.form-wrapper' )
  //     .find( '[type="password"]' ).type( '1234' );
  //   cy.get( '.submit' ).click()
  //     .url( 'http://localhost:3001/dashboard' );
  //   // .next().should('contain', 'Your form has been submitted!')
  // } );
  // it( 'Should display an error if you try to log in with an unregistered email', () => {
  //   cy.get( '[name="email"]' )
  //     .type( 'fake@email.com' );
  //   cy.get( '[type="password"]' )
  //     .type( '1234' );
  //   cy.get( '.submit' ).click();
  //   cy.get( '.form-wrapper' )
  //     .find( 'p' )
  //     .should( 'contain', 'Email or password are wrong!' );
  // } );
  
  // it( 'Should displays an error on signup if email is already registered', () => {
  //   cy.get( '.form-wrapper' )
  //     .find( '.form-header > :nth-child(2)' )
  //     .click();
  //   cy.get( '[name="name"]' )
  //     .type( 'Cipriana' );
  //   cy.get( '[name="email"]' )
  //     .type( 'cipriana@cipriana.com' );
  //   cy.get( '[name="password"]' )
  //     .type( 'password' );
  //   cy.get( '.submit' ).click();
  //   cy.get( '.form-wrapper' )
  //     .find( 'p' )
  //     .should( 'contain', 'This email already exists!' );

  // } );
  
} );
