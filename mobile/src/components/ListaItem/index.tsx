import { ButtonIcon } from '@components/ButtonIcon';

import { Container, Descricao } from './styles';

type Props = {
  descricao: string;
  onRemove: () => void;
}

export function ListaItem({ descricao, onRemove }: Props) {
  return(
    <Container>
        <Descricao>{descricao}</Descricao>
        <ButtonIcon icone='close' tipo='DANGER' onPress={ onRemove } />
    </Container>
  );
}