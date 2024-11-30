import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MyProducts() {
    const products = useSelector(state => state.products);

    const filteredProducts = products.filter(product => {
        return product.seller.toLowerCase().includes("leonardo");
        });

    return (
        <div>
            <br/>
            <h2>Seus Produtos</h2>
            <br/>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {
                    filteredProducts.map(product => (<ProductCard key={product.id} product={product} />))
                }
            </div>
            <br/>
            <div className="text-center">
                <button className="btn btn-success btn-lg">
                    <Link to={`/vender`} style={{ color: "#FFFFFF", textDecoration: "none" }}>Listar novo produto</Link>
                </button>
            </div>
        </div>
    )
}