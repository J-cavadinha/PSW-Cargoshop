import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PedidosCard from "./PedidosCard";
import { removePedidos } from './PedidoSlice';

export default function Pedidos() {

  const pedidos = useSelector(state => state.pedidos); 
  const dispatch = useDispatch();  
  
  const handleDelete = (id) => {
    dispatch(removePedidos(id)); 
  };

  if (pedidos.length === 0) {
    return <h2 style={{ textAlign: 'center' , marginBottom: '30px'}}>Nenhum pedido encontrado.</h2>;
  };

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
