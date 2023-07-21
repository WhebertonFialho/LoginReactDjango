import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { api } from '../../services/api';
import { toastErro } from '../../components/Toast';

const Login = () => {
  const navigate = useNavigate();
  const [ valido, setValido ] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const onHandleChangeUsername = (e) => {
    setUsername(e.target.value.toUpperCase());
  }

  const onHandleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) 
      event.stopPropagation();
    
    setValido(true);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    await api({
        method: "POST",
        url: "auth/login",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(response => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("usuario", JSON.stringify(response.data.usuario[0]));

          api.defaults.headers.common = { 'Authorization': `Bearer ${response.data.token}` };
          
          if(response.data.usuario[0].altera_senha)
            navigate('/alterarSenha');
          else
            navigate('/dashboard');
      })
   
      .catch(error => {
        console.log(error)
        if (error && error.response) {
          if (error.response?.status === 404) 
            toastErro(error.response.data);

          if (error.response?.status === 401) 
            toastErro('Usuário ou senha incorretas!');
        } 
        else {
          toastErro('Sem Conexão com o Servidor');
        }
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm noValidate validated={ valido } onSubmit={ handleLogin }>
                    <h4>Login</h4>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Usuário" autoComplete="Username" value={ username } onChange={ onHandleChangeUsername } feedbackInvalid="Usuário é Obrigatório." required/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Senha" autoComplete="current-password" value={ password } onChange={ onHandleChangePassword } feedbackInvalid="Senha é Obrigatório." required/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <div className='div-buttons'>
                          <CButton color="success" className="px-4" type='submit'>
                            Login
                          </CButton>
                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
