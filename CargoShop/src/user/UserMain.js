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
      <Link to="/perfil" style={{ textDecoration: 'none' }}>
        <Button>Perfil</Button>
      </Link>
      <Button className="secondary" onClick={() => alert('Clicou no botão Configurações')}>Configurações</Button>
      <Button className="danger" onClick={() => alert('Clicou no botão Relatório')}>Relatórios</Button>
    </div>
  );
}

export default UserMain;