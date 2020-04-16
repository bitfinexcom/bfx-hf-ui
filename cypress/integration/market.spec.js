const auth = () => {
    const password = 'testpassword123'
        cy.visit('http://localhost:3000/data')
        cy.get('body').then(($body) => {
            if($body.text().includes('Clear Data & Reset')) {
            cy.get('.hfui-authenticationpage__clear > .hfui-button').click() 
            }
            console.log('not contains')
            cy.get('input[placeholder="Password"]').type(password)
                        cy.get('input[placeholder="Confirm password"]').type(password)
            cy.get('button.hfui-button.green').click()
        }) 
        //auth end
}

describe('market data', () => {      
    it('create new layout', () => {
        auth()
        cy.get('.hfui-layoutcontroltoolbar__wrapper > :nth-child(2)').click()
        cy.get('.hfui-input > input').type('test_layout')
        cy.get('.hfui-modal__actions > .hfui-button').click()
        cy.get('.hfui-dropdown__button').contains('test_layout')
        cy.get('.hfui-layoutcontroltoolbar__wrapper > :nth-child(4)').click()                                                                                                            
    })

    it('delete layout', () => {
        auth()
        cy.get('.hfui-layoutcontroltoolbar__wrapper > :nth-child(2)').click()
        cy.get('.hfui-input > input').type('test_layout')
        cy.get('.hfui-modal__actions > .hfui-button').click()
        cy.get('.hfui-dropdown__button').contains('test_layout')
        cy.get('.hfui-layoutcontroltoolbar__wrapper > :nth-child(5)').click()
        cy.get('.hfui-dropdown__button').contains('Default Market Data')
    })
})