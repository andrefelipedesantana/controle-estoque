describe('Gerenciar Produto', () => {
    it('Deve editar e excluir um produto com sucesso', () => {
        const email = `teste${Date.now()}@email.com`;
        const password = 'senha123';
        const productName = 'Produto Original';
        const updatedName = 'Produto Editado';

        // 1. Autenticação
        cy.registerAndLogin('Usuário Teste', email, password);

        // 2. Criar Produto
        cy.createProduct(productName, '10', '2025-12-31');

        // 3. Editar Produto
        cy.getByData('edit-product').first().click();
        cy.wait(500);

        cy.url().should('include', '/products/edit/');
        cy.getByData('edit-product-title').should('be.visible');

        cy.getByData('product-name')
            .should('be.visible')
            .clear()
            .type(updatedName)
            .should('have.value', updatedName);
        cy.wait(500);

        cy.getByData('save-product').click();
        cy.wait(500);

        cy.url().should('include', '/dashboard');
        cy.contains(updatedName).should('be.visible');
        cy.contains(productName).should('not.exist');
        cy.wait(500);

        // 4. Excluir Produto
        cy.getByData('delete-product').first().click();

        // Confirma automaticamente (Lidando com window.confirm)
        cy.on('window:confirm', (text) => {
            expect(text).to.contains('Tem certeza que deseja excluir este produto?');
            return true;
        });

        cy.contains(updatedName).should('not.exist');
        cy.wait(500);
    });
});
