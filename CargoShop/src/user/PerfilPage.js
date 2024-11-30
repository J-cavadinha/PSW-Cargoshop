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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',  
    alignItems: 'center',          
    height: '100vh',               
    paddingTop: '20px',            
  },
  button: {
    fontSize: '1.5rem',
    padding: '1rem 2rem',
    marginTop: '50px',
    textDecoration: "none",
    color: "#000000"             
  },
};

export default PerfilPage;