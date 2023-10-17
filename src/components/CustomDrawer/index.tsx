import { Linking, Pressable, Share } from 'react-native';
import {
	DrawerActions,
	StackActions,
	useNavigation,
} from '@react-navigation/native';

import AccountIcon from '../../assets/accountIcon';
import Logo from '../../assets/appIcon';
import LogoText from '../../assets/logoText';
import SettingIcon from '../../assets/settingsIcon';
import ShareIcon from '../../assets/shareIcon';
import { Spacer } from '../../screens/Splash/style';
import Typography from '../Typography';
import {
	CustomDraweMenuItem,
	CustomDrawerContainer,
	CustomDrawerFooter,
	CustomDrawerLogo,
	CustomDrawerMenu,
} from './style';

const CustomDrawer = () => {
	const { dispatch } = useNavigation();

	const onClickSettings = () => {
		dispatch(DrawerActions.closeDrawer());
		dispatch(StackActions.push('SelectApps'));
	};

	const onClickProfile = () => {
		dispatch(DrawerActions.closeDrawer());
		dispatch(StackActions.push('Profile'));
	};

	const onClickShare = () => {
		Share.share({
			title: 'App link',
			message: 'Please install this app and stay safe , AppLink :',
			url: '',
		});
	};

	return (
		<CustomDrawerContainer>
			<CustomDrawerLogo>
				<Logo />
				<Spacer height={8} />
				<LogoText />
			</CustomDrawerLogo>
			<CustomDrawerMenu>
				<CustomDraweMenuItem onPress={onClickSettings}>
					<SettingIcon />
					<Spacer width={16} />
					<Typography type="h2" color="white">
						Settings
					</Typography>
				</CustomDraweMenuItem>
				<CustomDraweMenuItem onPress={onClickProfile}>
					<AccountIcon />
					<Spacer width={16} />
					<Typography type="h2" color="white">
						Profile
					</Typography>
				</CustomDraweMenuItem>
				<CustomDraweMenuItem onPress={onClickShare}>
					<ShareIcon />
					<Spacer width={16} />
					<Typography type="h2" color="white">
						Share app
					</Typography>
				</CustomDraweMenuItem>
			</CustomDrawerMenu>
			<CustomDrawerFooter>
				<Pressable
					onPress={() => {
						Linking.openURL('https://getdeleted.app/privacy');
					}}>
					<Typography color="white" underline={true}>
						Privacy
					</Typography>
				</Pressable>
				<Typography color="white"> | </Typography>
				<Pressable
					onPress={() => {
						Linking.openURL('https://getdeleted.app/terms');
					}}>
					<Typography color="white" underline={true}>
						Terms & Conditions
					</Typography>
				</Pressable>
				<Pressable
					onPress={() => {
						Linking.openURL('mailto:support@getdeleted.com');
					}}>
					<Typography color="white" underline={true}>
						support@getdeleted.com
					</Typography>
				</Pressable>
				<Typography color="white">©2023 GetDeleted.app</Typography>
			</CustomDrawerFooter>
		</CustomDrawerContainer>
	);
};

export default CustomDrawer;
