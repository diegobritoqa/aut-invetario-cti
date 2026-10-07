import AtribuicoesPorAreaPage from '../support/pages/AtribuicoesPorAreaPage'

describe('HU05 — Atribuições por área (P0)', () => {
  beforeEach(() => {
    cy.loginAsAdmin()
    AtribuicoesPorAreaPage.visit()
  })

  it('CT041 — a tela é distinta da movimentação de ativos', () => {
    cy.url().should('include', '/portal_service/reports/assignments_by_area')
    cy.contains('h1', 'Movimentação de Ativos').should('not.exist')
    cy.get('#type_syntetic').should('exist')
    cy.get('#type_analytic').should('exist')
    cy.get('#search_area').should('exist')
  })

  it('CT042 — Sintético da CTI mostra os painéis', () => {
    AtribuicoesPorAreaPage.pesquisarSinteticoCti()
    AtribuicoesPorAreaPage.assertRelatorioSintetico()
  })

  it('CT043 — Gerar Relatório aponta o PDF sintético da área', () => {
    AtribuicoesPorAreaPage.pesquisarSinteticoCti()
    AtribuicoesPorAreaPage.assertPdfHref()
  })
})
