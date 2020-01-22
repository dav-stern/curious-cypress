/// <reference types="Cypress" />

// Cypress.on( 'uncaught:exception', ( err, runnable ) => {
//   // returning false here prevents Cypress from
//   // failing the test
//   return false;
// } );

var faker = require( 'faker' );

const randTill = ( maxVal ) => Math.floor( Math.random()*maxVal );

// const faketext = () => 
for( let i=0;i<10;i++ ) {
  const user = {
    name:faker.name.findName(),
    email:faker.internet.email(),
    password:faker.internet.password()
  };
  context( `${user.name}'s interactions`,  () => {
    before( () => {
      cy.visit( Cypress.config( 'defaultPage' ) );
    } );
    after( () => {
      cy.get( '.navbar-container' )
        .find( '#js-menu' )
        .find( 'li:nth-child(3)' )
        .click();
    } );

    it( `${user.name} should be able to signup and create content`,     () => {
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

      for( let i=0;i<randTill( 4 );i++ ) {
        // Add roadmap
        if( i === 0 ) {
          cy.get( '#add-roadmap-button' )
            .click();

        }else{
          cy.get( '#roadmap-form button' )
            .click();

        }

        //#roadmap-form > button
        // #add-roadmap-button

        cy.get( 'input' )
          .type( faker.hacker.phrase() );

        let selectOptions = [];
        const els = cy.get( 'select option' );

        els.each( el => {
          selectOptions.push(  el.val() );
      
        } ).then( el =>
        {
          const rand = randTill( selectOptions.length );//Math.floor( Math.random()*selectOptions.length );
          cy.get( 'select' ).select( selectOptions[rand]  );
        } );

        cy.get( '#roadmap-form > button' )
          .click();

        cy.get( '.dashboard-container a:first-child()' )
          .click();  

        // Add topic
        for( let i=0;i<randTill( 5 );i++ ) {
          cy.get( '.add-topic-btn' )
            .click( {force: true} ); // it's not visible

          cy.get( '.topic-title' )
            .type( faker.hacker.phrase() );

          cy.get( '.topic-description' )
            .type( faker.hacker.phrase() );

          cy.get( '.mde-text' )
            .type( faker.hacker.phrase() );

          for( let i= 0;i<randTill( 10 );i++ ) {   
            cy.get( '.big-input' )
              .type( faker.hacker.ingverb() );
            cy.get( '.add-checklist-item > button' )
              .click(  );
          }
          cy.get( '.save-container button' )
            .click();
        }
        // after topic
        cy.get( '#js-menu > :nth-child(1) > a' )
          .click();
      }
    } );
  
  } );
};
