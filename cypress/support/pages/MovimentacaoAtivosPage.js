function todayIso() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

class MovimentacaoAtivosPage {
  visit() {
    cy.visit('/portal_service/reports/index')
    cy.contains('h1', 'Movimentação de Ativos').should('be.visible')
  }

  pesquisar({ area = 'CTI', initialDate = todayIso(), finalDate = todayIso() } = {}) {
    cy.get('#area_name').select(area, { force: true })
    cy.get('#initial_date').type(initialDate, { force: true })
    cy.get('#final_date').type(finalDate, { force: true })
    cy.get('input[type="submit"][value="Pesquisar"]').click({ force: true })
    cy.url().should('include', '/portal_service/reports/moves_today')
  }

  assertGrupoArea(area) {
    cy.get('#content').contains('td', area).should('be.visible')
  }

  assertColunas() {
    ;['Tombo', 'Nº de Série', 'Descrição', 'Lotação Anterior', 'Lotação Atual', 'Colaborador'].forEach((coluna) => {
      cy.contains('th, td', coluna).should('exist')
    })
  }

  assertPdfHref(area) {
    cy.get('a[href*="/portal_service/reports/pdf_create"]')
      .should('have.attr', 'href')
      .and('include', 'pdf_create')
      .and('include', `area_name=${encodeURIComponent(area)}`)
      .and('include', 'initial_date=')
      .and('include', 'final_date=')
  }
}

export default new MovimentacaoAtivosPage()
