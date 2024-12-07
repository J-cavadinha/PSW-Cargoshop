import {object, setLocale, string } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

export let PedidoSchema = object().shape({
    endereco: string().required('Campo endereço é obrigatório').max(200).default("").min(10, 'O endereço deve ter pelo menos 10 caracteres.'),
});

