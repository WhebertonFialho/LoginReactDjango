import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from 'styled-components/native';
import Toast from 'react-native-toast-message'

import type { StackNavigationOptions } from '@react-navigation/stack';

type AppRoutes = {
  home: undefined;
}

export type AppNavigatorRoutesProps = DrawerNavigationProp<AppRoutes>;

const { Navigator, Screen, Group } = createDrawerNavigator<AppRoutes>();

import { Home } from '@screens/home';

export function AppRoutes(){
  const { COLORS } = useTheme();

  const slyleMenu : StackNavigationOptions = {
      headerShown: false,
      drawerActiveBackgroundColor: {
        color: '#000'
      },
      drawerLabelStyle: {
        color: COLORS.WHITE
      },
      drawerStyle: {
        backgroundColor: COLORS.GRAY_500,
        width: 240
      } 
  }

  return(
    <>
      <Navigator screenOptions={ slyleMenu } >
        <Screen name="home" component={ Home } />
      </Navigator>
      <Toast />
    </>
  );
}