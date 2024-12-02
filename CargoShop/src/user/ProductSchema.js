import { number, object, setLocale, string } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

export let productSchema = object().shape({
    id: string(),
    name: string().required().max(100).default(""),
    description: string().required().max(300).default(""),
    price: number().required().min(1).typeError("Informe um preço válido.").default(0),
    category: string(),
    seller: string().default("Leonardo Pinto"),
    image: string().default("https://escoladegoverno.rs.gov.br/wp-content/uploads/2023/05/placeholder-1.png").url("Informe uma URL válida.")
});