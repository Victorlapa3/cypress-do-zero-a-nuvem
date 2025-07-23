Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {}) => {
  const defaultData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    text: 'Test.'
  }
  // ... spread operator serve para espalhar o conteúdo de um objeto ou array dentro de outro.
  // Utilizei o spread operator para mesclar os dados informados com os valores padrão, garantindo que nenhum campo obrigatório fique vazio mesmo que não seja explicitamente preenchido.
  const formData = { ...defaultData, ...data }

  cy.get('input[name="firstName"]').type(formData.firstName)
  cy.get('input[name="lastName"]').type(formData.lastName)
  cy.get('input[name="email"][type="email"]').type(formData.email)
  cy.get('textarea[name="open-text-area"]').type(formData.text)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillMandatoryFields', (data = {}) => {
  const defaultData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    text: 'Test.'
  }
  const formData = { ...defaultData, ...data }

  cy.get('input[name="firstName"]').type(formData.firstName)
  cy.get('input[name="lastName"]').type(formData.lastName)
  cy.get('input[name="email"][type="email"]').type(formData.email)
  cy.get('textarea[name="open-text-area"]').type(formData.text)
})


