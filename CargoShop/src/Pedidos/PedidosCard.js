import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { removePedidoServer, updatePedidoServer } from './PedidoSlice';

export default function PedidosCard({ pedido }) {
  const dispatch = useDispatch();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEndereco, setNewEndereco] = useState(pedido.endereco);

  const handleCancelClick = () => setShowCancelModal(true);

  const handleConfirmCancel = async () => {
    dispatch(removePedidoServer(pedido.id));
    setShowCancelModal(false);
  };

  const handleEditClick = () => setShowEditModal(true);

  const handleConfirmEdit = () => {
    const updatedPedido = { ...pedido, endereco: newEndereco };
    dispatch(updatePedidoServer(updatedPedido));
    setShowEditModal(false);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card shadow-lg">
        <img
          src={pedido.image}
          className="card-img-top"
          alt={pedido.name}
          style={{ objectFit: 'cover', height: '200px', width: '100%' }}
        />
        <div className="card-body">
          <h5 className="card-title">{pedido.name}</h5>
          <p className="card-text">Valor Total: R$ {pedido.price}</p>
          <p className="card-text">Vendedor: {pedido.NomeVendedor}</p>
          <p className="card-text">Endereço: {pedido.endereco}</p>
          <button className="btn btn-danger" onClick={handleCancelClick}>
            Cancelar Pedido
          </button>
          <button className="btn btn-primary" onClick={handleEditClick}>
            Editar
          </button>
        </div>
      </div>

      {showCancelModal && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cancelar Pedido</h5>
                <button type="button" className="btn-close" onClick={() => setShowCancelModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja cancelar este pedido?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={handleConfirmCancel}>
                  Confirmar Cancelamento
                </button>
                <button className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Endereço</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={newEndereco}
                  onChange={(e) => setNewEndereco(e.target.value)}
                  placeholder="Novo endereço"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleConfirmEdit}>
                  Confirmar
                </button>
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
