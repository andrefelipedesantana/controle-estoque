describe('Registrar Produto', () => {
    it('Registrar Produto com sucesso', () => {
        const email = `teste${Date.now()}@email.com`;
        const password = 'senha123';

        // Usa o custom command para autenticar
        cy.registerAndLogin('Usuário Teste', email, password);

        // Usa o custom command para criar o produto
        cy.createProduct('Produto Teste', '10', '2025-12-31');
    });
});