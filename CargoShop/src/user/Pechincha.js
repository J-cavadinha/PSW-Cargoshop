import { useEffect, React } from 'react';
import { useDispatch, useSelector  } from 'react-redux';  
import PechinchaCard from '../main/PechinchaCard';
import {selectAllPechinchas, fetchPechinchas } from '../slices/PechinchaSlice'; 

export default function Pechincha() {

  const pechinchas = useSelector(selectAllPechinchas);
  const status = useSelector(state => state.pechinchas.status);
  const error = useSelector(state => state.pechinchas.error);

  const dispatch = useDispatch();

  useEffect(() => {
      if (status === "not_loaded" || status === "saved" || status === "deleted") {
          dispatch(fetchPechinchas());
      } else if (status === "failed") {
          setTimeout(() => dispatch(fetchPechinchas()), 5000);
      }
  }, [status, dispatch])

  let pechinchasShow = null;
    if (status === "loaded") {
        pechinchasShow = pechinchas.map(pechincha => (<PechinchaCard key={pechincha.id} pechincha={pechincha} />));
        if (pechinchasShow.length <= 0) {
            pechinchasShow = <div>Nenhuma pechincha encontrada.</div>;
        }
    } else if (status === "loading") {
        pechinchasShow = <div>Carregando as pechinchas...</div>;
    } else if (status === "failed") {
        pechinchasShow = <div>Erro: {error}</div>
    }

  return (
    <div className="container">
      <br/>
      <h1 className="text-center">Pechinchas</h1>
      <br/>

      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-4">       
        {pechinchasShow}
      </div>
    </div>
  );
}