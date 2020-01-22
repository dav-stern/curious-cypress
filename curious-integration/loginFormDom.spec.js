/// <reference types="Cypress" />

const cyValidateTextField = require( './utils/validateTextField' );

context( 'Login form dom', () => {
  before( () => {
    cy.visit( Cypress.config( 'defaultPage' ) );
  } );
  
  cyValidateTextField(    
    {title:'email',selector:'[name="email"]',type:'email',testVal:'fake@email.com',required:true}
  );
    
  cyValidateTextField(
    {title:'password',selector:'[name="password"]',type:'password',testVal:'test',required:true}
  );
      
  it( 'Login/Signup switch should be visible', () => {
    cy.get( '.form-header .login-selector' )
      .should( 'be.visible' );
  } );
      
  it( 'Login/Signup switch should be visible', () => {   
    cy.get( '.form-header .login-selector' )
      .should( 'be.visible' );
  } );
      
  it( 'Login should be selected', () => {   
    cy.get( '.form-header .login-selector' )
      .should( 'be.visible' );
  } );
      
} );
    