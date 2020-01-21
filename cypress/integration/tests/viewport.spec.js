/// <reference types="Cypress" />
context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
  })

  const getRect = (selector) => {
    if (selector == 'viewport') {
      return cy.document().then( doc => {
        return doc.documentElement.getBoundingClientRect();
      });
    } else if ( typeof selector === 'string' ) {
      return cy.get(selector).then( $elem => {
        return $elem[0].getBoundingClientRect();
      });
    } else {
      return cy.wrap(selector).then( elem => {
        return Cypress.$(elem)[0].getBoundingClientRect();
      });
    }
  };

  const isInside = (containerRect, childRect) => {
    if ( !containerRect || !childRect ) return false;
    return (
      childRect.top >= containerRect.top &&
      childRect.bottom <= containerRect.bottom &&
      childRect.left >= containerRect.left &&
      childRect.right <= containerRect.right
      );
    };

    Cypress.Commands.add('isInside', { prevSubject: true }, (child, container, expected) => {
      return getRect(child).then( childRect => {
        getRect(container).then( containerRect => {
          expect(isInside(containerRect, childRect)).to.equal(expected);
        });
      });
    });

    describe('page is responsive', () => {
      it('correctly displays elements in default viewpoint', () => {
        cy.get('h1').isInside('.authentication-container', true);
      });

      it('corectly displays elements in iphone 6 viewport', () => {
        cy.viewport('iphone-6')
        cy.get('h1').isInside('.authentication-container', true);

      });
    });
  })
