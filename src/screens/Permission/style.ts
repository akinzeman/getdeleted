import { View } from 'react-native';
import { styled } from 'styled-components';

const PermissionContainer = styled(View)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.white};

	padding: 30px;
	justify-content: space-around;
`;

const PermissionContent = styled(View)`
	flex: 1;
	align-items: center;
	display: flex;
`;

export { PermissionContainer, PermissionContent };
