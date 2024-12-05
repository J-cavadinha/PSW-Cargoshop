import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PedidosCard from './PedidosCard';
import { fetchPedidos, removePedidoServer, updatePedidoServer, selectAllPedidos } from './PedidoSlice';

export default function Pedidos() {
  const dispatch = useDispatch();
  const pedidos = useSelector(selectAllPedidos);
  const status = useSelector((state) => state.pedidos.status);
  const error = useSelector((state) => state.pedidos.error);

  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchPedidos());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(removePedidoServer(id));
  };

  const handleUpdate = (id, updatedData) => {
    dispatch(updatePedidoServer(updatedData));
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Meus Pedidos</h1>
      {status === 'loading' && <p>Carregando...</p>}
      {status === 'failed' && <p>Erro ao carregar os pedidos: {error}</p>}
      <div className="row g-4">
        {pedidos.map((pedido) => (
          <PedidosCard
            key={pedido.id}
            pedido={pedido}
            Delete={handleDelete}
            Update={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}