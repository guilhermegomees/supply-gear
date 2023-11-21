import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { isUserLoggedIn } from '../store';

import MainTabNavigator from '../components/TabNavigator';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Product from '../screens/Product';
import Orders from '../screens/Orders';
import OrderDetails from '../screens/OrderDetails';
import MainPayment from '../screens/MainPayment';
import PaymentConfirmation from '../screens/PaymentConfirmation';

const Stack = createStackNavigator();

export function AppRoutes() {
    // const isUserLogged = useSelector(isUserLoggedIn);
    // const initialRouteName = isUserLogged ? "Home" : "Login";

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="MainPayment" component={MainPayment} />
            <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmation} />
        </Stack.Navigator>
    );
}