import React from 'react'; 
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeReviewServer } from '../slices/ReviewsSlice';

export default function ReviewCardOwn({ review }) {

  const dispatch = useDispatch();

  return (
    <div className="col">
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Nota: {review.rate}</h6>
            <p className="card-text">{review.message}</p>
            <br/>
            <div className="d-flex">
              <Link to={`/avaliar/${review.orderId}/${review.id}`}><button className="btn btn-warning mx-1">Atualizar avaliação</button></Link>
              <button className="btn btn-danger mx-1" onClick={() => dispatch(removeReviewServer(review.id))}>Excluir avaliação</button>
            </div>
          </div>
        </div>
    </div>
  );
}