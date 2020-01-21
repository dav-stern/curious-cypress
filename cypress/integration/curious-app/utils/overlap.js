const getRect = ( selector ) => {
  
  if ( selector == 'viewport' ) {
    return cy.document().then( doc => {
      return doc.documentElement.getBoundingClientRect();
    } );
  } else if ( typeof selector === 'string' ) {
    return cy.get( selector ).then( $elem => {
      return $elem[0].getBoundingClientRect();
    } );
  } else {
    return cy.wrap( selector ).then( elem => {
      return Cypress.$( elem )[0].getBoundingClientRect();
    } );
  }
};

const overlap = ( r1, r2 ) => {
  if ( !r1 || !r2 ) return false;

  return !( r2.left > r1.right || 
      r2.right < r1.left || 
      r2.top > r1.bottom ||
      r2.bottom < r1.top );
  
};

Cypress.Commands.add( 'overlap', { prevSubject: true }, ( el, el2, expected ) => {
  return getRect( el ).then( r2 => {
    getRect( el2 ).then( r1 => {
      console.log( 'r1',r1,'r2',r2 );
      expect( overlap( r1, r2 ) ).to.equal( expected );
    } );
  } );
} );