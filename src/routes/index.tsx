import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from '../store';

import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Home } from '../screens/Home';
import { Product } from '../screens/Product';

const Stack = createStackNavigator();

export function AppRoutes() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Product" component={Product} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}