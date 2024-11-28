import React from 'react';

function PerfilPage() {
  return (
    <div style={styles.container}>
      <h1>Bem-vindo à página de Perfil!</h1>
      
      {/* Botão colado abaixo do título */}
      <button className="btn btn-primary" style={styles.button}>Seus produtos!</button>
      <button className="btn btn-danger" style={styles.button}>Suas Pechinchas!</button>
      <button className="btn btn-warning" style={styles.button}>Seus Pedidos!</button>
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
    marginTop: '10px',             // Pequeno espaçamento abaixo do título
  },
};

export default PerfilPage;