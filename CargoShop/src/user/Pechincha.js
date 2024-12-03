import { useEffect, React } from 'react';
import { useDispatch, useSelector  } from 'react-redux';  
import PechinchaCard from '../main/PechinchaCard';
import {selectAllPechinchas, fetchPechinchas } from '../slices/PechinchaSlice'; 

export default function Pechincha() {

  const pechinchas = useSelector(selectAllPechinchas);
  const status = useSelector(state => state.pechinchas.status);

  const dispatch = useDispatch();

  useEffect(() => {
      if (status === "not_loaded" || status === "saved" || status === "deleted") {
          dispatch(fetchPechinchas());
      } else if (status === "failed") {
          setTimeout(() => dispatch(fetchPechinchas()), 5000);
      }
  }, [status, dispatch])


  return (
    <div style={{ padding: '100px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Pechinchas</h1>

      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-4">       
        {pechinchas.map(pechincha => (  
          <PechinchaCard 
            key={pechincha.id} 
            pechincha={pechincha}  
          />
        ))}
      </div>
    </div>
  );
}