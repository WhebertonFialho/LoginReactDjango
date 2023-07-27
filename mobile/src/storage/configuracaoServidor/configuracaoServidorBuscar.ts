import AsyncStorage from '@react-native-async-storage/async-storage';

import { CONFIGURACAO_COLLECTION } from '@storage/storageConfig';

export async function ConfiguracaoServidorBuscar() {
  try {
    const storage = await AsyncStorage.getItem(CONFIGURACAO_COLLECTION);
    
    return storage;
  } catch (error) {
    throw error;
  }
}