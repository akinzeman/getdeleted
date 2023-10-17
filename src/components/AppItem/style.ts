import { Image, TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components';

interface AppItemContainerParams {
	isSelected: boolean;
}

const AppItemContainer = styled(TouchableOpacity)<AppItemContainerParams>`
	flex-direction: row;
	padding: 12px;
	border-radius: 8px;
	background-color: ${({ isSelected }) =>
		isSelected ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'};
	margin-bottom: 16px;
	align-items: center;
	justify-content: space-between;
`;

const SImage = styled(Image)`
	width: 40px;
	height: 40px;
	margin-right: 8px;
`;

const AppItemContent = styled(View)`
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

export { AppItemContainer, SImage, AppItemContent };
