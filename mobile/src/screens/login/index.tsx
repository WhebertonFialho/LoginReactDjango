import { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { Container } from './styles';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AppToastErro, AppToastInformacao, AppToastSucesso } from '@utils/appToast'

import { api } from '@services/api'

export function Login() {
    const usernameInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleLogin() {

        // const formData = new FormData();
        // formData.append('username', username);
        // formData.append('password', password);

        // await api({
        //     method: "POST",
        //     url: "auth/usuario/",
        //     data: formData,
        //     headers: { "Content-Type": "multipart/form-data" }
        // })
        // .then(response => {
        //     //localStorage.setItem("token", response.data.token);
        //     //localStorage.setItem("usuario", JSON.stringify(response.data.usuario[0]));

        //     if( username.trim().length === 0 || password.trim().length === 0 )
        //         return AppToastInformacao('Preencha os campo corretamente')

        //     api.defaults.headers.common = { 'Authorization': `Bearer ${response.data.token}` };
            
        //     return AppToastSucesso('Conectado');
        // })
        // .catch(error => {
        //     console.log(error)
        //     if (error && error.response) {
        //         if (error.response?.status === 404) 
        //             AppToastErro(error.response.data);
        //         if (error.response?.status === 401) 
        //             AppToastErro('Usuário ou senha incorretas!');
        //         else 
        //             AppToastErro('Sem Conexão com o Servidor');
        //     }
        // })
    }

    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Login' />
            <Input autoCorrect={false} returnKeyType="done" inputRef={ usernameInputRef } value={ username } 
                   onChangeText={ setUsername } placeholder="Username" onSubmitEditing={ () => passwordInputRef.current?.focus }
                   style={{ marginBottom: 7 }}/>
            <Input autoCorrect={false} returnKeyType="done" inputRef={ passwordInputRef } value={ password } 
                   onChangeText={ setPassword } placeholder="Password" onSubmitEditing={ handleLogin }/>
            <Button descricao='Login' tipo='SUCCESS' onPress={ handleLogin }/>
        </Container>
    )
}