describe('Registrar-Produto', () => {

    it('Registrar Produto com sucesso', () => {

        const email = `teste${Date.now()}@email.com`;

        // Cadastro
        cy.visit('http://localhost:3000/register');

        cy.get('[data-test="name"]')
            .should('be.visible')
            .clear()
            .type('Usuário Teste')
            .should('have.value', 'Usuário Teste');

        cy.wait(500)

        cy.get('[data-test="email"]')
            .should('be.visible')
            .clear()
            .type(email)
            .should('have.value', email);

        cy.wait(500)

        cy.get('[data-test="password"]')
            .should('be.visible')
            .clear()
            .type('senha123')
            .should('have.value', 'senha123');

        cy.wait(500)

        cy.get('[data-test="register-btn"]')
            .should('be.visible')
            .click();

        cy.url()
            .should('include', '/dashboard');

        cy.wait(1000)

        // Produto
        cy.get('[data-test="novo-produto"]')
            .should('be.visible')
            .click();

        cy.url()
            .should('include', '/products/new');

        cy.get('[data-test="product-name"]')
            .type('Produto Teste')
            .should('have.value', 'Produto Teste');

        cy.wait(500)

        cy.get('[data-test="product-quantity"]')
            .should('be.visible')
            .clear()
            .type('10')
            .should('have.value', '10');

        cy.wait(500)

        cy.get('[data-test="product-expiration-date"]')
            .should('be.visible')
            .type('2025-12-31')
            .should('have.value', '2025-12-31');

        cy.wait(500)

        cy.get('[data-test="save-product"]')
            .should('be.visible')
            .click();

        cy.url()
            .should('include', '/dashboard');

        cy.contains("Produto Teste")
            .should('be.visible')

        cy.wait(500)
    });
});