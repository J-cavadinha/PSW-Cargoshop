function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        nome: params.get('nome'),
        imagem: params.get('imagem'),
        preco: params.get('preco')
    };
}

window.addEventListener('DOMContentLoaded', () => {
    const productInfo = getQueryParams();

    if (productInfo.nome && productInfo.imagem && productInfo.preco) {
        document.getElementById('product-image').src = productInfo.imagem;
        document.getElementById('product-image').alt = productInfo.nome;
        document.getElementById('product-price').textContent = productInfo.preco;
        document.getElementById('product-name').textContent = productInfo.nome;
    } else {
        const container = document.querySelector('.container');
        container.innerHTML = '<p class="text-center mt-5">Produto não encontrado.</p>';
    }
});