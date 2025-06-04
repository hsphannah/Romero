// Itera sobre cada produto e cria o HTML do card
filteredProducts.forEach(product => {
    // Verifica se o preço é nulo ou não para exibir o texto correto
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
    // Adiciona o card gerado ao container da grade
    productGrid.innerHTML += productCardHTML;
});