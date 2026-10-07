import MovimentacaoAtivosPage from '../support/pages/MovimentacaoAtivosPage'

describe('HU04 — Movimentação de ativos (P0)', () => {
  beforeEach(() => {
    cy.loginAsAdmin()
    MovimentacaoAtivosPage.visit()
  })

  it('CT034 — pesquisar CTI no período de hoje lista a movimentação', () => {
    MovimentacaoAtivosPage.pesquisar()
    cy.get('table').should('be.visible')
  })

  it('CT035 — o resultado agrupa pela área pesquisada', () => {
    MovimentacaoAtivosPage.pesquisar()
    MovimentacaoAtivosPage.assertGrupoArea('CTI')
  })

  it('CT036 — a grade tem as colunas da movimentação', () => {
    MovimentacaoAtivosPage.pesquisar()
    MovimentacaoAtivosPage.assertColunas()
  })

  it('CT037 — Gerar Relatório aponta o PDF com área e período', () => {
    MovimentacaoAtivosPage.pesquisar()
    MovimentacaoAtivosPage.assertPdfHref('CTI')
  })
})
