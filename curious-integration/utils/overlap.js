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

const overlap = ( r, rc ) => {
  if ( !r || !rc ) return false;

  return !( rc.left > r.right || 
      rc.right < r.left || 
      rc.top > r.bottom ||
      rc.bottom < r.top );
  
};

Cypress.Commands.add( 'overlap', { prevSubject: true }, ( el, el2, expected ) => {
  return getRect( el ).then( rc => {
    getRect( el2 ).then( r => {
      expect( overlap( r, rc ) ).to.equal( expected );
    } );
  } );
} );

const isInside = ( r, rc ) => {
  if ( !r || !rc ) return false;
  return (
    rc.top >= r.top &&
      rc.bottom <= r.bottom &&
      rc.left >= r.left &&
      rc.right <= r.right
  );
};

Cypress.Commands.add( 'isInside', { prevSubject: true }, ( el, el2, expected ) => {
  return getRect( el ).then( rc => {
    getRect( el2 ).then( r => {
      console.log( 'r',r,'rc',rc );
      expect( isInside( r, rc ) ).to.equal( expected );
    } );
  } );
} );