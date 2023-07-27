import { createContext, ReactNode, useEffect, useState } from "react";

import { storageAuthTokenSalvar, storageAuthTokenBuscar, storageAuthTokenRemover } from '@storage/storageAuthToken';
import { storageUsuarioBuscar, storageUsuarioRemover, storageUsuarioSalvar } from '@storage/storageUsuario';

import { api } from '@services/api';
import { UsuarioDTO } from '@DTOs/UsuarioDTO'

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
      
      const { data } = await api.post('/auth/login', { username: username, password: password });
      console.log(data)

      if(data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave(data.user, data.token, data.refresh_token);
        userAndTokenUpdate(data.user, data.token)
      }
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

  useEffect(() => {
    loadUserData()
  },[])

//   useEffect(() => {
//     //const subscribe = api.registerInterceptTokenManager(signOut);

//     return () => {
//       subscribe();
//     }
//   },[])

  return (
    <AuthContext.Provider value={{ user, singIn, updateUserProfile, signOut, isLoadingUserStorageData }}>
      {children}
    </AuthContext.Provider>
  )
}