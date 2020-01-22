const cyValidateTextField = ( obj ) => {
  it( `${obj.title} field should exist`, () => {
    cy.get( obj.selector ).should( 'exist' );
  } );

  it( `${obj.title} field should be visible`, () => {
    cy.get( obj.selector ).should( 'be.visible' );
  } );

  it( `${obj.title} field should be of type ${obj.type}`, () => {
    cy.get( obj.selector ).should( 'have.attr', 'type', obj.type );
  } );
  
  it( `${obj.title} field should be empty`, () => {
    cy.get( obj.selector ).should( 'be.empty' );
  } );

  if ( obj.required ) {
    it( `${obj.title} should have attribute required`, () => {
      cy.get( obj.selector ).should( 'have.attr', 'required', 'required' );
    } );
  }

  it( `${obj.title} typed should match value`, () => {
    cy.get( obj.selector )
      .type( obj.testVal ).should( 'have.value', obj.testVal );
  } );

  it( `${obj.title} typed should clear`, () => {
    cy.get( obj.selector )
      .clear().should( 'be.empty', obj.testVal );
  } );
};

module.exports = cyValidateTextField;
