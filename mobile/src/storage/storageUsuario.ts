import AsyncStorage from "@react-native-async-storage/async-storage";

import { UsuarioDTO } from '@DTOs/UsuarioDTO';
import { USUARIO_STORAGE } from '@storage/storageConfig';

export async function storageUsuarioSalvar(usuario: UsuarioDTO) {
  await AsyncStorage.setItem(USUARIO_STORAGE, JSON.stringify(usuario))
}

export async function storageUsuarioBuscar() {
  const storage = await AsyncStorage.getItem(USUARIO_STORAGE);
  const user: UsuarioDTO = storage ? JSON.parse(storage) : {};

  return user
}

export async function storageUsuarioRemover() {
  await AsyncStorage.removeItem(USUARIO_STORAGE);
}