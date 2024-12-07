import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addPedidoServer } from "../Pedidos/PedidoSlice";
import { useDispatch } from "react-redux";

export default function PagamentosCard() {
  const location = useLocation();
  const novoPagamento = location.state || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [endereco, setEndereco] = useState("");

  const finalizarPedido = async () => {
    const pedidoAtualizado = {
      ...novoPagamento,
      endereco,
    };
    console.log("Pedido finalizado:", pedidoAtualizado);
    dispatch(addPedidoServer(pedidoAtualizado));
  };

  const handleEnderecoChange = (e) => {
    setEndereco(e.target.value);
  };

  useEffect(() => {
    if (!novoPagamento) {
      console.log("Erro: Dados de pagamento não encontrados");
      alert("Erro: Dados de pagamento não encontrados.");
      navigate("/");
    }
  }, [novoPagamento, navigate]);

  if (!novoPagamento) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Pagamento</h1>

      <div className="d-flex mt-3">
        <div className="me-3">
          <img
            src={novoPagamento.image}
            alt="Descrição da imagem"
            className="img-fluid rounded"
            style={{ maxWidth: "200px" }}
          />
        </div>

        <div className="flex-grow-1">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{novoPagamento.name}</h5>
              <p>Preço: R$ {novoPagamento.price}</p>
              <p>Vendedor: {novoPagamento.NomeVendedor}</p>
              <p>Endereço cadastrado: {endereco || "Nenhum endereço informado"}</p>

              <label htmlFor="endereco" className="form-label mt-3">
                Endereço de entrega:
              </label>
              <input
                type="text"
                id="endereco"
                value={endereco}
                onChange={handleEnderecoChange}
                className="form-control"
              />

              <button
                className="btn btn-primary mt-4 w-100"
                onClick={finalizarPedido}
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
