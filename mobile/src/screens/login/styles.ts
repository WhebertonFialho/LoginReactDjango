import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
`;

export const FormConfiguracao = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.COLORS.GRAY_400};

    flex-direction: row;
    justify-content: center;
    border-radius: 6px;
    margin-bottom: 10px;
`;