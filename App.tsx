import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Screens from './src/screens';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { ThemeProvider } from 'styled-components';
import theme from './src/utils/theme';

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<NavigationContainer>
					<Screens />
				</NavigationContainer>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
