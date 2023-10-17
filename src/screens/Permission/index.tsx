import { useCallback, useEffect, useRef } from 'react';
import { AppState, Image } from 'react-native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import { useNavigation } from '@react-navigation/native';

import { PermissionContainer, PermissionContent } from './style';
import Button from '../../components/Button';
import { Spacer } from '../Splash/style';
import Typography from '../../components/Typography';
import RightArrow from '../../assets/rightArrow';

const Permission = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const appState = useRef(AppState.currentState);

	const checkPermission = useCallback(async () => {
		const status = await RNAndroidNotificationListener.getPermissionStatus();

		if (status === 'authorized') {
			navigate('SelectApps');
		}
	}, [navigate]);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === 'active'
			) {
				checkPermission();
			}

			appState.current = nextAppState;
		});

		return () => {
			subscription.remove();
		};
	}, [checkPermission]);

	useEffect(() => {
		checkPermission();
	}, [checkPermission]);

	const getPermission = async () => {
		const status = await RNAndroidNotificationListener.getPermissionStatus();

		if (status === 'authorized') {
			navigate('SelectApps');
		} else {
			RNAndroidNotificationListener.requestPermission();
		}
	};

	return (
		<PermissionContainer>
			<PermissionContent>
				<Image source={require('./bro.png')} />
				<Spacer height={18} />
				<Typography type="h2">Allow notifications acces</Typography>
				<Spacer height={16} />
				<Typography>
					We reach messages from notifications before they deleted. So that you
					must give permission to this app for notification access.
				</Typography>
				<Spacer height={16} />
				<Typography>
					Note: When warning appears, wait 10 seconds, accept option then choose
					OK to continue.
				</Typography>
			</PermissionContent>
			<Button onPress={getPermission} rightIcon={<RightArrow />}>
				ALLOW ACCESS
			</Button>
		</PermissionContainer>
	);
};

export default Permission;
