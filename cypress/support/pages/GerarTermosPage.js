const ALERTA_SEM_SELECAO = 'Selecione um tipo de Termo e uma ou mais Atribuiçôes'

class GerarTermosPage {
  open() {
    cy.get('button[data-target="#generate_term"]').click()
    cy.get('#generate_term').should('be.visible')
  }

  selectResponsabilidade() {
    cy.get('#term_type_liability').check({ force: true })
  }

  selectEmprestimo() {
    cy.get('#term_type_loan').check({ force: true })
  }

  assertTiposExclusivos() {
    this.selectResponsabilidade()
    cy.get('#term_type_liability').should('be.checked')
    cy.get('#term_type_loan').should('not.be.checked')
    this.selectEmprestimo()
    cy.get('#term_type_loan').should('be.checked')
    cy.get('#term_type_liability').should('not.be.checked')
  }

  gerar() {
    cy.get('#btn-termo').click()
  }

  fechar() {
    cy.get('#generate_term button[data-dismiss="modal"]').trigger('click')
    cy.get('#generate_term').should('not.have.class', 'show')
  }

  assertAlertaSemSelecao() {
    cy.on('window:alert', (message) => {
      expect(message).to.eq(ALERTA_SEM_SELECAO)
    })
    this.gerar()
  }

  stubNovaAba() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('termoAberto')
    })
  }

  assertTermoAberto(termType) {
    cy.get('@termoAberto').should('be.called')
    cy.get('@termoAberto').then((stub) => {
      const url = String(stub.args[0][0])
      expect(url).to.include('/portal_service/bonds/term_responsibility_asset')
      expect(url).to.include('bonds_ids=')
      expect(url).to.include(`term_type=${termType}`)
    })
  }
}

export default new GerarTermosPage()
