import { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import { ButtonContainer, SText, RightIcon } from './styled';

interface ButtonProps {
	children: string;
	key?: string | number;
	onPress?: (event: GestureResponderEvent) => void;
	rightIcon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, key, onPress, rightIcon }) => {
	return (
		<ButtonContainer key={key} onPress={onPress}>
			<SText>{children}</SText>
			{rightIcon && <RightIcon>{rightIcon}</RightIcon>}
		</ButtonContainer>
	);
};

export default Button;
