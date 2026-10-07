import AtribuicoesListPage from '../support/pages/AtribuicoesListPage'
import GerarTermosPage from '../support/pages/GerarTermosPage'

describe('HU03 — Geração de termos (P0)', () => {
  beforeEach(() => {
    cy.loginAsAdmin()
    AtribuicoesListPage.visit()
  })

  it('CT025 — modal abre com Responsabilidade e Empréstimo', () => {
    GerarTermosPage.open()
    cy.get('#term_type_liability').should('exist')
    cy.get('#term_type_loan').should('exist')
    cy.get('#btn-termo').should('be.visible')
  })

  it('CT028 — os tipos são mutuamente exclusivos', () => {
    GerarTermosPage.open()
    GerarTermosPage.assertTiposExclusivos()
  })

  it('CT031 — gerar sem atribuição marcada exibe o alerta padrão', () => {
    GerarTermosPage.open()
    GerarTermosPage.selectResponsabilidade()
    GerarTermosPage.assertAlertaSemSelecao()
  })

  it('CT026 — Responsabilidade abre o PDF em nova aba', () => {
    AtribuicoesListPage.checkFirstRow()
    GerarTermosPage.stubNovaAba()
    GerarTermosPage.open()
    GerarTermosPage.selectResponsabilidade()
    GerarTermosPage.gerar()
    GerarTermosPage.assertTermoAberto('liability')
  })
})
