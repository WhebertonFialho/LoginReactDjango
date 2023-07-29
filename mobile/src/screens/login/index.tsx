import { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { Container, FormConfiguracao } from './styles';
import { useNavigation } from '@react-navigation/native';

import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { AppToastErro, AppToastInformacao } from '@utils/appToast'

import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

export function Login() {
    const usernameInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    const { singIn } = useAuth();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleLogin() {
        try {
            if(username.trim().length === 0 || password.trim().length === 0)
                return AppToastInformacao('Preencha os campo corretamente.');

            await singIn(username, password);  
            AppToastInformacao('Logado.');
        } catch (error) {
            const isAppError = error instanceof AppError;
            const mensagemErro =  isAppError ? error.menssagem : 'Não foi possível entrar. Tente novamente mais tarde.'

            AppToastErro(mensagemErro)  
        }
    }

    function handleOnPressConfiguracao(){
        navigation.navigate('configuracaoServidor')
    }

    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Login' />
            <Input autoCorrect={false} returnKeyType="done" inputRef={ usernameInputRef } value={ username } 
                   onChangeText={ setUsername } placeholder="Username" onSubmitEditing={ () => passwordInputRef.current?.focus }
                   style={{ marginBottom: 7 }}/>
            <Input autoCorrect={false} secureTextEntry returnKeyType="done" inputRef={ passwordInputRef } value={ password } 
                   onChangeText={ setPassword } placeholder="Password" onSubmitEditing={ handleLogin }/>
            <Button descricao='Login' tipo='SUCCESS' onPress={ handleLogin }/>
            <ButtonIcon icone='settings' tipo='SUCCESS' onPress={handleOnPressConfiguracao} style={{ position:'absolute', right: 20, bottom:20}} />  
            <FormConfiguracao  >
                     
            </FormConfiguracao>
        </Container>
    )
}