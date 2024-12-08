import React from 'react';
import { Link } from 'react-router-dom';

function Button({ children }) {
  return (
    <button className={`btn btn-primary btn-lg my-2`} style={{ padding: '1rem 2rem' }}>
      {children}
    </button>
  );
}

function UserMain() {
  return (
    <div className="d-flex flex-column align-items-center">
      <br/>
      <h1>Usuário</h1>
      <br/>
      <Link to="/meusprodutos" className="text-decoration-none">
        <Button>Produtos</Button>
      </Link>
      <Link to="/pechinchas" className="text-decoration-none">
        <Button>Pechinchas</Button>
      </Link>
      <Link to="/pedidos" className="text-decoration-none">
        <Button>Pedidos</Button>
      </Link>
      <Link to="/compras" className="text-decoration-none">
        <Button>Compras</Button>
      </Link>
      <Link to="/vendas" className="text-decoration-none">
        <Button>Vendas</Button>
      </Link>
    </div>
  );
}

export default UserMain;
