import { useLocation,useNavigate  } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addPechinchaServer, selectPechinchasById, fetchPechinchas } from "../slices/PechinchaSlice";
import { yupResolver } from '@hookform/resolvers/yup';
import { pechinchaSchema } from '../user/PechinchaSchema';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { selectPedidoById } from "../Pedidos/PedidoSlice";

export default function ProductDetails() {
    const location = useLocation();
    const product = location.state.product;

    const dispatch = useDispatch();


    let { id } = useParams();
  
    const status = useSelector(state => state.pechinchas.status);
  
    const pechinchaFound = useSelector(state => selectPechinchasById(state, id));
  
    useEffect(() => {
        if (status === "not_loaded" || status === 'saved' || status === 'deleted') {
            dispatch(fetchPechinchas());
        }else if(status === 'failed'){
            setTimeout(()=>dispatch(fetchPechinchas()), 5000);    
        }
    }, [status, dispatch])

    const [notificacao] = useState('');
    const [message, setMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(pechinchaSchema) 
    });
  
  const [pechinchaOnLoad] = useState(
    id ? pechinchaFound ?? pechinchaSchema.cast({}) : pechinchaSchema.cast({})
  );


  const confirmarValor = (data) => {
    const pechincha = {
      descount: data.descount,
      name: product.name,
      price: product.price,
      image: product.image,
    };

    
    setMessage('pechincha Enviada!');
    dispatch(addPechinchaServer(pechincha));
  };


    const pedido = useSelector((state) => selectPedidoById(state, id));

    const navigate = useNavigate();
    const ConfirmarPagamento = () => {
      const novoPagamento = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        NomeVendedor: product.seller,
        status: 'Em andamento',
        endereco: '',
      };
      navigate(`/pagamentosCard/${product.id}`, { state: novoPagamento });
    };
    

    useEffect(() => {
      if (!pedido) {
        console.log("Pedido ainda não carregado");
      }
    }, [pedido]);

    return (
        <div className="row mt-5">
          <div className="col-md-6">
            <img
              id="product-image"
              src={product.image}
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h2 id="product-name">{product.name}</h2>
            <div id="product-price" className="h4">
              R${product.price}
            </div>
            <div id="product-seller">Vendido por: {product.seller}</div>
            <br/>
            <p id="product-description">{product.description}</p>
            <button className="btn btn-danger btn-lg mt-4 w-100" data-bs-toggle="collapse" data-bs-target="#valorOptions">PECHINCHAR!</button>
    
            <div className="collapse" id="valorOptions">
              <div className="card card-body mt-3">
                <h5>Insira o valor que você deseja pechinchar:</h5>
                <form onSubmit={handleSubmit(confirmarValor)}>
            <div className="input-group">
                        <span className="input-group-text">R$</span>
                        <input
                            placeholder="Insira o valor do produto"
                            type="number"
                            step="0.01"
                            className="form-control"
                            id="price"
                            defaultValue={pechinchaOnLoad.descount}
                            {...register("descount")}
                        />
                    </div>
                    {errors.descount && <span>{errors.descount.message}</span>}
                <button className="btn btn-danger mt-3">
                  Confirmar Pechincha!
                </button>
                {message && (
              <div className="alert alert-success mt-3">
                {message}
              </div>
            )}
              </form>
              </div>
            </div>
    
            <div id="notificacao" className="alert alert-info mt-3" style={{ display: `${notificacao ? 'block' : 'none'}`}}>
              {notificacao}
            </div>
            
            <button className="btn btn-primary btn-lg mt-4 w-100" onClick={ConfirmarPagamento}>
              Finalizar pedido
              
            </button>
            
          </div>
          
        </div>
      );
}

