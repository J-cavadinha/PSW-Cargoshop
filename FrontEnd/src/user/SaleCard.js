import React from 'react'; 

export default function SaleCard({ order }) {

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card shadow-lg">
        <img
          src={order.image}
          className="card-img-top"
          alt={order.name}
          style={{ objectFit: 'cover', height: '200px', width: '100%' }}
        />
        <div className="card-body">
          <h5 className="card-title">{order.name}</h5>
          <p className="card-text">Valor Total: R$ {order.price}</p>
          <p className="card-text">Vendedor: {order.NomeVendedor}</p>
          <p className="card-text">Endereço: {order.endereco}</p>
        </div>
      </div>
    </div>
  );
}