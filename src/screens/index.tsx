import { createStackNavigator } from '@react-navigation/stack';
import Permission from './Permission';
import First from './First';
import SelectApps from './SelectApps';
import Last from './Last';
import { FC } from 'react';
import Splash from './Splash';
import useActiveScreen from '../hook/useActiveScreen';
import HeaderAppIcon from '../components/HeaderAppIcon';
import useSelectedApps from '../hook/useSelectedApps';
import HomeHeader from '../components/HomeHeader';
import { createDrawerNavigator } from '@react-navigation/drawer';
import theme from '../utils/theme';
import CustomDrawer from '../components/CustomDrawer';
import Profile from './Profile';
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator();

const DreawerNavigation = () => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerTitle: '',
				headerBackground: () => <HomeHeader />,
				headerTintColor: theme.colors.white,
			}}
			drawerContent={() => <CustomDrawer />}>
			<Drawer.Screen name="Main" component={TabNavigation} />
		</Drawer.Navigator>
	);
};

const Screens: FC = () => {
	useActiveScreen();
	useSelectedApps();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Splash"
				component={Splash}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="First"
				component={First}
				options={{
					header: () => <HeaderAppIcon />,
				}}
			/>
			<Stack.Screen
				name="Permission"
				options={{ title: '' }}
				component={Permission}
			/>
			<Stack.Screen
				name="SelectApps"
				options={{
					title: 'Select apps to follow',
				}}
				component={SelectApps}
			/>
			<Stack.Screen name="Last" component={Last} />
			<Stack.Screen
				name="Home"
				component={DreawerNavigation}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Profile" component={Profile} />
		</Stack.Navigator>
	);
};

export default Screens;
