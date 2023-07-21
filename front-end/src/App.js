import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider, RequireAuth } from  '../src/utility/auth';
import axios from 'axios';
import { dynamicConfiguracao } from './config/config'
import { api } from './services/api';
import './scss/style.scss';

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const AlterarSenha = React.lazy(() => import('./views/login/alterarSenha'));
const Login = React.lazy(() => import('./views/login'));
const Pagina401 = React.lazy(() => import('./views/pagina401'));
const Pagina404 = React.lazy(() => import('./views/pagina404'));
const Pagina500 = React.lazy(() => import('./views/pagina500'));

function App() {

  useEffect(() => {
    async function carregarConfiguracao() {
      axios.get(dynamicConfiguracao)
          .then((response) => {
            api.defaults.baseURL = response.data.apiURL;
            localStorage.setItem('caminhoBackEnd', response.data.apiURL);
          })
    }
    
    carregarConfiguracao();
  }, [])

  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/login" name="Login" element={<Login />} />
        <Route exact path="/alterarSenha" name="Alterar Senha" element={<AlterarSenha />} />
        <Route exact path="/401" name="Pagina 401" element={<Pagina401 />} />
        <Route exact path="/404" name="Pagina 404" element={<Pagina404 />} />
        <Route exact path="/500" name="Pagina 500" element={<Pagina500 />} />
        <Route path="*" name="Home" 
          element={
            <RequireAuth> 
              <DefaultLayout /> 
            </RequireAuth>
          } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
