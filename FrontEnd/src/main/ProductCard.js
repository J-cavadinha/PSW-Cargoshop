import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const status = useSelector(state => state.logins.status);
    const navigate = useNavigate();

    const handleClick = (product) => {
        if (status !== "logged_in") {
            navigate("/login");
        } else {
            navigate(`/produtos/${product.id}`, { state: { product } });
        }
    };

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
                    <button className="btn btn-success" onClick={() => handleClick(product)}>Comprar</button>
                </div>
            </div>
        </div>
    );
}