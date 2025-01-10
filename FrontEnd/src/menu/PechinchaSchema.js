import { number, object, setLocale, string } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

export let pechinchaSchema = object().shape({
    descount : number().required().min(1).typeError("Informe uma pechincha válida.").default(0),
    buyer: string().default("")
});