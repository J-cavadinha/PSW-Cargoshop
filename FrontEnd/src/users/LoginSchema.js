import { object, setLocale, string } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

export let loginSchema = object().shape({
    username: string().required().min(4).max(40).default(""),
    password: string().required().min(8).max(20).default("")
});