import { useDispatch, useSelector } from "react-redux"
import { selectAllPedidos } from "../slices/PedidoSlice"
import SaleCard from "./SaleCard";
import { useEffect } from "react";
import { fetchReviews } from "../slices/ReviewsSlice";

export default function Sales() {
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

    let sales = null;
    if (status === "loaded") {
        sales = orders.map(order => (<SaleCard key={order.id} order={order}/>));
        if (sales.length <= 0) {
            sales = <div>Nenhuma venda encontrada</div>
        }
    } else if (status === "loading") {
        sales = <div>Carregando as vendas...</div>;
    } else if (status === "failed") {
        sales = <div>Erro: {error}</div>
    }

    return (
        <div>
            <br/>
            <h2>Suas Vendas</h2>
            <br/>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {sales}
            </div>
        </div>
    )
}