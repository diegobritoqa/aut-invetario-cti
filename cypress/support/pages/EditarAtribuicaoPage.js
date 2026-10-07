function selectFirstReal(selector) {
  cy.get(selector)
    .find('option')
    .should('have.length.greaterThan', 1)
    .then(($options) => {
      const option = [...$options].find((item) => item.value)
      expect(option, selector).to.exist
      cy.get(selector).select(option.value)
    })
}

class EditarAtribuicaoPage {
  assertLoaded(tag) {
    cy.contains('Atualizando Atribuição').should('be.visible')
    cy.get('#bond_observation').should('contain.value', tag)
    cy.get('#set_area').invoke('val').should('not.eq', '')
    cy.get('#bond_modality_presencial').should('be.checked')
    cy.get('#attended').should('have.value', '')
  }

  selectAttended() {
    selectFirstReal('#attended')
  }

  appendObservation(suffix) {
    cy.get('#bond_observation').type(suffix)
  }

  save() {
    cy.get('input[type="submit"][name="commit"][value="Salvar"]').click()
  }

  assertUpdated() {
    cy.url().should('not.include', '/edit')
    cy.contains('atualizado com sucesso').should('be.visible')
  }

  assertBlockedByRequiredField() {
    cy.url().should('include', '/edit')
    cy.contains('atualizado com sucesso').should('not.exist')
  }
}

export default new EditarAtribuicaoPage()
