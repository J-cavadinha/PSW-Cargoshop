import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PedidosCard from "./PedidosCard";
import { removePedidos} from './PedidoSlice';


export default function Pedidos() {

  const { pedidos, status, error } = useSelector((state) => state.pedidos);
  const dispatch = useDispatch();  
  
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3004/pedidos/${id}`, {
        method: 'DELETE',
      });
      dispatch(removePedidos(id));
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  };
  
  if (status === "failed") {
    return <p>Erro ao carregar os pedidos: {error}</p>;
  }
  return (
    
    <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Meus Pedidos</h1>
        <div className="row g-4">

          {pedidos.map(pedido => (  
            <PedidosCard 
              key={pedido.id} 
              pedido={pedido} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
    </div>
  );
}
