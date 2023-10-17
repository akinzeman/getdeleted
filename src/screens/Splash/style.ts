import { View } from 'react-native';
import { styled } from 'styled-components';

const SplashContainer = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme }) => theme.colors.primary};
`;

interface SpacerProps {
	height?: number;
	width?: number;
}

const Spacer = styled(View)<SpacerProps>`
	height: ${({ height = 0 }) => height}px;
	width: ${({ width = 0 }) => width}px;
`;

export { SplashContainer, Spacer };
