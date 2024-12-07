import { Link } from "react-router-dom";
import { removeProductServer } from "../slices/ProductsSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    return (
        <div className="col-md-4 mb-3">
            <div className="card product">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">R$
                        {product.price.toFixed(2)}
                    </p>
                    <button className="btn btn-warning mx-1"><Link to={`/vender/${product.id}`} className="text-decoration-none text-white" state={{product}}>Editar</Link></button>
                    <button className="btn btn-danger mx-1" onClick={() => dispatch(removeProductServer(product.id))}>Remover</button>
                </div>
            </div>
      </div>
    );
}