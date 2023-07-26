import { Container, Title } from "./styles";

type Props = {
  titulo: string;
}

export function ScreenTitulo({ titulo }: Props) {
  return (
    <Container>
      <Title>{titulo}</Title>
    </Container>
  )
}