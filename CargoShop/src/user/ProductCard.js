import { Link } from "react-router-dom";
import { removeProductServer } from "../slices/ProductsSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    return (
        <div className="col-md-4 mb-3">
            <div className="card product h-100">
                <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.name} 
                style={{ objectFit: "cover", height: "200px" }} 
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">R$ {product.price.toFixed(2)}</p>
                    <div>
                    <Link to={`/vender/${product.id}`} className="text-decoration-none" state={{product}}><button className="btn btn-warning mx-1 text-white">Editar</button></Link>
                    <button className="btn btn-danger mx-1" onClick={() => dispatch(removeProductServer(product.id))}>Remover</button>
                    </div>
                </div>
            </div>
        </div>
    );
}