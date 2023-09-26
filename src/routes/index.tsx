import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/Login';
import { Register } from '../screens/Register';

const Stack = createStackNavigator();

export function AppRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}