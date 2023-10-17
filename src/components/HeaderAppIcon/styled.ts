import { View } from 'react-native';
import { styled } from 'styled-components';

const HeaderAppIconContainer = styled(View)`
	color: ${({ theme }) => theme.colors.primary};
	background-color: ${({ theme }) => theme.colors.white};
	align-items: center;
`;

export default HeaderAppIconContainer;
