/// <reference types="cypress" />

beforeEach("Open test application", () => {
  cy.visit("/");
  cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
});
it("My First Test Case", () => {
    //By Tag
    cy.get('input');

    //By Id
    cy.get('#inputEmail1');

    //By Class
    cy.get('.input-full-width');

    //By Attribute Name
    cy.get('[fullwidth]');

    //By Attribute Name and Value
    cy.get('[placeholder="Email"]');

    //by Class Value
    cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

    //How to combine tag, class and attribute remember no spaces
    cy.get('[placeholder="Email"].input-full-width');

    //find by data-cy attribute
    cy.get('[data-cy="inputEmail1"]');
});

it("Cypress Locator Methods", () => {
    //Theory
    // get() - is used to get DOM elements in the page
    // contains() - is used to get DOM elements that contain specific text
    // find() - is used to find only child elements

    cy.contains('Sign in', {matchCase: false} )
    cy.contains('[status="warning"]','Sign in')
    cy.contains('nb-card','Horizontal form').find('button')
    cy.contains('nb-card','Horizontal form').contains('Sign in')
    cy.contains('nb-card','Horizontal form').get('button')
});
 
it('Child Element', () => {
    cy.contains('nb-card','Horizontal form').find('button')
    cy.contains('nb-card','Using the Grid').find('.row').find('button')
    cy.get('nb-card').find('nb-radio-group').contains('Option 1')
});


it('Reusing Locators', () => {

//1. CYPRESS ALIAS(VARIABLE BECOMES GLOBAL) 
    cy.get('#inputEmail1').as('inputEmail1')
    cy.get('@inputEmail1').parents('form').find('button')
    cy.get('@inputEmail1').parents('form').find('nb-radio')
//2. CYPRESS then() METHOD can't return a value use example 1
    cy.get('#inputEmail1').then(inputEmail => {
        cy.wrap(inputEmail).parents('form').find('button')
        cy.wrap(inputEmail).parents('form').find('nb-radio')
    })
})

it('Extracting Values', () => {
    //you don't need invoke for assertions, this is purely if you need to process the value, or add to another project or an object
    //1. using a JQuery method
    cy.get('[for="exampleInputEmail1"]').then(label => {
        const emailLabel = label.text()
        console.log(emailLabel)
    })

    //2.Using invoke command
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {
        console.log(emailLabel)
    })
    cy.get('[for="exampleInputEmail1"]').invoke('text').as('emailLabel')

    //3. Invoke attribute value
    cy.get('#exampleInputEmail1').invoke('attr', 'class').then(classValue => {
        console.log(classValue)
    })

    //4.Invoke input value
    cy.get('#exampleInputEmail1').type('hello@test.com')
    cy.get('#exampleInputEmail1').invoke('prop', 'value').then(emailText => {
        console.log(emailText)
    })

})

it('Assertions', () => {
   cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address') 
   cy.get('[for="exampleInputEmail1"]').should('have.text', 'Email address')
   cy.get('[for="exampleInputEmail1"]').then(label => {
        expect(label).to.contain('Email address')
    })
    cy.get('[for="exampleInputEmail1"]').then(label => {
        expect(label).to.have.text('Email address')
    })

    cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {
        expect(emailLabel).to.equal('Email address')
    })
})

it('Timeouts', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Dialog').click()

    cy.contains('Open with delay 10 seconds').click()
    cy.get('nb-dialog-container nb-card-header',{Timeout: 11000}).should('have.text', 'Friendly reminder')
})

