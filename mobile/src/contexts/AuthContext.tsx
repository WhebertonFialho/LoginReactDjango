import { createContext, ReactNode, useEffect, useState } from "react";

import { storageAuthTokenSalvar, storageAuthTokenBuscar, storageAuthTokenRemover } from '@storage/storageAuthToken';
import { storageUsuarioBuscar, storageUsuarioRemover, storageUsuarioSalvar } from '@storage/storageUsuario';

import { api } from '@services/api';
import { UsuarioDTO } from '@DTOs/UsuarioDTO'
import { ConfiguracaoServidorBuscar } from "@storage/configuracaoServidor/configuracaoServidorBuscar";
import { AppError } from "@utils/AppError";
import { AppToastErro } from "@utils/appToast";

export type AuthContextDataProps = {
  user: UsuarioDTO;
  singIn: (username: string, password: string) => Promise<void>;
  updateUserProfile: (userUpdated: UsuarioDTO) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps)  {

  const [ user, setUser ] = useState<UsuarioDTO>({} as UsuarioDTO);
  const [ isLoadingUserStorageData, setIsLoadingUserStorageData ] = useState(true); 

  async function userAndTokenUpdate(userData: UsuarioDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UsuarioDTO, token: string, refresh_token: string) {
    try {
      setIsLoadingUserStorageData(true)
      await storageUsuarioSalvar(userData);
      await storageAuthTokenSalvar({ token, refresh_token });
      
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function singIn(username: string, password: string) {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      console.log(formData)

      await api({
          method: "POST",
          url: "auth/login",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          if(response.data.usuario && response.data.token && response.data.refresh_token) {
            storageUserAndTokenSave(response.data.usuario, response.data.token, response.data.refresh_token);
            userAndTokenUpdate(response.data.usuario[0], response.data.token)
          }

          api.defaults.headers.common = { 'Authorization': `Bearer ${response.data.token}` };          
        })
        .catch((error) => {
          throw new AppError("Credenciais são Inválidas")
          console.log(error.data)
        })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UsuarioDTO);
      await storageUsuarioRemover();
      await storageAuthTokenRemover();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UsuarioDTO) {
    try {
      setUser(userUpdated);
      await storageUsuarioSalvar(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUsuarioBuscar();
      const { token } = await storageAuthTokenBuscar();
      
      if(token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      } 
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function carregarConfiguracao() {
    try {
      const storedConfiguracao = await ConfiguracaoServidorBuscar()
      const urlServidor = storedConfiguracao ? storedConfiguracao : '';
      api.defaults.baseURL = `http://${urlServidor}`;

    } catch (error) {
      if(error instanceof AppError)
        return AppToastErro(error.menssagem)
      
      AppToastErro('Não foi possivel acessar as configurações');
    }
  }

  useEffect(() => {
    loadUserData();
    carregarConfiguracao();
  },[])

  useEffect(() => {
    
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    }
  },[])

  return (
    <AuthContext.Provider value={{ user, singIn, updateUserProfile, signOut, isLoadingUserStorageData }}>
      {children}
    </AuthContext.Provider>
  )
}