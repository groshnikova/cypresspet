/// <reference types="cypress" />

beforeEach('Open application', () => {
    cy.visit('/')
});

it('input fields', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //regular typing
    cy.get('#exampleInputEmail1').type('karina.groshnikova@gmail.com')

    //typing with delay
    cy.get('#inputEmail1').type('test@gmail.com', {delay: 200}).clear().type('hello').clear()

    //to clear an input field

    //typing into input using the label(clear doesn't work when using the label)
    cy.contains('nb-card', 'Using the Grid').contains('Email').type('helloworld')

    cy.get('#inputEmail1').should('have.value', 'helloworld').clear().type('new value').press(Cypress.Keyboard.TAB)


});

it('Tap keys for inputs', () => {
    cy.contains('Auth').click()
    cy.contains('Login').click()

    cy.get('#input-email').type('test@bondaracademy.com')
    cy.get('#input-password').type('Welcome{enter}')
});

it('Radio buttons', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(allRadioButtons => {
        cy.wrap(allRadioButtons).eq(0).check({force:true}).should('be.checked')
        cy.wrap(allRadioButtons).eq(1).check({force:true}).should('be.checked')
        cy.wrap(allRadioButtons).eq(0).should('not.be.checked')
        cy.wrap(allRadioButtons).eq(2).should('be.disabled')
    })

    cy.contains('nb-card', 'Using the Grid').contains('Option 1').click({force:true})
    cy.contains('nb-card', 'Using the Grid').contains('Option 2').click({force:true})

    cy.contains('nb-card', 'Using the Grid').contains('label', 'Option 1').find('input').check({force:true})
    cy.contains('nb-card', 'Using the Grid').contains('label', 'Option 2').find('input').check({force:true})
    cy.contains('nb-card', 'Using the Grid').contains('label', 'Disabled Option').find('input[type="radio"]').should('not.be.checked')
})

it('Check boxes', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    // State of the checkbox is always gonna be checked compared to the click command
    cy.get('[type="checkbox"]').uncheck({force:true})

    cy.get('[type="checkbox"]').click({force:true, multiple: true})

    cy.contains('label', 'Hide on click').find('input').uncheck({force:true}).should('not.be.checked')
})


it.only('Lists and Dropdowns', () => {
    //two types of Dropdowns: Native: list - options Custom: button - ul- option list
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    //Native
    cy.contains('div', 'Toast type:').find('select').select('info')
    cy.contains('div', 'Toast type:').find('select').select('warning').should('have.value', 'warning')

    //Custom
    cy.contains('div', 'Position:').find('nb-select').click()
    cy.get('.option-list').contains('bottom-right').click()
    cy.contains('div', 'Position:').find('nb-select').should('have.text', 'bottom-right')

    //Loop for selecting all values and checking if they work for Native
    cy.contains('div', "Toast type:").find('select').then(dropdown => {
        cy.wrap(dropdown).click()
        cy.get('.option-list nb-option').each(opt => {
            cy.wrap(option).click()
        })
    })

})
