// Comando utilitário para facilitar a busca por data-test
Cypress.Commands.add('getByData', (selector) => {
    return cy.get(`[data-test="${selector}"]`);
});

// Comando para registrar um novo usuário e já entrar no sistema
Cypress.Commands.add('registerAndLogin', (name, email, password) => {
    cy.visit('http://localhost:3000/register');

    cy.getByData('name')
        .should('be.visible')
        .clear()
        .type(name)
        .should('have.value', name);
    cy.wait(500);

    cy.getByData('email')
        .should('be.visible')
        .clear()
        .type(email)
        .should('have.value', email);
    cy.wait(500);

    cy.getByData('password')
        .should('be.visible')
        .clear()
        .type(password)
        .should('have.value', password);
    cy.wait(500);

    cy.getByData('register-btn').click();
    cy.url().should('include', '/dashboard');
});

// Comando para realizar login
Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:3000/login');

    cy.getByData('email')
        .should('be.visible')
        .clear()
        .type(email)
        .should('have.value', email);
    cy.wait(500);

    cy.getByData('password')
        .should('be.visible')
        .clear()
        .type(password)
        .should('have.value', password);
    cy.wait(500);

    cy.getByData('login-btn').click();
    cy.url().should('include', '/dashboard');
    cy.wait(500);
});

// Comando para criar um produto
Cypress.Commands.add('createProduct', (name, quantity, expirationDate) => {
    cy.getByData('novo-produto').click();
    cy.wait(500);

    cy.getByData('product-name')
        .should('be.visible')
        .clear()
        .type(name)
        .should('have.value', name);
    cy.wait(500);

    cy.getByData('product-quantity')
        .should('be.visible')
        .clear()
        .type(quantity)
        .should('have.value', quantity);
    cy.wait(500);

    cy.getByData('product-expiration-date')
        .should('be.visible')
        .clear()
        .type(expirationDate)
        .should('have.value', expirationDate);
    cy.wait(500);

    cy.getByData('save-product').click();
    cy.url().should('include', '/dashboard');
    cy.contains(name).should('be.visible');
    cy.wait(500);
});