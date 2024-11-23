import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div className="col-md-4 mb-3">
            <div className="card product">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">R$   
                        {product.price}
                    </p>
                    <button className="btn btn-success"><Link to={`/produtos/${product.id}`} style={{color: "#FFFFFF", textDecoration: "none"}} state={{product}}>Comprar</Link></button>
                </div>
            </div>
      </div>
    );
}