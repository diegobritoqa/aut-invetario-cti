import AtribuicoesListPage from '../support/pages/AtribuicoesListPage'
import NovaAtribuicaoPage from '../support/pages/NovaAtribuicaoPage'
import NovoAtivoPage from '../support/pages/NovoAtivoPage'

function qaAutoTag() {
  return `QA-AUTO-${Date.now()}`
}

describe('HU01 — Cadastro de atribuições (P0)', () => {
  beforeEach(() => {
    cy.loginAsAdmin()
  })

  it('CT011 — salvar vazio mantém Área em Selecione e não conclui', () => {
    AtribuicoesListPage.visit()
    AtribuicoesListPage.clickNovaAtribuicao()
    NovaAtribuicaoPage.save()
    NovaAtribuicaoPage.assertStillMissingArea()
  })

  it('CT013 — salvar sem ativo exibe Ativo não informado', () => {
    const tag = qaAutoTag()
    AtribuicoesListPage.visit()
    AtribuicoesListPage.clickNovaAtribuicao()
    NovaAtribuicaoPage.selectAreaSubareaColaborador()
    NovaAtribuicaoPage.selectPresencial()
    NovaAtribuicaoPage.selectSistemaOperacional()
    NovaAtribuicaoPage.fillObservacao(tag)
    NovaAtribuicaoPage.save()
    NovaAtribuicaoPage.assertAssetRequired()
  })

  it('CT001 + CT014 — cria ativo e vincula na atribuição', function () {
    const tombo = `QA${Date.now()}`
    const tag = `QA-AUTO-${tombo}`

    NovoAtivoPage.visit()
    NovoAtivoPage.create({ tombo, model: tag })

    AtribuicoesListPage.visit()
    AtribuicoesListPage.clickNovaAtribuicao()
    NovaAtribuicaoPage.selectAreaSubareaColaborador()
    NovaAtribuicaoPage.selectPresencial()
    NovaAtribuicaoPage.selectSistemaOperacional()
    NovaAtribuicaoPage.fillObservacao(tag)
    NovaAtribuicaoPage.assignTombo(tombo)
    NovaAtribuicaoPage.save()
    cy.contains('Parabéns!').should('be.visible')
    AtribuicoesListPage.visit()
    AtribuicoesListPage.assertContainsObservation(tag)
  })
})
