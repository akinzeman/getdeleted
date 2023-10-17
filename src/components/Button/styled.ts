import { View } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { styled } from 'styled-components';

const SText = styled(Text)`
	color: ${({ theme }) => theme.colors.white};
	font-weight: 600;
	font-size: 14px;
`;

const ButtonContainer = styled(TouchableOpacity)`
	background-color: ${({ theme }) => theme.colors.primary};
	padding: 12px;
	border-radius: 8px;
	align-items: center;
`;

const RightIcon = styled(View)`
	position: absolute;
	top: 50%;
	right: 12px;
`;

export { ButtonContainer, SText, RightIcon };
