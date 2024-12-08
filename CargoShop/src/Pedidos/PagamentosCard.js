import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addPedidoServer } from "../Pedidos/PedidoSlice";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { PedidoSchema } from "./PedidosSchema";
import { useForm } from "react-hook-form";

export default function PagamentosCard() {
  const location = useLocation();
  const novoPagamento = location.state || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {register, handleSubmit,formState: { errors },} = useForm({
    resolver: yupResolver(PedidoSchema),
  });

  const [endereco] = useState("");

  const finalizarPedido = async (data) => {
    const pedidoAtualizado = {
      ...novoPagamento,
      endereco: data.endereco,
      opcaoEnvio: data.opcaoEnvio,
      formaPagamento: data.formaPagamento,
    };

    try {
      const resultAction = await dispatch(addPedidoServer(pedidoAtualizado));
      if (addPedidoServer.fulfilled.match(resultAction)) {
        console.log("Pedido finalizado:", pedidoAtualizado);
        alert("Pedido adicionado com sucesso!");
        navigate("/pedidos");
      } else {
        alert("Erro: Já existe um pedido com esse ID!");
        navigate("/");
      }
    } catch (error) {
      alert("Erro ao adicionar o pedido. Tente novamente!");
    }
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

              <form onSubmit={handleSubmit(finalizarPedido)}>
                <label htmlFor="opcaoEnvio" className="form-label mt-3">
                  Opção de envio:
                </label>
                <select
                  id="opcaoEnvio"
                  {...register("opcaoEnvio", { required: "Selecione uma opção de envio." })}
                  className={`form-select form-select-lg mt-3 border-primary shadow-sm ${
                    errors.opcaoEnvio ? "is-invalid" : ""
                  }`}
                >
                  <option value="" className="text-muted">
                    Selecione uma opção
                  </option>
                  <option value="Entrega simples">Entrega simples</option>
                  <option value="Entrega rápida">Entrega rápida</option>
                </select>
                <div className="invalid-feedback">{errors.opcaoEnvio?.message}</div>

                <label htmlFor="formaPagamento" className="form-label mt-3">
                  Forma de pagamento:
                </label>
                <select
                  id="formaPagamento"
                  {...register("formaPagamento", { required: "Selecione uma forma de pagamento." })}
                  className={`form-select form-select-lg mt-3 border-primary shadow-sm ${
                    errors.formaPagamento ? "is-invalid" : ""
                  }`}
                >
                  <option value="" className="text-muted">
                    Selecione uma forma de pagamento
                  </option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Boleto Bancário">Boleto Bancário</option>
                  <option value="PIX">PIX</option>
                </select>
                <div className="invalid-feedback">{errors.formaPagamento?.message}</div>

                <label htmlFor="endereco" className="form-label mt-3">
                  Endereço de entrega:
                </label>
                <input
                  type="text"
                  id="endereco"
                  {...register("endereco")}
                  className={`form-control ${errors.endereco ? "is-invalid" : ""}`}
                  placeholder="Digite o endereço"
                />
                <div className="invalid-feedback">{errors.endereco?.message}</div>

                <button type="submit" className="btn btn-primary mt-4 w-100">
                  Finalizar Pedido
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
