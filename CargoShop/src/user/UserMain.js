import React from 'react';
import { Link } from 'react-router-dom';

function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      style={{
        fontSize: '1.5rem',
        padding: '1rem 2rem',
        margin: '1rem 0',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function UserMain() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <br/>
      <h1>Usuário</h1>
      <br/>
      <Link to="/meusprodutos" style={{ textDecoration: 'none' }}>
        <Button>Produtos</Button>
      </Link>
      <Link to="/pechinchas" style={{ textDecoration: 'none' }}>
        <Button>Pechinchas</Button>
      </Link>
      <Link to="/pedidos" style={{ textDecoration: 'none' }}>
        <Button>Pedidos</Button>
      </Link>
      <Link to="/compras" style={{ textDecoration: 'none' }}>
        <Button>Compras</Button>
      </Link>
      <Link to="/vendas" style={{ textDecoration: 'none' }}>
        <Button>Vendas</Button>
      </Link>
    </div>
  );
}

export default UserMain;