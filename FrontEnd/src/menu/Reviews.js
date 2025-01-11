import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchReviews, selectAllReviews } from "../slices/ReviewsSlice"
import ReviewCard from "./ReviewCard";
import { useEffect } from "react";
import ReviewCardOwn from "./ReviewCardOwn";

export default function Reviews() {

    const reviews = useSelector(selectAllReviews);
    const dispatch = useDispatch();

    const status = useSelector(state => state.reviews.status);
    const error =  useSelector(state => state.reviews.error);
    const seller = useSelector(state => state.logins.username);

    useEffect(() => {
        if (status === "not_loaded" || status === "saved" || status === "deleted") {
            dispatch(fetchReviews());
        } else if (status === "failed") {
            setTimeout(() => dispatch(fetchReviews()), 5000);
        }
    }, [status, dispatch]);

    const filteredReviews = reviews.filter(review => {
        return review.seller === seller;
    });

    const filteredReviewsOwn = reviews.filter(review => {
        return review.buyer === seller;
    });

    let showReviews = null;
    let showReviewsOwn = null;

    if (status === "loaded") {
        showReviews = filteredReviews.map(review => ( <ReviewCard key={review.id} review={review}/> ));
        if (showReviews.length <= 0) {
            showReviews = <div>Nenhuma avaliação encontrada</div>;
        }
        showReviewsOwn = filteredReviewsOwn.map(review => ( <ReviewCardOwn key={review.id} review={review}/> ));
        if (showReviewsOwn.length <= 0) {
            showReviewsOwn = <div>Nenhuma avaliação encontrada</div>;
        }
    } else if (status === "loading") {
        showReviews = <div>Carregando as avaliações...</div>;
        showReviewsOwn = <div>Carregando as avaliações...</div>;
    } else if (status === "failed") {
        showReviews = <div>Erro: {error}</div>
        showReviewsOwn = <div>Erro: {error}</div>
    }

    return (
        <div>
            <br/>
            <h2 className="text-center">Avaliações</h2>
            <br/>
            <br/>
            <h2>Recebidas</h2>
            <br/>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"> 
                {showReviews}
            </div>
            <br/>
            <h2>Enviadas</h2>
            <br/>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"> 
                {showReviewsOwn}
            </div>
        </div>
    )
}