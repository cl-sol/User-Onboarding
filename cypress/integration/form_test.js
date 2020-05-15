//arrange - get element
//act - simulate user interaction
//assert - test/verify

describe("Testing Form Inputs", () => {

    beforeEach(function() {
        cy.visit("http://localhost:3001/");
    });

    it("Get and input name in name element", () => {
        cy.get('#name')
        .type("Claudia Sol")
        .should("have.value", "Claudia Sol");
    });

    it("Get and input email in email element", () => {
        cy.get('#email')
        .type("dada@dada.com")
        .should("have.value", "dada@dada.com");
    });

    it("Get and input password in password element", () => {
        cy.get('#password')
        .type("dada123@@@")
        .should("have.value", "dada123@@@");
    });

    it("Check TOS checkbox", () => {
        cy.get('#terms')
        .check()
        .should("be.checked");
    });

    it("Submit form", () => {
        cy.get('button')
        .click()
    });
});

describe("Check Form Validation", () => {
    beforeEach(function() {
        cy.visit("http://localhost:3001/");
    });
    
    it("Check name error message", () => {
        cy.get('#name')
        .type("Claudia Sol")
        .clear()
        cy.contains("Name is a required field");
    });

    it("Check valid email error message", () => {
        cy.get('#email')
        .type("dada")
        cy.contains("Must be a valid email address");
    });

    it("Check required email error message", () => {
        cy.get('#email')
        .type("dada@dada.com")
        .clear()
        cy.contains("Email is a required field");
    });

    it("Check password error message", () => {
        cy.get('#password')
        .type("dada123@@@")
        .clear()
        cy.contains("Password is a required field");
    });

    it("Check TOS box error message", () => {
        cy.get('#terms')
        .check()
        .uncheck()
        cy.contains("Please agree to our terms and conditions");
    })
})