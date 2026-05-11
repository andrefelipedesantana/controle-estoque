describe('Login', () => {
    it('Realizar login sem sucesso', () => {
        cy.visit('http://localhost:3000/login');
        cy.wait(500);

        cy.getByData('email')
            .should('be.visible')
            .clear()
            .type('admin@example.com')
            .should('have.value', 'admin@example.com');
        cy.wait(500);

        cy.getByData('password')
            .should('be.visible')
            .clear()
            .type('admin')
            .should('have.value', 'admin');
        cy.wait(500);

        cy.getByData('login-btn').click();
        cy.wait(500);

        cy.contains('Erro ao fazer login. Tente novamente.').should('be.visible');
        cy.wait(500);
    });

    it('Realizar login com sucesso', () => {
        const email = `teste${Date.now()}@email.com`;
        const password = 'senha123';

        cy.registerAndLogin('Usuário Teste', email, password);

        // Testa o registro previamente criado
        cy.visit('http://localhost:3000/login');
        cy.login(email, password);
    });
});