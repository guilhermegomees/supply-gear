import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { isUserLoggedIn } from '../store';

import { Login } from '../screens/Login';
import { Register } from '../screens/Register';
import { Home } from '../screens/Home';
import { Product } from '../screens/Product';
import { Bag } from '../screens/Bag';
import { Profile } from '../screens/Profile';
import { Orders } from '../screens/Orders';
import { OrderDetails } from '../screens/OrderDetails';
import { MainPayment } from '../screens/MainPayment';

const Stack = createStackNavigator();

export function AppRoutes() {
    const isUserLogged = useSelector(isUserLoggedIn);
    const initialRouteName = isUserLogged ? "Home" : "Login";

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Product" component={Product} />
                <Stack.Screen name="Bag" component={Bag} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Orders" component={Orders} />
                <Stack.Screen name="OrderDetails" component={OrderDetails} />
                <Stack.Screen name="MainPayment" component={MainPayment} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}