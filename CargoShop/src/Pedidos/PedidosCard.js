import {React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removePedidos, updatePedidos } from './PedidoSlice';


export default function PedidosCard({ pedido }) {
    const dispatch = useDispatch();
  
    const [showCancelModal, setShowCancelModal] = useState(false); 
    //const [showEditModal, setShowEditModal] = useState(false);
    //const [notificacao, setNotificacao] = useState('');

    // Exibir o modal de cancelamento
  const handleCancelClick = () => {
    setShowCancelModal(true); 
  };

  // Confirmar o cancelamento da pechincha
  const handleConfirmCancel = () => {
    dispatch(removePedidos(pedido.id));
    setShowCancelModal(false);
  };

  // Fechar o modal de cancelamento
  const handleCloseCancelModal = () => {
    setShowCancelModal(false); 
  };
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card pechincha shadow-lg" style={{ position: 'relative' }}>
        <img
          src={pedido.image}
          className="card-img-top"
          alt={pedido.name}
          style={{
            objectFit: 'cover',
            height: '200px',
            width: '100%',
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{pedido.name}</h5>
          <div className="d-flex justify-content-between mb-3">
            <p className="card-text">Valor Total: R$ {pedido.price}</p>
          </div>
          <p className="card-text">Vendedor: {pedido.NomeVendedor}</p>
          <div className="mb-3">
            <p className="card-text">
              Status: <span className="badge bg-info">{pedido.status}</span>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-danger btn-lg w-45 rounded-pill shadow-sm hover-shadow"
              onClick={handleCancelClick}
            >
              Cancelar Pedido
            </button>
            <button
              className="btn btn-success btn-lg w-45 rounded-pill shadow-sm hover-shadow"
              onClick={() => alert('Editar Pedido')}
            >
              Editar Pedido
            </button>
          </div>
        </div>
      </div>
  
      {/* Modal de Cancelamento */}
      {showCancelModal && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Cancelamento</h5>
                <button type="button" className="btn-close" onClick={handleCloseCancelModal}></button>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja cancelar este pedido?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={handleConfirmCancel}>
                  Confirmar
                </button>
                <button className="btn btn-secondary" onClick={handleCloseCancelModal}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}  