import { toast, Slide } from "react-toastify";

const paramsToast =  { 
    transition: Slide, 
    hideProgressBar: true, 
    theme: "colored"  
}

export const toastInserido = () => {
    toast.success('Registro Inserido com Sucesso.', paramsToast);
}

export const toastAlterado = () => {
    toast.success('Registro Alterado com Sucesso.', paramsToast);   
}

export const toastExcluido = () => {
    toast.success('Registro Excluído com Sucesso.', paramsToast);   
}

export const toastInformacao = (msg) => {
    toast.info(msg, paramsToast);
}

export const toastErro = (msg) => {
    toast.error(msg, paramsToast);
}

export const toastSucesso = (msg) => {
    toast.success(msg, paramsToast);
}