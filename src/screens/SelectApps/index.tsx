import { FlatList } from 'react-native';
import { InstalledApps } from 'react-native-launcher-kit';
import { StackActions, useNavigation } from '@react-navigation/native';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';

import Typography from '../../components/Typography';
import { Spacer } from '../Splash/style';
import AppItem from '../../components/AppItem';
import { SelectAppsContainer } from './style';
import { addSelectedApps, setActiveScreen } from '../../reducers/params';
import { useAppDispatch, useAppSelector } from '../../store';
import Button from '../../components/Button';

const SelectApps = () => {
	const results = InstalledApps.getApps();
	const { selectedApps } = useAppSelector(state => state.params);
	const dispatch = useAppDispatch();
	const navigation = useNavigation<StackNavigation>();

	const selectItem = (item: AppDetail) => {
		dispatch(addSelectedApps(item));
	};

	const onPressFinish = () => {
		dispatch(setActiveScreen('Home'));
		navigation.dispatch(StackActions.popToTop());
		navigation.dispatch(StackActions.replace('Home'));
	};

	return (
		<SelectAppsContainer>
			<Typography>
				We’ll save notifications only to your own phone and detect changes to
				get deleted messages.
			</Typography>
			<Spacer height={16} />
			<Typography>
				Don’t forget to{' '}
				<Typography type="h5">
					enable notification of the selected apps.
				</Typography>{' '}
				(Content hidden notifications will not be saved)
			</Typography>
			<Spacer height={16} />
			<FlatList
				data={results}
				renderItem={({ item }) => (
					<AppItem
						image={item.icon}
						title={item.label}
						isSelected={selectedApps.some(
							app => item.packageName === app.packageName,
						)}
						onPress={() => selectItem(item)}
					/>
				)}
			/>
			<Button onPress={onPressFinish}>FINISH</Button>
		</SelectAppsContainer>
	);
};

export default SelectApps;
