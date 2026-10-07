function isPlaceholder(text) {
  return !text || /^selecione/i.test(text)
}

function chooseRealOption($select) {
  const real = [...$select[0].options].find((option) => !isPlaceholder(option.text.trim()))
  expect(real, `opção real em #${$select.attr('id') || 'select'}`).to.exist
  const value = real.value
  if (value) {
    cy.wrap($select).select(String(value), { force: true })
  } else {
    cy.wrap($select).select(real.text.trim(), { force: true })
  }
}

function selectFirstReal(selector) {
  cy.get(selector).should(($select) => {
    const ready = [...$select[0].options].some((option) => !isPlaceholder(option.text.trim()))
    expect(ready, selector).to.eq(true)
  })
  cy.get(selector).then(($select) => chooseRealOption($select))
}

class NovaAtribuicaoPage {
  selectAreaSubareaColaborador() {
    cy.intercept('GET', '**/portal_service/subareas.json*').as('subareas')
    cy.get('#set_area option').should('have.length.greaterThan', 1)
    cy.get('#set_area option').then(($options) => {
      const area = [...$options].find((option) => /\bCTI\b/i.test(option.text))
      expect(area, 'opção de Área CTI').to.exist
      cy.get('#set_area').select(area.value)
    })
    cy.wait('@subareas')
    cy.get('#resp_subarea option').should('have.length.greaterThan', 1)
    cy.get('#resp_subarea').then(($select) => chooseRealOption($select))
    cy.get('#resp_subarea').invoke('val').should('not.eq', '')

    cy.get('#bond_employee_type_colaborador').check({ force: true })
    cy.get('#select2-collaborators-container').click({ force: true })
    cy.get('.select2-results__option').should('have.length.greaterThan', 1)
    cy.get('.select2-results__option').eq(1).click({ force: true })
    cy.get('#collaborators').invoke('val').should('not.eq', '')
    selectFirstReal('#attended')
    cy.get('#attended').invoke('val').should('not.eq', '')
  }

  selectPresencial() {
    cy.get('#bond_modality_presencial').check({ force: true })
  }

  selectSistemaOperacional() {
    cy.get('#so').then(($select) => {
      if ($select.val()) {
        return
      }
      chooseRealOption($select)
    })
  }

  fillObservacao(text) {
    cy.get('#bond_observation').clear().type(text)
  }

  clickAtribuirAtivo() {
    cy.get('#btn_asset').click()
  }

  assignTombo(tombo) {
    cy.intercept('GET', '**/listing_assets.json*').as('listingAsset')
    this.clickAtribuirAtivo()
    cy.get('#select2-set_tombo-container').click({ force: true })
    cy.get('.select2-container--open .select2-search__field').type(tombo)
    cy.contains('#select2-set_tombo-results li', tombo).click({ force: true })
    cy.wait('@listingAsset')
    cy.get('#set_tombo').invoke('val').should('not.eq', '')
    cy.get('#set_status').select('5')
    cy.get('#set_status').should('have.value', '5')
  }

  save() {
    cy.get("input[type='submit'][name='commit'][value='Salvar']").click()
  }

  cancel() {
    cy.get("button.btn-danger[type='button']").click()
  }

  assertStillMissingArea() {
    cy.get("#set_area option[value='']").should('contain', 'Selecione')
    cy.get('#set_area').should('have.value', '')
    cy.contains('Parabéns').should('not.exist')
  }

  assertAssetRequired() {
    cy.contains('Ativo não informado!').should('be.visible')
  }

  assertSavedForCollaborator() {
    cy.contains('Ativos vinculados a:').should('be.visible')
    cy.contains('Parabéns!').should('be.visible')
  }
}

export default new NovaAtribuicaoPage()
