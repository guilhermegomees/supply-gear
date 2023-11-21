import { StatusBar } from 'expo-status-bar';
import { AppRoutes } from './src/routes';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  )
}