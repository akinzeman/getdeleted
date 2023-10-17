import { View, TouchableOpacity } from 'react-native';
import { styled } from 'styled-components';

const CustomDrawerContainer = styled(View)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.primary};
	justify-content: space-between;
`;

const CustomDrawerLogo = styled(View)`
	align-items: center;
	justify-content: center;
	margin-top: 18px;
	flex: 1;
`;

const CustomDrawerMenu = styled(View)`
	flex: 2;
`;

const CustomDraweMenuItem = styled(TouchableOpacity)`
	flex-direction: row;
	align-items: center;
	margin: 16px;
	margin-left: 24px;
`;

const CustomDrawerFooter = styled(View)`
	margin-bottom: 11px;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`;

export {
	CustomDrawerContainer,
	CustomDrawerLogo,
	CustomDrawerMenu,
	CustomDraweMenuItem,
	CustomDrawerFooter,
};
