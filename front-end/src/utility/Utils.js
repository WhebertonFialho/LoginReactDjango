import { useNavigate } from "react-router-dom";
import { toastErro } from "../components/Toast";
import { AuthProvider } from "./auth";
import { useContext } from "react";
import { format } from 'date-fns';

export const isUserLoggedIn = () => localStorage.getItem('token');

export const getUserData = () => JSON.parse(localStorage.getItem('userData'));

export const styleReactSelect = {
  control: (baseStyles, state ) => ({
    ...baseStyles,
    height: 58,
    backgroundColor: state.isDisabled ? '#d8dbe0' : 'white',
    borderColor: '#b1b7c1'
  }),
  singleValue: baseStyles => ({
    ...baseStyles,
    color: '#121212'
  })
}

export const styleReactSelectInvalid = (invalido) => ({
  control: (baseStyles, state) => ({
    ...baseStyles,
    height: 58,
    backgroundColor: state.isDisabled ? '#d8dbe0' : 'white',
    borderColor: invalido ? '#b1b7c1' : 'red'
  }),
  singleValue: baseStyles => ({
    ...baseStyles,
    color: '#121212'
  })
});

export const TokenExpirado = async () => {
  const { logOut } = useContext(AuthProvider);
  const navigate = useNavigate();
  
  toastErro('Login expirado');
  
  await logOut().then((res) => {
      navigate('/'); 
    }).catch((err)=> {
      console.log(err);
    }) 
}

//CONVERTER PARA DD/MM/YYYY
export const parseDMY = data => {
  if(data === '1900-01-01')
    return ''

  const [ ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`;
};

//CONVERTER PARA DD/MM/YYYY
export const parseYMD = (value) => {
  const data = new Date(value);

  if(value == null)
    return '1900-01-01'

  if (data.getTime() - data.getTime() === 0)
    return format(data, 'yyyy-LL-dd')
  else
    return '1900-01-01'
};

export const selecionaData = (data) => {
  const milissegundos_por_dia = 1000 * 60 * 60 * 24;
  const oldDate = new Date(data);
  const newDate = new Date(oldDate.getTime() + 1 * milissegundos_por_dia);

  if (data === null || data === '1900-01-01'){
    return null
  }
    
  
  return newDate;
};

export const selecionaSimNaoValor = (valor) => {
  return valor ? 'S': 'N';
}

export const selecionaSimNaoDescricao = (valor) => {
  return valor ? 'Sim' : 'Não'
}