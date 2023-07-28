import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@hooks/useAuth';
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from './app.routes';

export function Routes() {

  const { COLORS } = useTheme();
  const { user } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
      <NavigationContainer>
        { user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}