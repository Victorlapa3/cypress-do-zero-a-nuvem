describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => cy.visit('./src/index.html'))

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
})