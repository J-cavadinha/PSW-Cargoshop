import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addPechinchaServer, selectPechinchasById, fetchPechinchas } from "../slices/PechinchaSlice";
import { yupResolver } from '@hookform/resolvers/yup';
import { pechinchaSchema } from '../user/PechinchaSchema';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { addPedidoServer } from "../Pedidos/PedidoSlice";

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

    const [notificacao, setNotificacao] = useState('');
    const [message, setMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(pechinchaSchema)
  });
  
  const [pechinchaOnLoad] = useState(
    id ? pechinchaFound ?? pechinchaSchema.cast({}) : pechinchaSchema.cast({})
  );


  const confirmarValor = (data) => {
    // O parâmetro `data` contém os valores do formulário
    const pechincha = {
      descount: data.descount, // valor da pechincha
      name: product.name, // nome do produto (de `product`)
      price: product.price, // preço original do produto
      image: product.image, // imagem do produto
    };
  
    // Agora podemos despachar a ação para salvar no servidor
    setMessage('pechincha Enviada!');
    dispatch(addPechinchaServer(pechincha));
  };

    const ConfirmarPedido = () => {
      const novoPedido = {
        id: 0,  
        name: product.name,  
        price: product.price,    
        image: product.image,
        NomeVendedor: product.seller,
        status: 'Em andamento',
      };
      dispatch(addPedidoServer(novoPedido));

      const message = `O pedido foi adicionado!`;
      setNotificacao(message);
    };

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
            <select className="form-select mt-3">
              <option>Opção de envio</option>
              <option value="option1">Entrega simples</option>
              <option value="option2">Entrega rápida</option>
            </select>
    
            <select className="form-select mt-3">
              <option>Forma de pagamento</option>
              <option value="option1">Cartão de Crédito</option>
              <option value="option2">Cartão de Débito</option>
              <option value="option3">Boleto Bancário</option>
              <option value="option4">PIX</option>
            </select>
    
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
    
            <button className="btn btn-primary btn-lg mt-4 w-100" onClick={ConfirmarPedido} >
              Finalizar pedido
            </button>
            
          </div>
        </div>
      );
}