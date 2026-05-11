describe('Login-falho', () => {
    it('Realizar login sem sucesso', () => {
        cy.visit('http://localhost:3000/login');
        cy.wait(500);

        cy.get('[data-test="email"]').type('admin@example.com');
        cy.wait(500);

        cy.get('[data-test="password"]').type('admin');
        cy.wait(500);

        cy.get('[data-test="login-btn"]').click();
        cy.contains('Erro ao fazer login. Tente novamente.').should('be.visible');
        cy.wait(1000);
    })
})


describe('Login-sucesso', () => {
    it('Realizar login com sucesso', () => {

        const email = `teste${Date.now()}@email.com`;

        cy.visit('http://localhost:3000/login');
        cy.wait(500);

        cy.get('[data-test="register-link"]').click();
        cy.get('[data-test="name"]').type('Usuário Teste');
        cy.wait(500);

        cy.get('[data-test="email"]').type(email);

        cy.get('[data-test="password"]').type('senha123');
        cy.wait(500);

        cy.get('[data-test="register-btn"]').click();
        cy.wait(500);

        cy.visit('http://localhost:3000/login');

        cy.get('[data-test="email"]').type(email);
        cy.wait(500);

        cy.get('[data-test="password"]').type('senha123');
        cy.wait(500);

        cy.get('[data-test="login-btn"]').click();
        cy.url().should('include', '/dashboard');
    });
});