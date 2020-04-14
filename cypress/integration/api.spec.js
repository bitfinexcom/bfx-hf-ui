describe('first test', () => {
  it('invalid credentials', () => {
  cy.log('loglog')
  cy.debug()
 const password = 'testpassword123'
   cy.visit('http://localhost:3000/')
 cy.get('body').then(($body) => {
  if($body.text().includes('Clear Data & Reset')) {
    cy.get('.hfui-authenticationpage__clear > .hfui-button').click() 
  }
  console.log('not contains')
  cy.get('input[placeholder="Password"]').type(password)
                cy.get('input[placeholder="Confirm password"]').type(password)
  cy.get('button.hfui-button.green').click()
 }) 
 cy.get('.hfui-orderformmenu__wrapper > :nth-child(2) > :nth-child(1)').click()
 cy.get('body').then(($body) => {
      // synchronously ask for the body's text
      // and do something based on whether it includes
      // another string
      if ($body.text().includes('NOT CONFIGURED')) {
        // yup found it
        cy.get('.underline').click()
                 cy.get('.hfui-settings__input-api-key').type('12345')
                 cy.get('.hfui-settings__input-api-secret').type('secretpassword')
                 cy.get('.row > .green').click()
      } else {
         // nope not here
         console.log('configured')
      }
   })
 cy.get(':nth-child(1) > .hfui-orderform__input > .hfui-input > input').type('6712')
 cy.get(':nth-child(2) > .hfui-orderform__input > .hfui-input > input').type('1')
 cy.get('.red').click()
 cy.contains('500 - ["error",10100,"apikey: digest invalid"]')
 })
})