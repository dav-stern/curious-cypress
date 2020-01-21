// / <reference types="Cypress" />

require( './utils/overlap' );
const viewportPresets = require( './utils/viewportPresets' );

const responsiveNessTests = () => {
  it( 'There should not be horizontal scrolling', () => {
    cy.window().then( ( win ) => {
      expect( win.innerWidth ).to.equal( win.document.body.scrollWidth );
    } );
  } );

  it( 'logo should be entirely visible', () => {
    cy.get( 'h1' ).isInside( 'viewport', true );
  } );
  it( 'form should be entirely visible', () => {
    cy.get( '.form-wrapper' ).isInside( 'viewport', true );
  } );

  it( 'logo and auth form should not overlap', () => {
    cy.get( 'h1' ).overlap( '.form-wrapper', false );
  } );
};

context( 'Responsiveness', () => {
  before( () => {
    cy.visit( Cypress.config( 'defaultPage' ) );
  } );
  viewportPresets.forEach( ( el ) => {
    if ( !el.aliases )el.aliases = '';
    el.mode = el.noLandscape ? '' : '- portrait';
    context( `${el.name} ${el.aliases} ${el.mode}`, () => {
      before( () => {
        cy.viewport( el.name );
        cy.screenshot();
      } );

      responsiveNessTests();
    } );

    if ( !el.noLandscape ) {
      context( `${el.name} ${el.aliases} -landscape`, () => {
        before( () => {
          // cy.visit( Cypress.config( 'defaultPage' ) );
          cy.viewport( el.name, 'landscape' );
          cy.screenshot();
        } );
        responsiveNessTests();
      } );
    }
  } );
} );
