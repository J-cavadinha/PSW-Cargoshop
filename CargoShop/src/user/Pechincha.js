import React from 'react';
import { useSelector, useDispatch } from 'react-redux';  
import PechinchaCard from '../main/PechinchaCard';  
import { removePechincha } from '../slices/PechinchaSlice'; 

export default function Pechincha() {

  
  const pechinchas = useSelector(state => state.pechinchas.pechinchas); 
  const dispatch = useDispatch();  

  const handleDelete = (id) => {
    dispatch(removePechincha(id)); 
  };

  return (
    <div style={{ padding: '100px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Pechinchas</h1>

      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-4">       
        {pechinchas.map(pechincha => (  
          <PechinchaCard 
            key={pechincha.id} 
            pechincha={pechincha} 
            onDelete={handleDelete}  
          />
        ))}
      </div>
    </div>
  );
}