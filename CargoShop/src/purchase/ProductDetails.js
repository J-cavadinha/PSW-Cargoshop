import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addPechinchaServer, selectAllPechinchas, fetchPechinchas } from "../slices/PechinchaSlice";
import { yupResolver } from '@hookform/resolvers/yup';
import { pechinchaSchema } from '../user/PechinchaSchema';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { selectPedidoById } from "../Pedidos/PedidoSlice";

export default function ProductDetails() {
    const location = useLocation();
    const product = location.state.product;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let { id } = useParams();
  
    const status = useSelector(state => state.pechinchas.status);
  
    const pechinchas = useSelector(selectAllPechinchas);
  
    useEffect(() => {
        if (status === "not_loaded" || status === 'saved' || status === 'deleted') {
            dispatch(fetchPechinchas());
        } else if (status === 'failed') {
            setTimeout(() => dispatch(fetchPechinchas()), 5000);    
        }
    }, [status, dispatch]);

    const [notificacao] = useState('');
    const [message, setMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(pechinchaSchema) 
    });

    const pechinchaFound = pechinchas.find(p => p.idtest === product.id);

    const confirmarValor = (data) => {
        const pechincha = {
            descount: data.descount,
            name: product.name,
            price: product.price,
            image: product.image,
            idtest: product.id,
        };
        

        if (pechinchaFound) {
            setMessage('Já existe uma pechincha neste produto! Você pode alterá-la na página de pechinchas.');
            console.log('Pechincha já existente:', pechinchaFound);
            return; 
        }
        
        setMessage('Pechincha enviada!');
        dispatch(addPechinchaServer(pechincha));
        setTimeout(() => navigate("/pechinchas"), 1000);
    };

    const pedido = useSelector((state) => selectPedidoById(state, id));

    const ConfirmarPagamento = () => {
        const novoPagamento = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            NomeVendedor: product.seller,
            status: 'Finalizado',
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
                        <h5>Insira o valor da pechincha(novo valor do produto:):</h5>
                        <br/>
                        <form onSubmit={handleSubmit(confirmarValor)}>
                            <div className="input-group">
                                <span className="input-group-text">R$</span>
                                <input
                                    placeholder="Insira o valor do produto"
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    id="price"
                                    max={0.9*product.price}
                                    min={0.1*product.price}
                                    defaultValue={pechinchaFound?.descount || ''}
                                    {...register("descount")}
                                />
                            </div>
                            {errors.descount && <span>{errors.descount.message}</span>}
                            <br/>
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