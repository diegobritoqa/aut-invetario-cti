import SidebarPage from './SidebarPage'

class AtribuicoesListPage {
  visit() {
    cy.visit('/portal_service/bonds')
  }

  openFromMenu() {
    SidebarPage.openAtribuicoes()
    cy.url().should('include', '/portal_service/bonds')
  }

  clickNovaAtribuicao() {
    cy.contains('button', 'Nova Atribuição').click()
  }

  assertContainsObservation(tag) {
    cy.contains('td', tag).should('exist')
  }
}

export default new AtribuicoesListPage()
