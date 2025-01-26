import { number, object, setLocale, string } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

export let productSchema = object().shape({
    name: string().required().max(100).default(""),
    description: string().required().max(300).default(""),
    price: number().required().typeError("Informe um preço válido.").default(0),
    category: string(),
    seller: string().default("")
});