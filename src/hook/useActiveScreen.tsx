import { useEffect, useRef } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { useAppDispatch, useAppSelector } from '../store';
import { onOpenActiveScreenDB, setActiveScreen } from '../reducers/params';

const useActiveScreen = () => {
	const sqlite = useRef<SQLite.SQLiteDatabase>();
	const { activeScreen } = useAppSelector(state => state.params);
	const dispatch = useAppDispatch();

	const openDatabase = async () => {
		try {
			SQLite.enablePromise(true);
			sqlite.current = await SQLite.openDatabase({ name: 'getDeleted.db' });

			const [res] = await sqlite.current.executeSql(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='splash'",
				[],
			);
			if (res.rows.length === 0) {
				await sqlite.current.executeSql(
					'CREATE TABLE IF NOT EXISTS splash(id INTEGER PRIMARY KEY AUTOINCREMENT, screen_name VARCHAR(20))',
				);
				await sqlite.current.executeSql(
					"INSERT INTO splash(screen_name) VALUES ('First')",
				);
				dispatch(setActiveScreen('First'));
			} else {
				const [splashRes] = await sqlite.current.executeSql(
					'SELECT * FROM splash',
				);

				if (splashRes.rows.length === 0) {
					sqlite.current.executeSql(
						"INSERT INTO splash(screen_name) VALUES ('First')",
					);
				} else {
					dispatch(setActiveScreen(splashRes.rows.item(0).screen_name));
				}
			}
		} catch (e) {
			console.warn(e);
		} finally {
			dispatch(onOpenActiveScreenDB());
		}
	};

	const setScreenName = async (screenName: string) => {
		if (sqlite.current === undefined) {
			return;
		}
		try {
			await sqlite.current.executeSql('DELETE FROM splash');
			await sqlite.current.executeSql(
				`INSERT INTO splash(screen_name) VALUES ('${screenName}')`,
			);

			dispatch(setActiveScreen(screenName));
		} catch (e) {
			console.warn(e);
		}
	};

	useEffect(() => {
		openDatabase();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (activeScreen === 'Home') {
			setScreenName(activeScreen);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeScreen]);

	return {
		db: sqlite.current,
		setScreenName,
	};
};

export default useActiveScreen;
