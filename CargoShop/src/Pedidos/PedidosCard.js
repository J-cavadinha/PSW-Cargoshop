import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removePedidoServer, updatePedidoServer } from "../slices/PedidoSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PedidoSchema } from "./PedidosSchema";

export default function PedidosCard({ pedido }) {
  const dispatch = useDispatch();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const {register,handleSubmit,reset,formState: { errors },
  } = useForm({
    resolver: yupResolver(PedidoSchema),
    defaultValues: { endereco: pedido.endereco },
  });

  const onSubmit = (data) => {
    const updatedPedido = { ...pedido, endereco: data.endereco };
    dispatch(updatePedidoServer(updatedPedido));
    setShowEditModal(false);
  };

  const handleCancelClick = () => setShowCancelModal(true);

  const handleConfirmCancel = async () => {
    dispatch(removePedidoServer(pedido.id));
    setShowCancelModal(false);
  };

  const handleEditClick = () => {
    reset({ endereco: pedido.endereco });
    setShowEditModal(true);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
    <div className="card shadow-sm rounded">
      <img
        src={pedido.image}
        className="card-img-top rounded-top"
        alt={pedido.name}
        style={{ objectFit: "cover", height: "200px", width: "100%" }}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate">{pedido.name}</h5>
        <p className="card-text">Valor Total: <strong>R$ {pedido.price}</strong></p>
        <p className="card-text">Vendedor: {pedido.NomeVendedor}</p>
        <p className="card-text">Endereço: {pedido.endereco}</p>
        <p className="card-text">Opção de envio: {pedido.opcaoEnvio}</p>
        <p className="card-text">Status: <span className={`badge ${pedido.status === 'Cancelado' ? 'bg-danger' : 'bg-success'}`}>{pedido.status}</span></p>
        
        <div className="d-flex justify-content-between">
          <button className="btn btn-danger btn-sm" onClick={handleCancelClick}>
            Cancelar Pedido
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleEditClick}>
            Editar
          </button>
        </div>
      </div>
    </div>
  
    {showCancelModal && (
      <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cancelar Pedido</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowCancelModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja cancelar este pedido?</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                onClick={handleConfirmCancel}
              >
                Confirmar Cancelamento
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowCancelModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  
    {showEditModal && (
      <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Endereço</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  className={`form-control ${errors.endereco ? "is-invalid" : ""}`}
                  {...register("endereco")}
                  placeholder="Novo endereço"
                />
                {errors.endereco && (
                  <div className="invalid-feedback">
                    {errors.endereco.message}
                  </div>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-success"
                onClick={handleSubmit(onSubmit)}
              >
                Confirmar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}