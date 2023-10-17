import { ScrollView, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../../store';
import Message from '../../components/Message';
import Typography from '../../components/Typography';
// @ts-ignore
// import BackgroundTask from 'react-native-background-task';

const Messages = ({ route }) => {
	const { packageName, name } = route.params;
	const { notifications } = useAppSelector(state => state.params);

	const data = notifications.filter(
		(item, index, self) =>
			item.notification.app === packageName &&
			item.notification.title !== name &&
			item.notification.groupedMessages.length === 0 &&
			self.findIndex(v => v.notification.time === item.notification.time) ===
				index,
	);

	return (
		<ScrollView>
			{data.length === 0 && (
				<Typography>There is no deleted Messages</Typography>
			)}
			{data.map((item, index) => (
				<Message notifications={item} key={index} />
			))}

			<TouchableOpacity
				style={{ margin: 20, padding: 20 }}
				onPress={() => {
					console.log(
						JSON.stringify(
							notifications.map(x => ({
								notification: {
									...x.notification,
									icon: x.notification.icon.slice(0, 50),
									iconLarge: x.notification.iconLarge.slice(0, 20),
								},
							})),
						),
					);
				}}>
				<Typography>Test</Typography>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default Messages;
