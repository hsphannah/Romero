// Garante que o script só rode depois que o HTML estiver completamente carregado.
document.addEventListener('DOMContentLoaded', () => {

    // Esta é a função principal que vai buscar e exibir os detalhes do produto.
    async function loadProductDetails() {
        
        // 1. LER O ID DA URL
        // Pega os parâmetros da URL (a parte que vem depois de '?')
        const urlParams = new URLSearchParams(window.location.search);
        // Pega o valor específico do parâmetro 'id'
        const productId = urlParams.get('id');

        // Se não houver ID na URL, não há o que mostrar.
        if (!productId) {
            document.querySelector('.product-detail-container').innerHTML = "<h1>Produto não encontrado.</h1>";
            return;
        }

        try {
            // 2. BUSCAR TODOS OS PRODUTOS NO JSON
            const response = await fetch('database.json');
            const products = await response.json();

            // 3. ENCONTRAR O PRODUTO CORRETO
            // Usa o método find() para procurar na lista o produto cujo ID bate com o da URL.
            // Usamos parseInt() para garantir que estamos comparando número com número.
            const product = products.find(p => p.id === parseInt(productId));

            // Se, mesmo com um ID, o produto não for encontrado na lista.
            if (!product) {
                document.querySelector('.product-detail-container').innerHTML = "<h1>Produto não encontrado.</h1>";
                return;
            }

            // 4. PREENCHER A PÁGINA COM OS DADOS DO PRODUTO
            // Atualiza o título da aba do navegador
            document.title = product.name + " - Minha Loja de Arte";
            
            // Seleciona os elementos no HTML e insere os dados do produto
            document.querySelector('.product-info h1').textContent = product.name;
            
            const priceDisplay = product.price !== null 
                ? `R$ ${product.price.toFixed(2).replace('.', ',')}` 
                : product.price_text;
            document.querySelector('.product-detail-price').textContent = priceDisplay;
            
            document.querySelector('#mainProductImage').src = product.image;
            document.querySelector('#mainProductImage').alt = `Imagem de ${product.name}`;

            // Preenche a descrição e os detalhes
            const descriptionContainer = document.querySelector('.product-description');
            descriptionContainer.innerHTML = `
                <h3>Descrição</h3>
                <p>${product.description}</p>
                <h4>Detalhes</h4>
                <ul>
                    ${product.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            `;

        } catch (error) {
            console.error("Erro ao carregar detalhes do produto:", error);
            document.querySelector('.product-detail-container').innerHTML = "<h1>Erro ao carregar produto.</h1>";
        }
    }

    // Chama a função para iniciar o processo.
    loadProductDetails();

});