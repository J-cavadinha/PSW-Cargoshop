const categoriesContainer = document.getElementById('categories');
const productList = document.getElementById('product-list');

const products = {
    Bicicletas: [
        { name: 'Bicicleta Mountain Bike', image: 'mountain_bike.jpg', price: "R$ 1200" },
        { name: 'Bicicleta de Estrada', image: 'road_bike.jpg', price: "R$ 1500" }
    ],
    Eletrônicos: [
        { name: 'Smartphone', image: 'smartphone.jpg', price: "R$ 2000" },
        { name: 'Notebook', image: 'notebook.jpg', price: "R$ 3000" }
    ],
    Bebês: [
        { name: 'Chupeta', image: 'chupeta.jpg', price: "R$ 20" },
        { name: 'Fraldas', image: 'fraldas.jpg', price: "R$ 50" }
    ],
    // Tem que colocar os outros
};

function displayProducts(category) {
    productList.innerHTML = '';

    let categoryProducts;

     if (category) {
        categoryProducts = products[category] || [];
    } else {
        categoryProducts = Object.values(products).flat();
    }

    if (categoryProducts.length === 0) {
        productList.innerHTML = '<p>Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    categoryProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('col-md-4', 'mb-3');

        productElement.innerHTML = `
            <div class="card product"> <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                </div>
            </div>
        `;

        const cardElement = productElement.querySelector('.card');
        if (cardElement) {
            cardElement.addEventListener('click', () => {
                const url = `detalhes.html?nome=${encodeURIComponent(product.name)}&imagem=${encodeURIComponent(product.image)}&preco=${encodeURIComponent(product.price)}`;
                window.location.href = url;
            });
        }

        productList.appendChild(productElement);
    });
}

const categoryIcons = document.querySelectorAll('.category-icon');
categoryIcons.forEach(categoryIcon => {
    categoryIcon.addEventListener('click', (event) => {

        const category = categoryIcon.dataset.category;
        displayProducts(category);

    });
});

displayProducts();