import { ScreenHeader } from '@components/ScreenHeader';
import { Container } from './styles';
import { ScreenTitulo } from '@components/ScreenTitulo';

export function Home() {
    return(
        <Container>
            <ScreenHeader/>
            <ScreenTitulo titulo='Home' />
        </Container>
    )
}