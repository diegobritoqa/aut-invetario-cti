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

  openEditByObservation(tag) {
    cy.contains('td', tag).parents('tr').find('a[href$="/edit"]').click()
    cy.url().should('match', /\/portal_service\/bonds\/\d+\/edit/)
  }

  checkRowByObservation(tag) {
    cy.contains('td', tag).parents('tr').find('input[type="checkbox"]').check({ force: true })
  }

  checkFirstRow() {
    cy.get('table tbody input[type="checkbox"]').first().check({ force: true })
  }
}

export default new AtribuicoesListPage()
