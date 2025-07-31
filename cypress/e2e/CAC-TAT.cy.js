describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => cy.visit('./src/index.html'))

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input[name="firstName"]').type('Victor')
    cy.get('input[name="lastName"]').type('Lapa')
    cy.get('input[name="email"][type="email"]').type('victorlapa@gmail.com')
    cy.get('select#product').select('Blog')

    // (inserindo delay por tecla em milissegundo)
    cy.get('textarea[name="open-text-area"]').type('Está tudo perfeito! Parabéns!', { delay: 50 })

    cy.get('button[type="submit"]').click()
    cy.get('span[class="success"]').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[name="firstName"]').type('Victor')
    cy.get('input[name="lastName"]').type('Lapa')
    cy.get('input[name="email"][type="email"]').type('123')
    cy.get('textarea[name="open-text-area"]').type('Está tudo perfeito! Parabéns!')
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('não permite a entrada de caracteres não numéricos no campo de telefone', () => {
    cy.get('input#phone').type('teste!@#%').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[name="firstName"]').type('Victor')
    cy.get('input[name="lastName"]').type('Lapa')
    cy.get('input[name="email"][type="email"]').type('victorlapa@gmail.com')
    cy.get('textarea[name="open-text-area"]').type('Está tudo perfeito! Parabéns!')

    cy.get('input#phone-checkbox').check().should('be.checked')
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

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

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('span[class="success"]').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })

  it('submete o formulário usando cy.contains para identificar o botão de envio', () => {
    const data = {
      firstName: 'Victor',
      lastName: 'Lapa',
      // email e text serão preenchidos com os valores padrão
    }

    cy.fillMandatoryFields(data)
    cy.contains('button', 'Enviar').click()
    cy.contains('span', 'Mensagem enviada com sucesso.')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"][value=feedback]').check().should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]').each(typeofService => {
      cy.wrap(typeofService).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json').should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type=file]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('myFixture')
    cy.get('input[type=file]').selectFile('@myFixture')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank').and('have.attr','href', 'privacy.html')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

})
