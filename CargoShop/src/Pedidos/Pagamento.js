import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PedidosCard from './PagamentosCard';
import { fetchPedidos, removePedidoServer, updatePedidoServer, selectAllPedidos } from './PedidoSlice';
import PagamentosCard from './PagamentosCard';

export default function Pagamento() {
  const dispatch = useDispatch();
  const pedidos = useSelector(selectAllPedidos);
  const status = useSelector((state) => state.pedidos.status);
  const error = useSelector((state) => state.pedidos.error);

  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchPedidos());
    }
  }, [status, dispatch]);

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Pagamento</h1>
      {status === 'loading' && <p>Carregando...</p>}
      {status === 'failed' && <p>Erro ao carregar o Pagamento: {error}</p>}
      <div className="row g-4">
        
      </div>
    </div>
  );
}