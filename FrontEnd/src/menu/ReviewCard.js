import React from 'react'; 

export default function ReviewCard({ review }) {

  return (
    <div className="col"> 
        <div className="card mb-3">
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Nota: {review.rate}</h6>
                <p className="card-text">{review.message}</p>
                <br/>
            </div>
        </div>
    </div>
  );
}