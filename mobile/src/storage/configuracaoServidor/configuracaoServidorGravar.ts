import AsyncStorage from '@react-native-async-storage/async-storage';

import { CONFIGURACAO_COLLECTION } from '@storage/storageConfig'

export async function ConfiguracaoServidorGravar(urlServidor : string){
    try {
        await AsyncStorage.setItem( CONFIGURACAO_COLLECTION, urlServidor)
    } catch (error) {
        throw error;    
    }
}