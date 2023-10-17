import { useEffect, useRef, useState } from 'react';
import { AppRegistry } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import RNAndroidNotificationListener, {
	RNAndroidNotificationListenerHeadlessJsName,
} from 'react-native-android-notification-listener';

import { useAppDispatch } from '../store';
import { addNotification, onOpenActiveScreenDB } from '../reducers/params';
import { StackActions, useNavigation } from '@react-navigation/native';

const useNotifications = () => {
	const sqlite = useRef<SQLite.SQLiteDatabase>();
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const dispatch = useAppDispatch();

	const openDatabase = async () => {
		setLoading(true);
		try {
			SQLite.enablePromise(true);
			sqlite.current = await SQLite.openDatabase({ name: 'getDeleted.db' });

			const [res] = await sqlite.current.executeSql(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='notifications'",
				[],
			);
			const [res2] = await sqlite.current.executeSql(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='groupedMessages'",
				[],
			);
			if (res.rows.length === 0 || res2.rows.length === 0) {
				await sqlite.current
					.executeSql(`CREATE TABLE IF NOT EXISTS notifications(
						id INTEGER PRIMARY KEY AUTOINCREMENT,
						time VARCHAR(24),
						app VARCHAR(60),
						title VARCHAR(60),
						titleBig VARCHAR(150),
						text VARCHAR(255),
						subText VARCHAR(255),
						summaryText VARCHAR(255),
						bigText VARCHAR(255),
						audioContentsURI VARCHAR(255),
						imageBackgroundURI VARCHAR(255),
						extraInfoText VARCHAR(255),
						icon TEXT,
						image TEXT
					)`);
				await sqlite.current.executeSql(
					'CREATE TABLE IF NOT EXISTS groupedMessages(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), text VARCHAR(255), notificationId INTEGER)',
				);
			}

			listenAndWriteNotifications();
		} catch (e) {
			console.warn(e);
		} finally {
			dispatch(onOpenActiveScreenDB());
		}
	};

	const listenAndWriteNotifications = async () => {
		if (sqlite.current === undefined) {
			return;
		}

		const status = await RNAndroidNotificationListener.getPermissionStatus();

		if (status !== 'authorized') {
			navigation.dispatch(StackActions.popToTop());
			navigation.dispatch(StackActions.replace('Permission'));
		}

		AppRegistry.registerHeadlessTask(
			RNAndroidNotificationListenerHeadlessJsName,
			() => headlessNotificationListener,
		);

		setLoading(false);
	};

	const headlessNotificationListener = async (notif: any) => {
		if (sqlite.current === undefined) {
			return;
		}

		const notifications = {
			notification: JSON.parse(notif.notification),
		} as Notification;

		try {
			const { notification } = notifications;

			dispatch(addNotification(notifications));
			const [res] = await sqlite.current
				.executeSql(`INSERT INTO notifications(time, app, title, titleBig, text, subText, summaryText, bigText, audioContentsURI, imageBackgroundURI, extraInfoText, icon, image)
					VALUES ('${notification.time}', '${notification.app}', '${notification.title}', '${notification.titleBig}', '${notification.text}', '${notification.subText}', '${notification.summaryText}', '${notification.bigText}', '${notification.audioContentsURI}', '${notification.imageBackgroundURI}', '${notification.extraInfoText}', '${notification.icon}', '${notification.image}')`);
			for (let i = 0; i < notification.groupedMessages.length; i++) {
				await sqlite.current.executeSql(
					`INSERT INTO groupedMessages (title, text, notificationId)
						VALUES ('${notification.groupedMessages[i].title}', '${notification.groupedMessages[i].text}', ${res.insertId})
					`,
				);
			}
		} catch (e) {
			console.warn(e);
		}
	};

	// const setScreenName = async (screenName: string) => {
	// 	if (sqlite.current === undefined) {
	// 		return;
	// 	}
	// 	try {
	// 		await sqlite.current.executeSql('DELETE FROM notifications');
	// 		await sqlite.current.executeSql(
	// 			`INSERT INTO notifications(screen_name) VALUES ('${screenName}')`,
	// 		);

	// 		dispatch(setActiveScreen(screenName));
	// 	} catch (e) {
	// 		console.warn(e);
	// 	}
	// };

	useEffect(() => {
		openDatabase();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		db: sqlite.current,
		loading,
	};
};

export default useNotifications;
