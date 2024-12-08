import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
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
              <button className="btn btn-success"><Link to={`/produtos/${product.id}`} className="text-decoration-none text-white" state={{product}}>Comprar</Link></button>
            </div>
          </div>
        </div>
      );
      
}


