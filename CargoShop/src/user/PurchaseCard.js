import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { removeReviewServer, selectAllReviews } from '../slices/ReviewsSlice';
import { Link } from 'react-router-dom';

export default function PurchaseCard({ order }) {

    const dispatch = useDispatch();

    const reviews = useSelector(selectAllReviews);

    const reviewAlreadyExists = reviews.filter(review => {
        return review.orderId === parseInt(order.id);
    });

    let description = null;
    if (reviewAlreadyExists.length > 0) {
        description =
            <>
            <Link to={`/avaliar/${order.id}/${reviewAlreadyExists[0].id}`}><button className="btn btn-warning my-1">Atualizar avaliação</button></Link>
            <button className="btn btn-danger my-1" onClick={() => dispatch(removeReviewServer(reviewAlreadyExists[0].id))}>Excluir avaliação</button>
            </>
    } else {
        description = <Link to={`/avaliar/${order.id}`}><button className="btn btn-warning">Avaliar vendedor</button></Link>
    }

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
          {description}
        </div>
      </div>
    </div>
  );
}