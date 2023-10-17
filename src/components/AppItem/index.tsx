import { FC, useRef } from 'react';
import { AppItemContainer, SImage, AppItemContent } from './style';
import Typography from '../Typography';
import CheckBox from '@react-native-community/checkbox';

interface AppItemParams {
	image: string;
	title: string;
	isSelected: boolean;
	onPress: () => void;
}

const AppItem: FC<AppItemParams> = ({ image, title, isSelected, onPress }) => {
	const checkbox = useRef(null);

	return (
		<AppItemContainer
			onPress={onPress}
			isSelected={isSelected}
			activeOpacity={0.6}>
			<AppItemContent>
				<SImage source={{ uri: `data:image/png;base64,${image}` }} />
				<Typography type="h4">{title}</Typography>
			</AppItemContent>
			<CheckBox onChange={onPress} value={isSelected} ref={checkbox} />
		</AppItemContainer>
	);
};

export default AppItem;
