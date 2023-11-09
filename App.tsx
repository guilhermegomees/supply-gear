import { StatusBar } from 'expo-status-bar';
import { AppRoutes } from './src/routes';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      <StatusBar style="auto" />
    </Provider>
  )
}