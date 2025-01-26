import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PechinchaCard from '../main/PechinchaCard';
import PechinchaCardOwn from '../main/PechinchaCardOwn';
import { selectAllPechinchas, fetchPechinchas } from '../slices/PechinchaSlice';

export default function Pechincha() {

  const pechinchas = useSelector(selectAllPechinchas);
  const status = useSelector(state => state.pechinchas.status);
  const error = useSelector(state => state.pechinchas.error);
  const buyer = useSelector(state => state.logins.username);

  const dispatch = useDispatch();

  useEffect(() => {
      if (status === "not_loaded" || status === "saved" || status === "deleted") {
          dispatch(fetchPechinchas());
      } else if (status === "failed") {
          setTimeout(() => dispatch(fetchPechinchas()), 5000);
      }
  }, [status, dispatch]);

  // Filtrando as pechinchas feitas pelo comprador
  const filteredPechinchas = pechinchas.filter(pechincha => {
    return pechincha.buyer === buyer && pechincha.pstatus !== 'aceito'; // Excluindo as pechinchas aceitas
  });

  // Filtrando as pechinchas recebidas pelo vendedor
  const filteredPechinchasOwn = pechinchas.filter(pechincha => {
    return pechincha.seller === buyer && pechincha.pstatus !== 'aceito'; // Excluindo as pechinchas aceitas
  });

  let pechinchasShow = null;
  let pechinchasOwnShow = null;

  if (status === "loaded") {
    pechinchasShow = filteredPechinchas.length > 0 ? filteredPechinchas.map(pechincha => (
      <PechinchaCard key={pechincha.id} pechincha={pechincha} />
    )) : <div>Nenhuma pechincha encontrada.</div>;

    pechinchasOwnShow = filteredPechinchasOwn.length > 0 ? filteredPechinchasOwn.map(pechincha => (
      <PechinchaCardOwn key={pechincha.id} id={pechincha.id} />
    )) : <div>Nenhuma pechincha encontrada.</div>;
  } else if (status === "loading") {
    pechinchasShow = <div>Carregando as pechinchas...</div>;
    pechinchasOwnShow = <div>Carregando as pechinchas...</div>;
  } else if (status === "failed") {
    pechinchasShow = <div>Erro: {error}</div>;
    pechinchasOwnShow = <div>Erro: {error}</div>;
  }

  return (
    <div>
      <br />
      <h2 className="text-center">Pechinchas</h2>
      <br />
      <br />
      <h2>Feitas</h2>
      <br />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {pechinchasShow}
      </div>
      <br />
      <h2>Recebidas</h2>
      <br />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {pechinchasOwnShow}
      </div>
    </div>
  );
}
