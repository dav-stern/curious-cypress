/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
  })

  // https://on.cypress.io/interacting-with-elements
  it('Have input type="email" named email', () => {
    cy.get('[name="email"]')
      .should('have.attr', 'type', 'email')
      .should('have.attr', 'required', 'required')
      .should('be.visible')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');
  });
  it('Have input type="password" named password', () => {
    cy.get('[name="password"]')
      .should('have.attr', 'type', 'password')
      .should('have.attr', 'required', 'required')
      .should('be.visible')
      .type('this is my pass')
      .should('have.value', 'this is my pass');
  });
  it('Should have different colors for tabs in the home page', () => {
    cy.get('.form-wrapper')
      .find('.form-header > :nth-child(1)')
      .should('have.class', 'login-selector selected')
    cy.get('.form-wrapper')
      .find('.form-header > :nth-child(2)')
      .should('not.have.class', 'login-selector selected')
  });
  it('Should change colors when clicking on the other tab in the home page', () => {
    cy.get('.form-wrapper')
    .find('.form-header > :nth-child(2)')
    .click()
    .should('have.class', 'login-selector selected')
    cy.get('.form-wrapper')
    .find('.form-header > :nth-child(1)')
    .should('not.have.class', 'login-selector selected')
  });
  it('Should change the name of the buttons depending on the tab', () => {
    cy.get('.form-wrapper')
    .find('.submit')
    .should('contain', 'Login')
    cy.get('.form-wrapper')
    .find('.form-header > :nth-child(2)')
    .click()
    cy.get('.form-wrapper')
    .find('.submit')
    .should('contain', 'Sign Up')
  });
  it('displays an error if you try to log in with the wrong email', () => {
    cy.get('[name="email"]')
    .type('fake@email.com')
    cy.get('[type="password"]')
    .type('1234')
    cy.get('.submit').click()
    cy.get('.form-wrapper')
    .find('p')
    .should('contain', 'Email or password are wrong!')
  });
  it('has the correct fields when you sign up', () => {
    cy.get('.form-wrapper')
    .find('.form-header > :nth-child(2)')
    .click()
    cy.get('[name="name"]')
    .should('have.attr', 'type', 'text')
    cy.get('[name="email"]')
    .should('have.attr', 'type', 'email')
    cy.get('[name="password"]')
    .should('have.attr', 'type', 'password')
  });
  it('displays an error if email exists on signup', () => {
    cy.get('.form-wrapper')
    .find('.form-header > :nth-child(2)')
    .click()
    cy.get('[name="name"]')
    .type('Cipriana')
    cy.get('[name="email"]')
    .type('cipriana@cipriana.com')
    cy.get('[name="password"]')
    .type('password')
    cy.get('.submit').click()
    cy.get('.form-wrapper')
    .find('p')
    .should('contain', 'This email already exists!')

  });
  it('Should allow you to click login button', () => {
    cy.get('.submit').click()
  });
  it('redirects you to the right page when clicking on login', () => {
    // https://on.cypress.io/submit
    cy.get('.form-wrapper')
      .find('[type="email"]').type('cipriana@cipriana.com')
    cy.get('.form-wrapper')
      .find('[type="password"]').type('1234')
    cy.get('.submit').click()
      .url('http://localhost:3001/dashboard')
      // .next().should('contain', 'Your form has been submitted!')
  })
})
