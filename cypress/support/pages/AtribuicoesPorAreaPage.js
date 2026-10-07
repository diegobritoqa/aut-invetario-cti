class AtribuicoesPorAreaPage {
  visit() {
    cy.visit('/portal_service/reports/assignments_by_area')
    cy.contains('h1', 'Atribuições por Área/Subárea').should('be.visible')
  }

  pesquisarSinteticoCti() {
    cy.get('#type_syntetic').check({ force: true })
    cy.get('#search_area').select('9', { force: true })
    cy.get('#search_subarea').select('65', { force: true })
    cy.get('input[type="submit"][value="Pesquisar"]').click({ force: true })
  }

  assertRelatorioSintetico() {
    cy.contains('Relatório Sintético - CTI').should('be.visible')
    cy.contains('Atribuições por Modalidade').should('be.visible')
    cy.contains('Total de Atribuições').should('be.visible')
  }

  assertPdfHref() {
    cy.get('a[href*="assignments_by_area_pdf"]')
      .should('have.attr', 'href')
      .and('include', 'area=9')
      .and('include', 'type=syntetic')
  }
}

export default new AtribuicoesPorAreaPage()
