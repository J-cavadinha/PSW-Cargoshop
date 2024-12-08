import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PedidosCard from './PedidosCard';
import { fetchPedidos, selectAllPedidos } from './PedidoSlice';

export default function Pedidos() {
  const dispatch = useDispatch();
  const pedidos = useSelector(selectAllPedidos);
  const status = useSelector((state) => state.pedidos.status);
  const error = useSelector((state) => state.pedidos.error);

  useEffect(() => {
    if (status === "not_loaded" || status === "saved" || status === "deleted") {
        dispatch(fetchPedidos());
    }
  }, [status, dispatch]);

  let pedidosShow = null;
  if (status === "succeeded") {
    pedidosShow = pedidos.map((pedido) => (<PedidosCard key={pedido.id} pedido={pedido} />));
    if (pedidosShow.length <= 0) {
        pedidosShow = <div>Nenhum pedido encontrado.</div>;
    }
  } else if (status === "loading") {
    pedidosShow = <div>Carregando os pedidos...</div>;
  } else if (status === "failed") {
    pedidosShow = <div>Erro: {error}</div>;
  }

  return (
    <div className="container">
      <br/>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Meus Pedidos</h1>
      {status === 'loading' && <p>Carregando...</p>}
      {status === 'failed' && <p>Erro ao carregar os pedidos: {error}</p>}
      <div className="row g-4">
        {pedidosShow}
      </div>
    </div>
  );
}
