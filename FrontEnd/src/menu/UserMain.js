import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutServer } from '../slices/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';

function Button({ children }) {
  return (
    <button className={`btn btn-primary btn-lg my-2`} style={{ padding: '1rem 2rem' }}>
      {children}
    </button>
  );
}

function UserMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(state => state.logins.status);

  useEffect(() => {
    if (status === "not_logged_in") {
      navigate("/");
    }
  }, [status, navigate]);

  return (
    <div className="d-flex flex-column align-items-center">
      <br />
      <h1>Usuário</h1>
      <br />
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
      <Link to="/avaliacoes" className="text-decoration-none">
        <Button>Avaliações</Button>
      </Link>
      <button 
        className={`btn btn-danger btn-lg my-2`}
        style={{ padding: '1rem 2rem' }}
        onClick={() => dispatch(logoutServer())}
      >Sair</button>
    </div>
  );
}

export default UserMain;
