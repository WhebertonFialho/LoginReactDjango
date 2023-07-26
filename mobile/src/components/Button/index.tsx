import { TouchableOpacityProps } from "react-native";
import { ButtonTypeProps, Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
  descricao: string;
  tipo?: ButtonTypeProps;
}

export function Button({ descricao, tipo = 'SUCCESS', ...rest }: Props) {
  return (
    <Container tipo={tipo} {...rest}>
      <Title>{descricao}</Title>
    </Container>
  )
}