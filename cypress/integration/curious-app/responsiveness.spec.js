/// <reference types="Cypress" />

require( './utils/overlap' );

const viewportPresets = [
  {name:'ipad-2',width:768,height:1024,aliases:'ipad-mini'},
  {name:'iphone-5',width:320,height:480,aliases:'iphone-3,iphone-4'},
  {name:'iphone-6',width:375,height:667},
  {name:'iphone-6+',width:414,height:736},
  {name:'iphone-x',width:375,height:812},
  {name:'iphone-xr',width:414,height:896},
  {name:'macbook-11',width:1366,height:768,noLandscape:true},
  {name:'macbook-13',width:1280,height:800,noLandscape:true},
  {name:'macbook-15',width:1440,height:900,noLandscape:true},
  {name:'samsung-note9',width:414,height:846},
  {name:'samsung-s10',width:360,height:760}
];

context( 'Responsiveness', () => {
  before( () => {
    cy.visit( Cypress.config( 'defaultPage' ) );
  } );
  viewportPresets.forEach( el => {
    if( !el.aliases )el.aliases = '';
    el.mode = el.noLandscape ? '': '- portrait';
    context( `${el.name} ${el.aliases} ${el.mode}`, () => {
      beforeEach( () => {
        // cy.visit( Cypress.config( 'defaultPage' ) );
        cy.viewport( el.name );
        cy.screenshot(); 
      } );
      
      it( 'There should not be horizontal scrolling', () => { 
        
        cy.window().then( ( win ) => {
          expect( win.innerWidth ).to.equal( win.document.body.scrollWidth ); 
        } );
      } );

      it( 'logo should be entirely visible', () => {
        cy.get( 'h1' ).overlap( 'viewport', true );
        
      } );
      it( 'logo and auth form should not overlap', () => {
        cy.get( 'h1' ).overlap( '.form-wrapper', false );
        
      } );
      
    } );

    // if( !el.noLandscape ){
    //   context( `${el.name} ${el.aliases} -landscape`, () => {
    //     before( () => {
    //       // cy.visit( Cypress.config( 'defaultPage' ) );
    //       cy.viewport( el.name,'landscape' );
    //     } );
        
    //     it( 'There should not be horizontal scrolling', () => { 
    //       cy.screenshot(); 
          
    //       cy.window().then( ( win ) => {
    //         expect( document.documentElement.scrollWidth - document.documentElement.clientWidth ).to.be.lessThan( 2 );  // tolerance of 1, some setups disply
    //       } );
    //     } );
        
    //   } );
  
    // } 

  } );
  
} );