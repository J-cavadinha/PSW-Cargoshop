import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addReviewServer, selectReviewsById, updateReviewServer } from "../slices/ReviewsSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { reviewSchema } from "./ReviewSchema";
import { selectPedidoById } from "../slices/PedidoSlice";

export default function ReviewForm() {
    let {orderId, reviewId} = useParams();

    const reviewFound = useSelector(state => selectReviewsById(state, reviewId));
    const order = useSelector(state => selectPedidoById(state, orderId));
    const buyer = useSelector(state => state.logins.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [actionType, ] = useState(
        reviewId ? reviewFound ? 'update' : 'add' : 'add'
    );

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(reviewSchema)
    });

    const [reviewOnLoad] = useState(
        reviewId ? reviewFound ?? reviewSchema.cast({}) : reviewSchema.cast({})
    );

    function onSubmit(review) {
        review.seller = order.NomeVendedor;
        review.buyer = buyer;
        if (actionType === "add") {
            review.orderId = orderId;
            dispatch(addReviewServer(review));
        } else {
            dispatch(updateReviewServer({ ...review, id: reviewFound.id}));
        }

        navigate('/avaliacoes');
    };

    return (
        <div className="container">
            <br/>
            <h5>Conte-nos como foi a sua experiência nessa compra!</h5>
            <br/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="rate" className="form-label">Nota</label>
                    <div className="input-group">
                        <input
                            type="number"
                            step="0.1"
                            min={0}
                            max={10}
                            className="form-control"
                            id="rate"
                            defaultValue={reviewOnLoad.rate}
                            {...register("rate")}
                        />
                        <span className="input-group-text">/10</span>
                    </div>
                    {errors.rate && <span>{errors.rate.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Mensagem</label>
                    <textarea 
                        placeholder="Insira uma mensagem expressando como foi a compra"
                        className="form-control"
                        id="message"
                        defaultValue={reviewOnLoad.message}
                        {...register("message")}
                    />
                    {errors.message && <span>{errors.message.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Publicar</button>
            </form>
        </div>
    );
}