class AtribuicoesPage {
  get gerarTermosButton() {
    return cy.get('button[data-target="#generate_term"]')
  }

  /**
   * Exemplo fixo mapeado na UI (bond id 1795). Para escala, localizar linha por
   * observação QA-AUTO-* ou filtro antes de clicar em editar.
   */
  editLinkByBondId(bondId) {
    return cy.get(`a[href="/portal_service/bonds/${bondId}/edit"]`)
  }

  editBond1795() {
    this.editLinkByBondId(1795).click()
  }
}

export default new AtribuicoesPage()
