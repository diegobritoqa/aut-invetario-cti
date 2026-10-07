import AtribuicoesListPage from '../support/pages/AtribuicoesListPage'
import EditarAtribuicaoPage from '../support/pages/EditarAtribuicaoPage'
import NovaAtribuicaoPage from '../support/pages/NovaAtribuicaoPage'
import NovoAtivoPage from '../support/pages/NovoAtivoPage'

function createAssignment() {
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
  AtribuicoesListPage.visit()
  AtribuicoesListPage.assertContainsObservation(tag)

  return tag
}

describe('HU02 — Editar atribuições (P0)', () => {
  beforeEach(() => {
    cy.loginAsAdmin()
  })

  it('CT015 — edição carrega a atribuição e Atendido por vem vazio', () => {
    const tag = createAssignment()
    AtribuicoesListPage.visit()
    AtribuicoesListPage.openEditByObservation(tag)
    EditarAtribuicaoPage.assertLoaded(tag)
  })

  it('CT019 — alterar observação e salvar redireciona com sucesso', () => {
    const tag = createAssignment()
    AtribuicoesListPage.visit()
    AtribuicoesListPage.openEditByObservation(tag)
    EditarAtribuicaoPage.selectAttended()
    EditarAtribuicaoPage.appendObservation('-ED')
    EditarAtribuicaoPage.save()
    EditarAtribuicaoPage.assertUpdated()
    AtribuicoesListPage.assertContainsObservation(`${tag}-ED`)
  })

  it('CT022 — salvar sem Atendido por permanece na edição', () => {
    const tag = createAssignment()
    AtribuicoesListPage.visit()
    AtribuicoesListPage.openEditByObservation(tag)
    EditarAtribuicaoPage.save()
    EditarAtribuicaoPage.assertBlockedByRequiredField()
  })
})
