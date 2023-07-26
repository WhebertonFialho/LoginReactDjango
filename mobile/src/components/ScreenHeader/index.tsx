import logoImg from '@assets/logo.png';
import { BackButton, BackIcon, Container, Logo } from "./styles";

type Props = {
  handleOnPress?: () =>  void;
  showBackButton?: boolean;
}

export function ScreenHeader( props : Props) {
  return (
    <Container>
      { 
        props.showBackButton &&
        <BackButton onPress={ props.handleOnPress }>
          <BackIcon />
        </BackButton>
      }

      <Logo source={logoImg} />
    </Container>
  )
}