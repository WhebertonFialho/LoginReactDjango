import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message'

import { Login } from '@screens/login';
import { ConfiguracaoServidor } from '@screens/configuracaoServidor';

type AuthRoutes = {
  login: undefined;
  configuracaoServidor: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen, Group } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <>
      <Navigator screenOptions={{ headerShown: false }}>
        <Group>
          <Screen name="login" component={Login} />
          <Screen name="configuracaoServidor" component={ ConfiguracaoServidor } />
        </Group>
      </Navigator>
      <Toast />
    </>
  )
}