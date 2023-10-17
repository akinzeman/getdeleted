import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppDetail } from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';

export interface ParamsState {
	activeScreen?: StackNavigation;
	selectedApps: AppDetail[];
	activeScreenDB: boolean;
	selectedAppDB: boolean;
	notifications: Notification[];
}

const initialState: ParamsState = {
	activeScreen: undefined,
	selectedApps: [],
	activeScreenDB: false,
	selectedAppDB: false,
	notifications: [],
};

export const paramsSlice = createSlice({
	name: 'params',
	initialState,
	reducers: {
		setActiveScreen: (state, { payload }: PayloadAction<StackNavigation>) => {
			state.activeScreen = payload;
		},
		addSelectedApps: (state, { payload }: PayloadAction<AppDetail>) => {
			if (
				state.selectedApps.some(app => app.packageName === payload.packageName)
			) {
				state.selectedApps = state.selectedApps.filter(
					app => app.packageName !== payload.packageName,
				);
			} else {
				state.selectedApps.push(payload);
			}
		},
		deleteSelectedApps: (state, { payload }: PayloadAction<AppDetail>) => {
			state.selectedApps = state.selectedApps.filter(
				app => app.packageName !== payload.packageName,
			);
		},
		setSelectedApps: (state, { payload }: PayloadAction<AppDetail[]>) => {
			state.selectedApps = payload;
		},
		onOpenActiveScreenDB: state => {
			state.activeScreenDB = true;
		},
		onOpenSelectedAppDB: state => {
			state.selectedAppDB = true;
		},
		addNotification: (state, { payload }: PayloadAction<Notification>) => {
			state.notifications.push(payload);
		},
	},
});

export const {
	setActiveScreen,
	addSelectedApps,
	deleteSelectedApps,
	setSelectedApps,
	onOpenActiveScreenDB,
	onOpenSelectedAppDB,
	addNotification,
} = paramsSlice.actions;

export default paramsSlice.reducer;
