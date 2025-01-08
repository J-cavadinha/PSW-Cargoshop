import { number, object, setLocale, string } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

export let reviewSchema = object().shape({
    rate: number().required().min(0).max(10).default(0).typeError("Insira uma nota válida."),
    message: string().required().max(300).default("")
});