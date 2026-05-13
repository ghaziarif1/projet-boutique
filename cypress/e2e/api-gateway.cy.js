describe('API Gateway E2E', () => {
  it('loads categories, loads products by category, and loads product reviews', () => {
    cy.request('/api/categories')
      .its('status')
      .should('eq', 200)
      .then(() => {
        cy.request('/api/categories').then((categoriesResponse) => {
          const categories = categoriesResponse.body;
          expect(categories).to.be.an('array').and.not.be.empty;

          const categoryId = categories[0].id;
          cy.request(`/api/produits?categorieId=${categoryId}`)
            .its('status')
            .should('eq', 200)
            .then((productsResponse) => {
              const products = productsResponse.body;
              expect(products).to.be.an('array');

              if (products.length > 0) {
                const produitId = products[0].id;
                cy.request(`/api/avis/${produitId}`).its('status').should('eq', 200);
              }
            });
        });
      });
  });
});
