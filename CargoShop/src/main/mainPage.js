import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/ProductsSlice';

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

const products = useSelector(state => state.products.products);
const status = useSelector(state => state.products.status);
const error =  useSelector(state => state.products.error);

const dispatch = useDispatch();

useEffect(() => {
    if (status === "not_loaded") {
        dispatch(fetchProducts());
    }
}, [status, dispatch])

const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedCategory === 'Todas' || product.category === selectedCategory);
    });

    let produtos = null;
    if (status === "loaded") {
        produtos = filteredProducts.map(product => (<ProductCard key={product.id} product={product} />));
    } else if (status === "loading") {
        produtos = <div>Carregando os produtos...</div>;
    } else if (status === "failed") {
        produtos = <div>Erro: {error}</div>
    }

    return (
        <div>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="O que deseja comprar hoje?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h2 onClick={() => setShowCategories(!showCategories)}>Categorias</h2>
            {
                showCategories && (
                    <div className="categories d-flex flex-wrap justify-content-center">
                    {
                        categories.map(category => (<CategoryCard key={category} categoryName={category} onClick={() => setSelectedCategory(category.split(' ')[1])}/>))
                    }
                </div>
            )}

            <br/>
            <h2>Produtos</h2>
            <br/>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {produtos}
            </div>
        </div>
    );
}