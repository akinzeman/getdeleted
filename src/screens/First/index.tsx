import { useNavigation } from '@react-navigation/native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import { Image } from 'react-native';

import { FirstContainer, FirstContent } from './style';
import { Spacer } from '../Splash/style';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import RightArrow from '../../assets/rightArrow';

const First = () => {
	const { navigate } = useNavigation<StackNavigation>();

	const handleButton = async () => {
		const status = await RNAndroidNotificationListener.getPermissionStatus();

		if (status === 'authorized') {
			navigate('SelectApps');
		} else {
			navigate('Permission');
		}
	};

	return (
		<FirstContainer>
			<FirstContent>
				<Image source={require('./cuate.png')} />
				<Spacer height={18} />
				<Typography type="h2">Welcome</Typography>
				<Spacer height={16} />
				<Typography>
					We'll show you how to set up and use this app in a few steps. So that,
					you do not miss any deleted messages.
				</Typography>
			</FirstContent>
			<Button onPress={handleButton} rightIcon={<RightArrow />}>
				BEGIN
			</Button>
		</FirstContainer>
	);
};

export default First;
