import { useState, useCallback, useRef } from 'react';
import { TextInput } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { AppToastSucessoGravar, AppToastErroGravar } from '@utils/appToast';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ScreenHeader } from '@components/ScreenHeader';
import { ScreenTitulo } from '@components/ScreenTitulo';
import { Container } from './styles';

import { ConfiguracaoServidorBuscar } from '@storage/configuracaoServidor/configuracaoServidorBuscar';
import { ConfiguracaoServidorGravar } from '@storage/configuracaoServidor/configuracaoServidorGravar';
import { ConfiguracaoServidorRemover } from '@storage/configuracaoServidor/configuracaoServidorRemover';

export function Configuracao() {
    const urlServidorInputRef = useRef<TextInput>(null);
    const [ urlServidor, setUrlServidor ] = useState('');

    async function handleGravarConfiguracao() {
        try {
            if(urlServidor.trim().length === 0)
                await ConfiguracaoServidorRemover()   
            else
                await ConfiguracaoServidorGravar(urlServidor);

            AppToastSucessoGravar();
            urlServidorInputRef.current?.blur();
        } catch (error) {
            console.log(error);
            AppToastErroGravar();
        }
        
    }

    async function carregarDados(){
        const storedURLServidor = await ConfiguracaoServidorBuscar()
        const url = storedURLServidor ? storedURLServidor : ''; 
        setUrlServidor(url)
    }

    function handleOnPressConfiguracao(){
        console.log('config')
    }

    useFocusEffect(useCallback(() => {
        carregarDados()
    },[]))

    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Configuração Servidor' />
            <Input autoCorrect={false} returnKeyType="done" inputRef={ urlServidorInputRef } value={ urlServidor } onChangeText={ setUrlServidor }
                placeholder="URL Servidor" onSubmitEditing={ handleGravarConfiguracao }/>
            <Button descricao='Gravar' tipo='SUCCESS' onPress={ handleGravarConfiguracao }/>
        </Container>
    )
}