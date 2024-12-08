import { object, setLocale, string } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

export let PedidoSchema = object().shape({
  endereco: string().required("Campo endereço é obrigatório").max(200, "O endereço pode ter no máximo 200 caracteres.")
    .min(10, "O endereço deve ter pelo menos 10 caracteres."),
  opcaoEnvio: string().required("Selecione uma opção de envio."),
  formaPagamento: string().required("Selecione uma forma de pagamento."),
});
