import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { fetchPechinchas, removePechinchaServer} from '../slices/PechinchaSlice';
import { selectProductsById, updateProductServer } from '../slices/ProductsSlice';
import '../PechinchaCard.css';


export default function PechinchaCard({ pechincha }) {

  
  const status = useSelector(state => state.pechinchas.status);

  const productFound = useSelector(state => selectProductsById(state, pechincha.idProduct));
 
  const dispatch = useDispatch();
  
  useEffect(() => {
      if (status === "not_loaded" || status === 'saved' || status === 'deleted') {
          dispatch(fetchPechinchas());
      }else if(status === 'failed'){
          setTimeout(()=>dispatch(fetchPechinchas()), 5000);    
      }
  }, [status, dispatch])

  const handleConfirm = () => {

    dispatch(updateProductServer({ ...productFound, price: pechincha.descount }));
    dispatch(removePechinchaServer(pechincha.id));   
  };

  const handleCancel = async () => {
    dispatch(removePechinchaServer(pechincha.id));
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
            <button className="btn btn-success button" onClick={handleConfirm}>
              Confirmar
            </button>
            <button className="btn btn-danger" onClick={handleCancel}>
              Recusar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

