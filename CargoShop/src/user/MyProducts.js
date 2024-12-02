import { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, selectAllProducts } from '../slices/ProductsSlice';

export default function MyProducts() {
    const products = useSelector(selectAllProducts);
    const status = useSelector(state => state.products.status);
    const error =  useSelector(state => state.products.error);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "not_loaded" || status === "saved" || status === "deleted") {
            dispatch(fetchProducts());
        } else if (status === "failed") {
            setTimeout(() => dispatch(fetchProducts()), 5000);
        }
    }, [status, dispatch])

    const filteredProducts = products.filter(product => {
        return product.seller.toLowerCase().includes("leonardo");
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
            <br/>
            <h2>Seus Produtos</h2>
            <br/>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {produtos}
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