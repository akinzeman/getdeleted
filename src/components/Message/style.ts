import { Image, View, Dimensions } from 'react-native';
import { styled } from 'styled-components';

const { width } = Dimensions.get('screen');

const MessagesContainer = styled(View)`
	flex-direction: row;
	margin: 20px;

	max-width: ${width - 120}px;
`;

const PersonIcon = styled(Image)`
	border-radius: 25px;
	width: 50px;
	height: 50px;
	margin-right: 2px;
`;

const MessagesContents = styled(View)``;

const MessageTickContainer = styled(View)`
	overflow: hidden;
	border-top-left-radius: 8px;
	width: 12px;
	height: 12px;
`;

const MessageTick = styled(View)`
	width: 0;
	height: 0;
	background-color: transparent;
	border-style: solid;
	border-right-width: 120px;
	border-top-width: 120px;
	border-right-color: transparent;
	border-top-color: white;
	transform: rotate(90deg);
`;

const MessageContent = styled(View)<{ index: number }>`
	background-color: white;
	min-width: 130px;
	border-radius: 8px;
	${({ index }) => index === 0 && 'border-top-left-radius: 0;'}
	${({ index }) => index !== 0 && 'margin-left: 12px;'}
	padding: 8px;
	padding-bottom: 4px;
	margin-bottom: 4px;
`;

const MessageContainer = styled(View)`
	flex-direction: row;
`;

const MessageFooter = styled(View)`
	align-self: flex-end;
`;

const Content = styled(View)`
	flex-direction: row;
	justify-content: space-between;
`;

const Title = styled(View)`
	flex-direction: row;
	justify-content: space-between;
`;

const MessageText = styled(View)`
	padding-bottom: 4px;
`;

const Deleted = styled(View)`
	align-self: flex-start;
	margin-left: 4px;
`;

export {
	MessagesContainer,
	MessagesContents,
	MessageContainer,
	MessageText,
	MessageContent,
	MessageTickContainer,
	MessageTick,
	PersonIcon,
	MessageFooter,
	Content,
	Deleted,
	Title,
};
