describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => cy.visit('./src/index.html'))

  // Exercício 01
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  // Exercício 02
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input[name="firstName"]').type('Victor')
    cy.get('input[name="lastName"]').type('Lapa')
    cy.get('input[name="email"][type="email"]').type('victorlapa@gmail.com')
    cy.get('select#product').select('Blog')

    // Exercício extra 1 (inserindo delay por tecla em milissegundo)
    cy.get('textarea[name="open-text-area"]').type('Está tudo perfeito! Parabéns!', { delay: 50 })

    // Continuação do Exercício 02   
    cy.get('button[type="submit"]').click()
    cy.get('span[class="success"]').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })

  // Exercício extra 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[name="firstName"]').type('Victor')
    cy.get('input[name="lastName"]').type('Lapa')
    cy.get('input[name="email"][type="email"]').type('123')
    cy.get('textarea[name="open-text-area"]').type('Está tudo perfeito! Parabéns!')
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  // Exercício extra 3
  it('não permite a entrada de caracteres não numéricos no campo de telefone', () => {
    cy.get('input#phone').type('teste!@#%')
    cy.get('input#phone').should('have.value', '')
  })

  // Exercício extra 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[name="firstName"]').type('Victor')
    cy.get('input[name="lastName"]').type('Lapa')
    cy.get('input[name="email"][type="email"]').type('victorlapa@gmail.com')
    cy.get('textarea[name="open-text-area"]').type('Está tudo perfeito! Parabéns!')

    cy.get('input#phone-checkbox').click()
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  // Exercício extra 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[name="firstName"]').type('Victor')
    cy.get('input#firstName').should('have.value', 'Victor')
    cy.get('input[name="firstName"]').clear()
    cy.get('input#firstName').should('have.value', '')

    cy.get('input[name="lastName"]').type('Lapa')
    cy.get('input#lastName').should('have.value', 'Lapa')
    cy.get('input[name="lastName"]').clear()
    cy.get('input#lastName').should('have.value', '')

    cy.get('input[name="email"][type="email"]').type('victorlapa@gmail.com')
    cy.get('input#email').should('have.value', 'victorlapa@gmail.com')
    cy.get('input[name="email"][type="email"]').clear()
    cy.get('input#email').should('have.value', '')

    cy.get('input[name="phone"][type="number"]').type('12345678901')
    cy.get('input#phone').should('have.value', '12345678901')
    cy.get('input[name="phone"][type="number"]').clear()
    cy.get('input#phone').should('have.value', '')
  })
})
