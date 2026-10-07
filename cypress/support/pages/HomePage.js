class HomePage {
  assertLoggedIn() {
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
    cy.contains('ATRIBUIÇÕES').should('be.visible')
    cy.contains('ATRIBUIÇÕES SEM USUÁRIO').should('be.visible')
  }
}

export default new HomePage()
