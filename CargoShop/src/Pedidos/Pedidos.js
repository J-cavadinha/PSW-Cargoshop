import React from 'react';
import './stylePed.css';


const pedidos = [
    {
      id: 1,
      nomeProduto: 'Camiseta Estilosa',
      nomeVendedor: 'Vendedor A',
      precoProduto: 49.99,
      imagemProduto: 'https://via.placeholder.com/150',
      status: 'Em andamento',
    },
    {
      id: 2,
      nomeProduto: 'Calça Jeans',
      nomeVendedor: 'Vendedor B',
      precoProduto: 79.99,
      imagemProduto: 'https://via.placeholder.com/150',
      status: 'Enviado',
    },
    {
      id: 3,
      nomeProduto: 'Tênis de Corrida',
      nomeVendedor: 'Vendedor C',
      precoProduto: 129.99,
      imagemProduto: 'https://via.placeholder.com/150',
      status: 'Entregue',
    },
  ];
  
  export default function Pedidos(){
    return (
      <div className="pedidos-container">
        <h1>Meus Pedidos</h1>
        <div className="pedidos-lista">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-item">
              <img
                src={pedido.imagemProduto}
                alt={pedido.nomeProduto}
                className="produto-imagem"
              />
              <div className="pedido-info">
                <h3>{pedido.nomeProduto}</h3>
                <p>Vendido por: {pedido.nomeVendedor}</p>
                <p>Preço: R${pedido.precoProduto.toFixed(2)}</p>
              </div>
              <div className="pedido-status">
                <span>Status: {pedido.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };