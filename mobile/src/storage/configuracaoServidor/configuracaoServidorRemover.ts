import AsyncStorage from '@react-native-async-storage/async-storage';

import { CONFIGURACAO_COLLECTION } from '@storage/storageConfig'

export async function ConfiguracaoServidorRemover(){
    try {
        await AsyncStorage.removeItem(CONFIGURACAO_COLLECTION)
    } catch (error) {
        throw error;    
    }
}