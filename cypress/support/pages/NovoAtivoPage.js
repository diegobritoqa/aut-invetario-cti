class NovoAtivoPage {
  visit() {
    cy.on('uncaught:exception', (error) => {
      if (error.message.includes('disabled')) {
        return false
      }
      return true
    })
    cy.visit('/portal_service/listing_assets/new')
  }

  create({ tombo, model = 'QA-AUTO', brand = 'QA' }) {
    cy.get('#type').select('MOUSE')
    cy.get('#asset_model').clear().type(model)
    cy.get('#asset_tombo').clear().type(tombo)
    cy.get('#asset_brand').clear().type(brand)
    cy.get('#asset_acquisition_id').select('1')
    cy.get('input[type="submit"][name="commit"][value="Salvar"]').click()
    cy.url().should('not.include', '/listing_assets/new')
  }
}

export default new NovoAtivoPage()
