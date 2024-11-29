import { useState } from 'react';
import ProductCard from './ProductCard';
import CategoryCard from './CategoryCard';
import { useSelector } from 'react-redux';

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

const products = useSelector(state => state.products);

const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedCategory === 'Todas' || product.category === selectedCategory);
    });

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
            {
                filteredProducts.map(product => (<ProductCard key={product.id} product={product} />))
            }
            </div>
        </div>
    );
}