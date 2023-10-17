import { View } from 'react-native';
import { styled } from 'styled-components';

const FirstContainer = styled(View)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white};

	padding: 30px;
	justify-content: space-around;
`;

const FirstContent = styled(View)`
	flex: 1;
	align-items: center;
	display: flex;
`;

export { FirstContainer, FirstContent };
