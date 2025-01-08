import { object, setLocale, string } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

export let PagamentoSchema  = object().shape({
    endereco: string().min(5, "O endereço deve ter no mínimo 5 caracteres"),
    opcaoEnvio: string().required("Selecione uma opção de envio."),
    formaPagamento: string().required("Selecione uma forma de pagamento."),
  });