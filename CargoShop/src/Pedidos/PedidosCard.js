import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchPedidos, removePedidos, updatePedidos } from './PedidoSlice';

export default function PedidosCard({ pedido }) {
  const dispatch = useDispatch();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [novoEndereco, setnovoEndereco] = useState(pedido.endereco);
  const [notificacao, setNotificacao] = useState('');

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };
  const status = useSelector(state => state.products.status);
  useEffect(() => {
    if (status === "not_loaded") {
        dispatch(fetchPedidos());
    }
  }, [status, dispatch])

  const handleConfirmCancel = async () => {
    try {
      const response = await fetch(`http://localhost:3004/pedidos/${pedido.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        dispatch(removePedidos(pedido.id));
        handleCloseCancelModal();
      } else {
        setNotificacao('Erro ao cancelar o pedido. Tente novamente.');
      }
    } catch (error) {
      setNotificacao('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleConfirmEdit = async () => {
    const updatedPedido = { ...pedido, endereco: novoEndereco };
    try {
      const response = await fetch(`http://localhost:3004/pedidos/${pedido.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPedido),
      });
      if (response.ok) {
        const updatedPedidoFromServer = await response.json();
        dispatch(updatePedidos({ id: pedido.id, updatedPedido: updatedPedidoFromServer }));
        setNotificacao('Endereço atualizado com sucesso!');
        setShowEditModal(false);
      } else {
        setNotificacao('Erro ao atualizar o endereço. Tente novamente.');
      }
    } catch (error) {
      setNotificacao('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card shadow-lg" style={{ position: 'relative' }}>
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
          <p className="card-text">
            Status: <span className="badge bg-info">{pedido.status}</span>
          </p>
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger" onClick={handleCancelClick}>
              Cancelar Pedido
            </button>
            <button className="btn btn-primary" onClick={handleEditClick}>
              Editar
            </button>
          </div>
        </div>
      </div>

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
                <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={novoEndereco}
                  onChange={(e) => setnovoEndereco(e.target.value)}
                  placeholder="Novo endereço"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleConfirmEdit}>
                  Confirmar
                </button>
                <button className="btn btn-secondary" onClick={handleCloseEditModal}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {notificacao && <div className="alert alert-warning mt-3">{notificacao}</div>}
    </div>
  );
}
