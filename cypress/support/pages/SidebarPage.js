class SidebarPage {
  get sidebar() {
    return cy.get('#accordionSidebar')
  }

  linkAtribuicoes() {
    return this.sidebar.contains('span', 'Atribuições').closest('a')
  }

  linkRelatorios() {
    return this.sidebar.contains('span', 'Relatórios').closest('a')
  }

  openAtribuicoes() {
    this.linkAtribuicoes().click()
  }

  openRelatorios() {
    this.linkRelatorios().click()
  }
}

export default new SidebarPage()
