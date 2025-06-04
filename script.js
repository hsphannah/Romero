// Seleciona os elementos do HTML que vamos manipular
const hamburgerBtn = document.querySelector('.hamburger-btn');
const mainNav = document.querySelector('.main-nav');

// Adiciona um "ouvinte de evento" de clique ao botão
hamburgerBtn.addEventListener('click', () => {
    // A cada clique, ele adiciona ou remove a classe 'menu-open' do menu
    mainNav.classList.toggle('menu-open');
});