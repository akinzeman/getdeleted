import { Image } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Messages from '../Messages';
import theme from '../../utils/theme';
import { useAppSelector } from '../../store';
import useNotifications from '../../hook/useNotifications';

const Tab = createMaterialTopTabNavigator();

const TabNavigation = () => {
	const { selectedApps } = useAppSelector(state => state.params);
	const { dispatch } = useNavigation<StackNavigation>();

	const { loading } = useNotifications();

	if (selectedApps === undefined || selectedApps.length === 0) {
		dispatch(StackActions.replace('First'));

		return null;
	}

	if (loading) {
		return null;
	}

	return (
		<Tab.Navigator
			screenOptions={{ tabBarScrollEnabled: selectedApps.length > 3 }}>
			{selectedApps.map(app => {
				return (
					<Tab.Screen
						key={app.packageName}
						options={{
							tabBarIcon: () => (
								<Image
									source={{
										uri: `data:image/png;base64,${app.icon}`,
									}}
									style={{ width: 26, height: 26 }}
								/>
							),
							tabBarStyle: {
								width: 'auto',
							},
							tabBarPressOpacity: 1,
							tabBarPressColor: theme.colors.primary,
						}}
						initialParams={{
							packageName: app.packageName,
							name: app.label,
						}}
						name={app.label}
						component={Messages}
					/>
				);
			})}
		</Tab.Navigator>
	);
};

export default TabNavigation;
