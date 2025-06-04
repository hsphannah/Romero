// Garante que o script só rode depois que o HTML da página estiver completamente carregado.
document.addEventListener('DOMContentLoaded', () => {

    // Esta é a função principal que faz todo o trabalho.
    async function loadProducts() {
        
        // 1. Encontra o lugar na página onde os produtos serão inseridos.
        const productGrid = document.querySelector('.product-grid');

        // Medida de segurança: se não encontrar o 'product-grid', para a execução.
        if (!productGrid) {
            console.error("Erro: Container .product-grid não foi encontrado na página.");
            return;
        }

        try {
            // 2. Busca o nosso banco de dados.
            const response = await fetch('database.json');
            const products = await response.json();

            // 3. Limpa qualquer conteúdo que pudesse estar lá antes.
            productGrid.innerHTML = '';

            // 4. Filtra a lista para pegar apenas os itens da categoria "produto".
            const filteredProducts = products.filter(product => product.category === 'produto');

            // 5. Passa por cada produto filtrado e cria o HTML dele.
            filteredProducts.forEach(product => {
                const priceDisplay = product.price !== null 
                    ? `R$ ${product.price.toFixed(2).replace('.', ',')}` 
                    : product.price_text;

                const productCardHTML = `
                    <article class="product-card">
                        <a href="produto-detalhe.html?id=${product.id}">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p class="product-price">${priceDisplay}</p>
                            <span class="product-button">Ver Detalhes</span>
                        </a>
                    </article>
                `;
                
                // 6. Insere o card do produto na página.
                productGrid.innerHTML += productCardHTML;
            });

        } catch (error) {
            // Se qualquer coisa der errado (ex: arquivo não encontrado), mostra um erro no console.
            console.error("Falha ao carregar os produtos:", error);
            productGrid.innerHTML = "<p>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>";
        }
    }

    // 7. Chama a função para iniciar todo o processo.
    loadProducts();

});