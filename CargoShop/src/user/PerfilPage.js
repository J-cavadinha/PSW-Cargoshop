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

      <Link to={"../Pedidos"} style={{textDecoration: 'none'}}>
      <button onClick={Pedidos} className="btn btn-warning" style={styles.button}>Seus Pedidos!</button>
      </Link>

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