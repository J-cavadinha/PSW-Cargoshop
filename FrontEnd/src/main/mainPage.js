import { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts } from '../slices/ProductsSlice';

export default function MainPage() {
    const [showCategories, setShowCategories] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [categories] = useState([
        '💄 Beleza',
        '🚲 Bicicletas',
        '🛍️ Compras',
        '💻 Eletrônicos',
        '🔧 Ferramentas',
        '💎 Joalheria',
        '👓 Óculos',
        '✏️ Papelaria',
        '⌚ Relógios',
        '🛒 Todas'
    ]);

    const productsSectionRef = useRef(null);

    const products = useSelector(selectAllProducts);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);
    const seller = useSelector(state => state.logins.username);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "not_loaded" || status === "saved" || status === "deleted") {
            dispatch(fetchProducts());
        } else if (status === "failed") {
            setTimeout(() => dispatch(fetchProducts()), 5000);
        }
    }, [status, dispatch]);

    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'Todas' || product.category === selectedCategory) &&
            product.seller !== seller
        );
    });

    let produtos = null;
    if (status === "loaded") {
        produtos = filteredProducts.map(product => (<ProductCard key={product.id} product={product} />));
        if (produtos.length <= 0) {
            produtos = <div>Nenhum produto encontrado.</div>;
        }
    } else if (status === "loading") {
        produtos = <div>Carregando os produtos...</div>;
    } else if (status === "failed") {
        produtos = <div>Erro: {error}</div>;
    }

    let categoriesShow = showCategories ? "▼ Categorias " : "▷ Categorias ";

    
    const handleCategoryClick = (category) => {
        setSelectedCategory(category.split(' ')[1]);
        if (productsSectionRef.current) {
            productsSectionRef.current.scrollIntoView({ behavior: 'smooth' }); // Rola para a seção de produtos
        }
    };

    return (
        <div>
            <input
                type="text"
                className="form-control mb-3"
                id="search-bar"
                placeholder="O que deseja comprar hoje?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h2 onClick={() => setShowCategories(!showCategories)}>
                {categoriesShow}
            </h2>

            {showCategories && (
                <div className="categories d-flex flex-wrap justify-content-center">
                    {categories.map(category => (
                        <CategoryCard
                            key={category}
                            categoryName={category}
                            onClick={() => handleCategoryClick(category)}
                        />
                    ))}
                </div>
            )}

            <br />
            <h2>Produtos</h2>
            <br />
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" ref={productsSectionRef}>
                {produtos}
            </div>
        </div>
    );
}
