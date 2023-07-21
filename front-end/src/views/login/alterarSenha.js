import React, { Fragment, useEffect, useState } from 'react';
import { Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BlockUi from "react-block-ui";
import { CButton, CCard, CCardBody, CCol, CContainer, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { toastInformacao, toastErro } from '../../components/Toast';
import { api } from '../../services/api';

const AlterarSenha =  () => {
    const navigate = useNavigate();
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const [ bloqueiaTela, setBloqueiaTela ] = useState(false);
    const { handleSubmit, setValue, register, getValues, formState: { errors }} = useForm();

    const handleAlterarSenha = async () => {
        let dados = getValues();

        if(dados.password !== dados.password2){
            toastInformacao('Senhas são diferentes');
            return;
        }

        if(dados.password.length < 8){
            toastInformacao('Senha deve ter 8 caracters');
            return;
        }

        const dadosNovaSenha = {
            password: dados.password,
            password2: dados.password2
        }

        const dadosAlteraSenha = {
            username: usuario.username,
            nome: usuario.nome,
            altera_senha: false
        }

        setBloqueiaTela(true)
        await api.put(`auth/alterarSenha/${usuario.id}/`, dadosNovaSenha)
                    .then((res) => {
                        api.put(`auth/usuario/${usuario.id}/`, dadosAlteraSenha)
                            .then(res => {
                                setBloqueiaTela(false);
                                navigate('/');
                            })
                            .catch(err => {
                                console.log(err.data)
                            })
                    })
                    .catch((error) => {
                        if (error && error.response) 
                            console.log(error?.response?.data);
                        else 
                            toastErro('Sem Conexão com o Servidor')
                        
                        setBloqueiaTela(false);
                    })
    }

    useEffect(() => {
        setValue('username', usuario.username);
    }, [])

    return (
        <Fragment>
            <BlockUi tag="div" blocking={ bloqueiaTela }>
                <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                    <CContainer>
                        <CRow className="justify-content-center">
                            <CCol md={4} lg={4} xl={4}>
                                <CCard className="mx-4">
                                    <CCardBody className="p-4">
                                        <Form key={1} onSubmit={ handleSubmit(handleAlterarSenha) }>
                                            <h4>Alterar Senha</h4>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={ cilUser }/>
                                                </CInputGroupText>
                                                <CFormInput placeholder="Username" {...register("username") } disabled />
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={ cilLockLocked }/>
                                                </CInputGroupText>
                                                <CFormInput type="password" placeholder="Senha" invalid={ errors.password ? true : false } 
                                                    {...register("password", { required: true })} />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={ cilLockLocked }/>
                                                </CInputGroupText>
                                                <CFormInput type="password" placeholder="Repete Senha" invalid={ errors.password2 ? true : false } 
                                                    {...register("password2", { required: true })} />
                                            </CInputGroup>
                                            <div className="div-buttons">
                                                <CButton color="success" type='submit'>Alterar</CButton>
                                            </div>
                                        </Form>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
            </BlockUi>
        </Fragment>
  )
}

export default AlterarSenha