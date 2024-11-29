import React from 'react';
import Pedidos from '../Pedidos/Pedidos'
import { Link } from 'react-router-dom';

function PerfilPage() {
  return (
    <div style={styles.container}>
      <h1>Bem-vindo à página de Perfil!</h1>
      
      <Link to="/meusprodutos" style={{ textDecoration: 'none' }}>
      <button className="btn btn-primary" style={styles.button}>Seus produtos!</button>
      </Link>
      <Link to="/pechinchas" style={{ textDecoration: 'none' }}>
        <button className="btn btn-danger" style={styles.button}>Suas Pechinchas!</button>
      </Link>

      <button onClick={Pedidos} className="btn btn-warning" style={styles.button}><Link to={`../Pedidos`}style={styles.button}>Seus Pedidos!</Link></button>

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
    color: "#000000"             // Pequeno espaçamento abaixo do título
  },
};

export default PerfilPage;