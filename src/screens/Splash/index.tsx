import { useCallback, useEffect } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import { useAppSelector } from '../../store';
import Logo from '../../assets/appIcon';
import { Spacer, SplashContainer } from './style';
import LogoText from '../../assets/logoText';

const Splash = () => {
	const { dispatch } = useNavigation<StackNavigation>();
	const { activeScreen, selectedApps, selectedAppDB, activeScreenDB } =
		useAppSelector(state => state.params);

	const checkPermission = useCallback(async () => {
		if (activeScreen === undefined) {
			return;
		}
		const status = await RNAndroidNotificationListener.getPermissionStatus();

		if (status === 'authorized') {
			if (selectedApps.length === 0) {
				dispatch(StackActions.replace('SelectApps'));
			} else {
				dispatch(StackActions.replace(activeScreen));
			}
		} else {
			dispatch(StackActions.replace('First'));
		}
	}, [dispatch, activeScreen, selectedApps]);

	useEffect(() => {
		if (selectedAppDB && activeScreenDB) {
			checkPermission();
		}
	}, [checkPermission, selectedAppDB, activeScreenDB]);

	return (
		<SplashContainer>
			<Logo />
			<Spacer height={18} />
			<LogoText />
		</SplashContainer>
	);
};

export default Splash;
