import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removePechincha, updatePechincha } from '../slices/PechinchaSlice'; // Importando as ações do Redux
import '../PechinchaCard.css';

export default function PechinchaCard({ pechincha }) {
  const dispatch = useDispatch();  // Hook para disparar ações do Redux

  const [showCancelModal, setShowCancelModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [pechinchaValue, setPechinchaValue] = useState(pechincha.discount);  // Inicializando com o valor de desconto
  const [notificacao, setNotificacao] = useState('');

  // Função para atualizar o valor da pechincha
  const handlePechinchaChange = (event) => {
    setPechinchaValue(parseFloat(event.target.value));
  };

  // Exibir o modal de cancelamento
  const handleCancelClick = () => {
    setShowCancelModal(true); 
  };

  // Exibir o modal de edição
  const handleEditClick = () => {
    setShowEditModal(true);
  };

  // Confirmar a edição da pechincha (atualiza no Redux)
  const handleConfirmEdit = () => {
    const updatedPechincha = {
      ...pechincha,
      discount: pechinchaValue, // Atualizando o desconto
    };
    dispatch(updatePechincha({ id: pechincha.id, updatedPechincha })); // Disparando a ação para atualizar
    setNotificacao(`Pechincha atualizada para R$${pechinchaValue.toFixed(2)}`);
    setShowEditModal(false);
  };

  // Confirmar o cancelamento da pechincha (remove do Redux)
  const handleConfirmCancel = () => {
    dispatch(removePechincha(pechincha.id)); // Disparando a ação para remover
    setShowCancelModal(false);
  };

  // Fechar o modal de cancelamento
  const handleCloseCancelModal = () => {
    setShowCancelModal(false); 
  };

  // Fechar o modal de edição
  const handleCloseEditModal = () => {
    setShowEditModal(false); 
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card pechincha" style={{ position: 'relative' }}>
        <img src={pechincha.image} className="card-img-top" alt={pechincha.name} />
        <div className="card-body">
          <h5 className="card-title">{pechincha.name}</h5>
          <p className="card-text">Valor Total: R$ {pechincha.price}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className="card-text">Pechincha: R$ {pechincha.discount}</p>
            <p className="card-text">Valor Pechinchado: R$ {pechincha.price - pechincha.discount}</p>
          </div>
          <div className="button-container">
            <button className="btn btn-danger button" onClick={handleCancelClick}>
              Cancelar Pechincha
            </button>
            <button className="btn btn-success" onClick={handleEditClick}>
              Editar Pechincha
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Cancelamento */}
      {showCancelModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Tem certeza que deseja cancelar a pechincha?</h4>
            <button className="btn btn-danger" onClick={handleConfirmCancel}>Confirmar</button>
            <button className="btn btn-success" onClick={handleCloseCancelModal}>Cancelar</button>
          </div>
        </div>
      )}
        
      {/* Modal de Edição */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Insira Valor novo de Pechincha:</h4>
            <input
              type="number"
              id="valorInput"
              className="form-control"
              placeholder="R$"
              step="0.1"
              min={pechincha.price * 0.7}
              value={pechinchaValue}
              onChange={handlePechinchaChange}
            />
            <button className="btn btn-danger" onClick={handleConfirmEdit}>Confirmar</button>
            <button className="btn btn-success" onClick={handleCloseEditModal}>Cancelar</button>
            <div id="notificacao" className="alert alert-info mt-3" style={{ display: `${notificacao ? 'block' : 'none'}` }}>
              {notificacao}
              <button className="btn btn-success" onClick={handleCloseEditModal}>Sair</button>
            </div> 
          </div>
        </div>
      )}
    </div>
  );
}

