/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()
    });
    it('Deve selecionar um produto da lista', () => {
        cy.get('.products > .row')
        produtosPage.buscarProdutoLista('Aether Gym Pant')
            cy.get('#tab-title-description > a').should('contain', 'Descrição')

    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Tiberius Gym Tank'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain', produto)
    });

    it('Deve visitar a página de produto', () => {
        produtosPage.visitarProduto('Tiberius Gym Tank')
        cy.get('.product_title').should('contain', 'Tiberius Gym Tank')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 7
        produtosPage.buscarProduto('Erica Evercool Sports Bra')
        produtosPage.addProdutoCarrinho('M', 'Orange', qtd)

        cy.get('.woocommerce-message').should('contain', qtd + ' × “Erica Evercool Sports Bra” foram adicionados no seu carrinho.')  
    });

        it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {

        produtosPage.buscarProduto(dados[0].nomeProduto)
        produtosPage.addProdutoCarrinho(
            dados[0].tamanho, 
            dados[0].cor, 
            dados[0].quantidade)

        cy.get('.woocommerce-message').should('contain',  dados[0].nomeProduto)
        })

     });
});