import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

import { Container, Icon, ButtonTypeProps } from './styles';

type Props = TouchableOpacityProps & {
  icone: keyof typeof MaterialIcons.glyphMap;
  tipo: ButtonTypeProps
}

export function ButtonIcon({ icone, tipo = 'SUCCESS', ...rest }: Props) {
  return(
    <Container {...rest}>
      <Icon name={icone} type={tipo} />
    </Container>
  );
}