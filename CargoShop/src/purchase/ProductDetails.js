import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function ProductDetails() {
    const location = useLocation();
    const product = location.state.product;

    const [pechinchaValue, setPechinchaValue] = useState(0);
    const [notificacao, setNotificacao] = useState('');

    const handlePechinchaChange = (event) => {
        setPechinchaValue(parseFloat(event.target.value));
    };

    const confirmarValor = () => {
        const message = `Você ofereceu R$${pechinchaValue.toFixed(2)} de pechincha! Pechinca adicionada a suas pechinchas!`;
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
                <input
                  type="number"
                  id="valorInput"
                  className="form-control"
                  placeholder="R$"
                  min={product.price * 0.7}
                  step="0.1"
                  value={pechinchaValue}
                  onChange={handlePechinchaChange}
                />
                <button className="btn btn-danger mt-3" onClick={confirmarValor}>
                  Confirmar Pechincha!
                </button>
              </div>
            </div>
    
            <div id="notificacao" className="alert alert-info mt-3" style={{ display: `${notificacao ? 'block' : 'none'}`}}>
              {notificacao}
            </div>
    
            <button className="btn btn-primary btn-lg mt-4 w-100">
              Finalizar pedido
            </button>
          </div>
        </div>
      );
}