declare namespace Cypress {
    interface Chainable{
        /**
         * Command to open home page
         */
        openHomePage() : Chainable<void>;
    }
}