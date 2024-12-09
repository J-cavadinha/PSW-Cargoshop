import { useDispatch, useSelector } from "react-redux"
import { selectAllPedidos } from "../Pedidos/PedidoSlice"
import PurchaseCard from "./PurchaseCard";
import { fetchReviews } from "../slices/ReviewsSlice";
import { useEffect } from "react";

export default function Purchases() {
    const orders = useSelector(selectAllPedidos);
    const dispatch = useDispatch();

    const status = useSelector(state => state.reviews.status);
    const error =  useSelector(state => state.reviews.error);

    useEffect(() => {
        if (status === "not_loaded" || status === "saved" || status === "deleted") {
            dispatch(fetchReviews());
        } else if (status === "failed") {
            setTimeout(() => dispatch(fetchReviews()), 5000);
        }
    }, [status, dispatch]);

    let purchases = null;
    if (status === "loaded") {
        purchases = orders.map(order => (<PurchaseCard key={order.id} order={order}/>));
        if (purchases.length <= 0) {
            purchases = <div>Nenhuma compra encontrada</div>
        }
    } else if (status === "loading") {
        purchases = <div>Carregando as compras...</div>;
    } else if (status === "failed") {
        purchases = <div>Erro: {error}</div>
    }

    return (
        <div>
            <br/>
            <h2>Suas Compras</h2>
            <br/>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {purchases}
            </div>
        </div>
    )
}