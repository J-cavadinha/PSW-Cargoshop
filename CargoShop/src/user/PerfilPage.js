import React from 'react';
import { Link } from 'react-router-dom';

function PerfilPage() {
  return (
    <div style={styles.container}>
      <h1>Perfil</h1>
      
      <Link to="/meusprodutos" style={{ textDecoration: 'none' }}><button className="btn btn-primary" style={styles.button}>Produtos</button></Link>
      <Link to="/pechinchas" style={{ textDecoration: 'none' }}><button className="btn btn-danger" style={styles.button}>Pechinchas</button></Link>
      <Link to="/pedidos" style={{ textDecoration: 'none' }}><button className="btn btn-warning" style={styles.button}>Pedidos</button></Link>

    </div>
  );
}

// Estilos para centralizar o conteúdo e o botão
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',  // Alinha os itens no topo da tela
    alignItems: 'center',          // Centraliza horizontalmente
    height: '100vh',               // Ocupa toda a altura da tela
    paddingTop: '20px',            // Adiciona um pequeno espaço acima do conteúdo
  },
  button: {
    fontSize: '1.5rem',
    padding: '1rem 2rem',
    marginTop: '100px',
    textDecoration: "none",
    color: "#000000"
  },
};

export default PerfilPage;