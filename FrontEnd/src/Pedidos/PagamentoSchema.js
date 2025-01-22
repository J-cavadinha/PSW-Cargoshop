import { object, setLocale, string } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

export let PagamentoSchema  = object().shape({
    endereco: string().min(12, "O endereço deve ter no mínimo 12 caracteres"),
    opcaoEnvio: string().required("Selecione uma opção de envio."),
    formaPagamento: string().required("Selecione uma forma de pagamento."),
  });