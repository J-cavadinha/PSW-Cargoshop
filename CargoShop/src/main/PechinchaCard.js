import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { fetchPechinchas, removePechinchaServer, updatePechinchaServer, selectPechinchasById} from '../slices/PechinchaSlice';
import { selectProductsById} from '../slices/ProductsSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { pechinchaSchema } from '../user/PechinchaSchema';
import { useForm } from 'react-hook-form';
import '../PechinchaCard.css';


export default function PechinchaCard({ pechincha }) {

  let { id } = useParams();
  
  const status = useSelector(state => state.pechinchas.status);

  const pechinchaFound = useSelector(state => selectPechinchasById(state, id));

  const productFound = useSelector(state => selectProductsById(state, pechincha.idProduct));
 
  const dispatch = useDispatch();
  
  useEffect(() => {
      if (status === "not_loaded" || status === 'saved' || status === 'deleted') {
          dispatch(fetchPechinchas());
      }else if(status === 'failed'){
          setTimeout(()=>dispatch(fetchPechinchas()), 5000);    
      }
  }, [status, dispatch])

  const [showCancelModal, setShowCancelModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [message, setMessage] = useState('');


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(pechinchaSchema)
});

const [pechinchaOnLoad] = useState(
  id ? pechinchaFound ?? pechinchaSchema.cast({}) : pechinchaSchema.cast({})
);
 
  const handleCancelClick = () => {
    setShowCancelModal(true); 
  };


  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleConfirmEdit = async (data) => {
    dispatch(updatePechinchaServer({ ...pechincha, descount: data.descount }));
    setMessage('Pechincha editada com sucesso!');
  };


  const handleConfirmCancel = async () => {
    dispatch(removePechinchaServer(pechincha.id));   
    setShowCancelModal(false);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false); 
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false); 
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card pechincha" style={{ position: 'relative' }}>
        <img src={pechincha.image} className="card-img-top" alt={productFound.name} style={{ objectFit: "cover", height: "200px" }}  />
        <div className="card-body">
          <h5 className="card-title">{pechincha.name}</h5>
          <p className="card-text">Valor Total: R$ {productFound.price}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className="card-text">Valor Pechinchado: R$ {pechincha.descount}</p>
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

    
      {showCancelModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Tem certeza que deseja cancelar a pechincha?</h4>
            <button className="btn btn-danger my-1"onClick={handleConfirmCancel}>Confirmar</button>
            <button className="btn btn-success my-1" onClick={handleCloseCancelModal}>Cancelar</button>
          </div>
        </div>
      )}
        
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
          <form onSubmit={handleSubmit(handleConfirmEdit)}>
            <h4>Insira Valor novo de Pechincha:</h4>
            <br/>
            <div className="input-group">
                        <span className="input-group-text">R$</span>
                        <input
                            placeholder="Insira o valor do produto"
                            type="number"
                            step="0.01"
                            className="form-control"
                            id="price"
                            max={0.9*pechincha.price}
                            min={0.1*pechincha.price}
                            defaultValue={pechinchaOnLoad.descount}
                            {...register("descount")}
                        />
                    </div>
                    {errors.descount && <span>{errors.descount.message}</span>}
                    <br/>
            <button className="btn btn-success my-1 mx-1">Confirmar</button>
            {message && (
              <div className="alert alert-success mt-3">
                {message}
              </div>
            )}

            <button className="btn btn-danger my-1 mx-1" onClick={handleCloseEditModal}>Cancelar</button>
            </form>   
          </div>
          
        </div>
      )}
    </div>
  );
}

