import { useEffect, useRef, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { useAppDispatch, useAppSelector } from '../store';
import { onOpenSelectedAppDB, setSelectedApps } from '../reducers/params';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';

interface PackageNameData {
	packageName: string;
	icon: string;
	label: string;
	id: number;
}

const useSelectedApps = () => {
	const sqlite = useRef<SQLite.SQLiteDatabase>();
	const [initial, setInitial] = useState(true);
	const { selectedApps } = useAppSelector(state => state.params);
	const dispatch = useAppDispatch();

	const openDatabase = async () => {
		try {
			SQLite.enablePromise(true);
			sqlite.current = await SQLite.openDatabase({ name: 'getDeleted.db' });

			const [res] = await sqlite.current.executeSql(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='selectedApps'",
				[],
			);
			if (res.rows.length === 0) {
				await sqlite.current.executeSql(
					'CREATE TABLE IF NOT EXISTS selectedApps(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, packageName VARCHAR(50), icon VARCHAR(8000), label VARCHAR(50) )',
				);
			} else {
				const [selectedAppsRes] = await sqlite.current.executeSql(
					'SELECT packageName, icon, label FROM selectedApps',
				);
				const data = selectedAppsRes.rows.raw() as AppDetail[];

				dispatch(setSelectedApps(data));
			}
		} catch (e) {
			console.warn(e);
		} finally {
			setInitial(false);
			dispatch(onOpenSelectedAppDB());
		}
	};

	const rewriteDatabase = async () => {
		if (!initial && sqlite.current) {
			try {
				const [rawData] = await sqlite.current.executeSql(
					'SELECT id, packageName FROM selectedApps',
				);

				const data = rawData.rows.raw() as PackageNameData[];

				const deletedApps = data.filter(
					x => !selectedApps.some(y => y.packageName === x.packageName),
				);
				const addedApps = selectedApps.filter(
					x => !data.some(y => y.packageName === x.packageName),
				);

				const deleteQuery = `
					${deletedApps.map(x => `DELETE FROM selectedApps WHERE id = ${x.id}`).join(';')}
				`;
				const addedQuery = `
					${addedApps
						.map(
							x =>
								`INSERT INTO selectedApps (packageName, icon, label) VALUES ('${x.packageName}', '${x.icon}', '${x.label}')`,
						)
						.join(';')}
				`;

				if (deletedApps.length > 0) {
					await sqlite.current.executeSql(deleteQuery);
				}
				if (addedQuery.length > 0) {
					await sqlite.current.executeSql(addedQuery);
				}
			} catch (e) {
				console.warn(e);
			}
		}
	};

	useEffect(() => {
		rewriteDatabase();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedApps]);

	useEffect(() => {
		openDatabase();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		db: sqlite.current,
	};
};

export default useSelectedApps;
