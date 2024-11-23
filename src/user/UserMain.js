import React from 'react';

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
      <Button onClick={() => alert('Clicou no botão Perfil')}>Perfil</Button>
      <Button className="secondary" onClick={() => alert('Clicou no botão Configurações')}>Configurações</Button>
      <Button className="success" onClick={() => alert('Clicou no botão Ajuda')}>Ajuda</Button>
      <Button className="danger" onClick={() => alert('Clicou no botão Relatório')}>Relatório</Button>
    </div>
  );
}

export default UserMain;