import React, { Fragment, useEffect, useState, useRef } from 'react';
import { CCard, CCardBody, CCol, CRow, CButton, CFormInput, CCardHeader, CFormFloating, CFormSelect } from '@coreui/react';
import { Nav, NavItem, TabContent, TabPane, NavLink, Form, CardBody } from 'reactstrap';
import { Check, Edit, Trash2, X, ChevronDown } from 'react-feather';
import BlockUi from "react-block-ui";
import { toastAlterado, toastErro, toastInformacao, toastInserido } from '../../components/Toast';
import DataTable from "react-data-table-component";
import NenhumRegistroEncontrado from "../../components/NenhumRegistroEncontrado";
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';
import { selecionaSimNaoDescricao } from '../../utility/Utils';

const colunas = [
    { selector: row => row.username, name: "Username" },
    { selector: row => row.nome, name: "Nome" },
    { selector: row => row.ativo, name: "Ativo" },
    { selector: row => row.opcoes, name: "Opções", center: true, width: '110px'  }
]


const Usuario = () => {
    const [ bloqueiaTela, setBloqueiaTela ] = useState(false);
    const [ codigoUsuario, setCodigoUsuario ] = useState('');
    const [ tabAtiva, setTabAtiva ] = useState('Lista');
    const [ emEdicao, setEmEdicao ] = useState(false);
    const [ filtro, setFiltro ] = useState('');
    const [ dadosBKP, setDadosBKP ] = useState([]);
    
    const [ listaUsuario, setListaUsuario ] = useState([]);
    const [ listaUsuarioTable, setListaUsuarioTable ] = useState([]);
    const [ listaUsuarioFiltradoTable, setListaUsuarioFiltradoTable ] = useState([]);
    const [ listaPessoas, setListaPessoas ] = useState([]);
    const [ pessoaSelecionada, setPessoaSelecionada ] = useState([])
    const [ usuarioAtivo, setUsuarioAtivo ] = useState('S');

    const refSubmitButtom = useRef(null);
    const { handleSubmit, setValue, formState: { errors }, register, getValues } = useForm();

    const listaSimNao = [
        {
            "codigo": "N",
            "descricao": "Não"
        },
        {
            "codigo": "S",
            "descricao": "Sim"
        }
    ]

    const handleChangePesquisar = (filtro) => {
        let dadosFiltrados = [];
        setFiltro(filtro);
        
        if (filtro.length > 0) {
            dadosFiltrados = listaUsuarioTable.filter(item => {
                const startsWith = item.codigo.toString().toLowerCase().startsWith(filtro.toLowerCase()) ||
                                   item.username.toString().toLowerCase().startsWith(filtro.toLowerCase());
                const includes = item.codigo.toString().toLowerCase().includes(filtro.toLowerCase()) || 
                                 item.username.toString().toLowerCase().includes(filtro.toLowerCase());
        
                if (startsWith) 
                    return startsWith
                else if (!startsWith && includes) 
                    return includes
                else 
                    return null
            })
    
            setListaUsuarioFiltradoTable(dadosFiltrados)
        }
        else
        setListaUsuarioFiltradoTable([]);  
    }

    const handleChangeTab = tab => {
        if(emEdicao)
            return;
        
        if (tabAtiva !== tab){
            if (tab === 'Lista')
                setTabAtiva(tab)
            else
                if (codigoUsuario > 0)
                    setTabAtiva(tab)
                else
                    toastInformacao('Selecione um Usuário.');
        }
    }

    const handleAtualizaLista = async () => {
        setBloqueiaTela(true);
    
        await api.get('auth/usuario/')
                .then((res) => {
                    setListaUsuario(res.data);
                    setBloqueiaTela(false);
                })
                .catch((err) => {
                    console.log(err)
                })
    }

    const handleClickSelecionaUsuario = async (codigo) => {
        let dados = listaUsuario.filter(x => x.id === codigo)[0];

        setCodigoUsuario(codigo);

        setValue('codigo', dados.id);
        setValue('username', dados.username);
        setValue('nome', dados.nome);
        setUsuarioAtivo(dados.is_active ? 'S': 'N')
        setPessoaSelecionada(listaPessoas.filter(x => x.value === dados.cd_pessoa)[0])

        setTabAtiva('Cadastro')
    }
    
    const handleLimpaDados = () => {
        setCodigoUsuario(''); 

        setValue('codigo', '');
        setValue('username', '');
        setValue('nome', '');
        setUsuarioAtivo('S');
        
        setPessoaSelecionada([]);
    } 

    const handleClickNovo = () => {
        setEmEdicao(true);
        handleLimpaDados();
        
        setTabAtiva('Cadastro');
    }

    const onGravarUsuario = async () => {
        let dados = getValues();

        setBloqueiaTela(true);
    
        let dadosGravar = {
            username: dados.username,
            nome: dados.nome,
            is_active: (usuarioAtivo === 'S' ? true: false)
        }

        if(codigoUsuario === '')
            dadosGravar = { ...dadosGravar, password: '12345678', password2: '12345678'}
        
        if(codigoUsuario === ''){
            await api.post('auth/usuario', dadosGravar)
                    .then((res) => {
                        console.log(res.data)

                        setEmEdicao(false);
                        setBloqueiaTela(false);
                        setCodigoUsuario(res.data?.id);

                        handleAtualizaLista();
                        toastInserido();
                        setTabAtiva('Lista');
                    })
                    .catch((error) => {
                        if (error && error.response) 
                            console.log(error?.response?.data);
                        else 
                            toastErro('Sem Conexão com o Servidor')
                        
                        setBloqueiaTela(false);
                    })
        }
        else {
            await api.put(`auth/usuario/${codigoUsuario}/`, dadosGravar)
                    .then((res) => {
                        setEmEdicao(false);
                        setBloqueiaTela(false)

                        handleAtualizaLista();
                        toastAlterado();
                        setTabAtiva('Lista');
                    })
                    .catch((error) => {
                        if (error && error.response) 
                            console.log(error?.response?.data);
                        else 
                            toastErro('Sem Conexão com o Servidor')
                        
                        setBloqueiaTela(false);
                    })
        }
    }
    
    const handleClickBotaoVerdeCadastro = () => {
        if(!emEdicao){
            let dados = getValues();
            dados = { ...dados, ativo: usuarioAtivo }

            setDadosBKP(dados);
            setEmEdicao(true);
        }
        else {
            refSubmitButtom?.current?.click();
        }
    }

    const handleClickBotaoVermelhoCadastro = () => {
        setValue('codigo', dadosBKP.codigo);
        setValue('username', dadosBKP.username);
        setValue('nome', dadosBKP.nome);
        setUsuarioAtivo(dadosBKP.ativo);
        setEmEdicao(false);
    }

    const handleChangeUsername = (e) => {
        setValue('username', e.target.value.toUpperCase());
    }

    const handleAtualizaSenha = async () => {
        const dados = getValues();

        const dadosNovaSenha = {
            password: '12345678',
            password2: '12345678'
        }

        const dadosAlteraSenha = {
            username: dados.username,
            pessoa: pessoaSelecionada.value,
            is_active: (usuarioAtivo === 'S' ? true: false),
            altera_senha: true
        }

        await api.put(`auth/alterarSenha/${codigoUsuario}/`, dadosNovaSenha)
                    .then((res) => {
                        
                        api.put(`auth/usuario/${codigoUsuario}/`, dadosAlteraSenha)
                            .then(res => {
                                setEmEdicao(false);
                                setBloqueiaTela(false)

                                handleAtualizaLista();
                                toastInformacao("Senha Alterada para '12345678'")
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

    function liberaUsername(){
        if(codigoUsuario !== '') 
            return true;
        
        return !emEdicao;
    }

    useEffect(() =>  {
        let lista = [];
        setBloqueiaTela(true);

        listaUsuario.map((item) => (
            lista = [...lista, {
              id: item.id,
              username: item.username,
              nome: item.nome,
              ativo: selecionaSimNaoDescricao(item.is_active),
              opcoes: (
                  <Fragment>
                      <div className='d-flex'>
                          <CButton className='btn-icon' color='flat-light' onClick={() => handleClickSelecionaUsuario(item.id) }>
                              <Check color='#2ca30f' size={16}/>
                          </CButton>
                      </div>
                  </Fragment> 
              ) 
          }]
        ))
    
        setListaUsuarioTable(lista);
        setBloqueiaTela(false);
      }, [listaUsuario])

    useEffect(() => {
        handleAtualizaLista();
    }, []);

    return(
        <Fragment>
            <BlockUi tag="div" blocking={ bloqueiaTela }>
            <CRow>
                <CCol xs>
                    <CCard className="mb-4">
                        <CCardBody>
                            <CRow>
                                <Nav tabs fill>
                                    <NavItem>
                                        <NavLink active={tabAtiva === 'Lista'} onClick={() => handleChangeTab('Lista') }>Lista</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink active={tabAtiva === 'Cadastro'} onClick={() =>  handleChangeTab('Cadastro') }>Cadastros</NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent className='py-50' activeTab={tabAtiva}>
                                    <TabPane tabId={'Lista'}>
                                        <CRow className="pt-2">
                                            <CCol xs={12}>
                                                <CCard>
                                                    <CCardHeader>
                                                        <CRow>
                                                            <CCol lg={6} sm={6} xs={12}>
                                                                <CFormInput placeholder='Pesquisar...' value={ filtro } onChange={(e) => handleChangePesquisar(e.target.value)} /> 
                                                            </CCol>
                                                            <CCol>
                                                                <div className='div-buttons'>
                                                                    <CButton color='info' className='float-right' onClick={() => handleClickNovo()}>Novo</CButton>
                                                                </div>
                                                            </CCol>
                                                        </CRow>
                                                    </CCardHeader>
                                                    <CardBody>
                                                        <DataTable noHeader pagination paginationPerPage={10} selectableRowsNoSelectAll striped responsive className='react-dataTable' 
                                                                sortIcon={<ChevronDown size={10} />} columns={ colunas } data={ filtro.length > 0 ? listaUsuarioFiltradoTable : listaUsuarioTable } 
                                                                noDataComponent={ <NenhumRegistroEncontrado /> }/>
                                                    </CardBody>
                                                </CCard>
                                            </CCol>
                                        </CRow>
                                    </TabPane>
                                    <TabPane tabId={'Cadastro'}>
                                        <CRow className="pt-2">
                                            <CCol xs={12}>
                                                <CCard>
                                                    <CCardBody>
                                                        <Form key={1} onSubmit={ handleSubmit(onGravarUsuario) }>
                                                            <CFormFloating className="mb-1"> 
                                                                <CRow>
                                                                    <CCol xs={12} lg={5} md={5}>
                                                                        <CFormInput type="text" floatingLabel="Username" placeholder="0" disabled={ liberaUsername() } 
                                                                            invalid={ errors.username ? true : false } {...register("username", { required: true, onChange: (e) => handleChangeUsername(e) }) }  />
                                                                    </CCol>
                                                                    <CCol xs={12} lg={5} md={5}>
                                                                        <CFormInput type="text" floatingLabel="Nome" placeholder="0" disabled={ !emEdicao } 
                                                                            invalid={ errors.nome ? true : false } {...register("nome", { required: true }) }  />
                                                                    </CCol>
                                                                    <CCol xs={12} lg={2} md={2}>
                                                                        <CFormSelect size="lg" className="mb-3 form-control" floatingLabel="Ativo?" name="ativo" disabled={ !emEdicao } 
                                                                                value={ usuarioAtivo } onChange={ event => setUsuarioAtivo(event.target.value)} >
                                                                                { listaSimNao.map((item, i) => (
                                                                                    <option key={i} value={ item.codigo }>{ item.descricao }</option>
                                                                                )) }
                                                                        </CFormSelect>
                                                                    </CCol>
                                                                </CRow>
                                                            </CFormFloating>
                                                            <CButton hidden ref={refSubmitButtom} type='submit'></CButton>
                                                        </Form>
                                                        <CRow>
                                                            <CCol xs={12} lg={3} md={3}>
                                                                <CButton color='success' onClick={ () => handleAtualizaSenha() } disabled={ emEdicao }>
                                                                    Alterar Senha
                                                                </CButton>
                                                            </CCol>
                                                            <CCol>                        
                                                                <div className='div-buttons'>
                                                                    <CButton className='btn-icon me-2' color='success' onClick={() => handleClickBotaoVerdeCadastro() }>
                                                                        { emEdicao ?  <Check size={20} /> : <Edit size={20} />  }
                                                                    </CButton>
                                                                    <CButton className='btn-icon' color='danger' onClick={() => handleClickBotaoVermelhoCadastro() } hidden={ !emEdicao }>
                                                                        { emEdicao ? <X size={20} /> : <Trash2 size={20}/> }
                                                                    </CButton>   
                                                                </div>
                                                            </CCol>
                                                        </CRow> 
                                                        
                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                        </CRow>
                                    </TabPane>
                                </TabContent>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            </BlockUi>
        </Fragment>
    )
}

export default Usuario;