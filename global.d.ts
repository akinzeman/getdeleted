/// <reference types="react-scripts" />

import 'styled-components';
import theme from './src/utils/theme';

type CustomTheme = typeof theme;

declare module 'styled-components' {
	export interface DefaultTheme extends CustomTheme {}
}

declare global {
	interface Notification {
		notification: {
			time: string;
			app: string;
			title: string;
			titleBig: string;
			text: string;
			subText: string;
			summaryText: string;
			bigText: string;
			audioContentsURI: string;
			imageBackgroundURI: string;
			extraInfoText: string;
			groupedMessages: {
				title: string;
				text: string;
			}[];
			icon: string;
			iconLarge: string;
			image: string;
		};
	}

	type StackParamList = {
		Splash: undefined;
		First: undefined;
		Permission: undefined;
		Third: undefined;
		SelectApps: undefined;
		Last: undefined;
		Home: undefined;
		Profile: undefined;
	};
	type StackNavigation = StackNavigationProp<StackParamList>;
}

export {};
