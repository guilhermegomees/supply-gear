import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home';
import BagScreen from '../../screens/Bag';
import OrdersScreen from '../../screens/Orders';
import ProfileScreen from '../../screens/Profile';
import ProductScreen from '../../screens/Product';
import { Provider } from 'react-redux';
import store from '../../store';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { House, Bag, Package, User } from 'phosphor-react-native';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }: {
    state: any;
    descriptors: any;
    navigation: any;
}) {
    return (
        <View style={[styles.tBarContainer, globalStyles.pt10]}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={globalStyles.p10}
                    >
                        <View style={globalStyles.alignItemsCenter}>
                            {route.name === 'Home' && <House color={isFocused ? '#fff' : '#898989'} size={25} />}
                            {route.name === 'Bag' && <Bag color={isFocused ? '#fff' : '#898989'} size={25} />}
                            {route.name === 'Orders' && <Package color={isFocused ? '#fff' : '#898989'} size={25} />}
                            {route.name === 'Profile' && <User color={isFocused ? '#fff' : '#898989'} size={25} />}
                            <Text style={[{ color: isFocused ? '#fff' : '#898989' }, globalStyles.textCenter, globalStyles.fontSizeMedium, globalStyles.fontWeight400]}>
                                {route.name === 'Home' ? 'Home' : route.name === 'Orders' ? 'Pedidos' : route.name === 'Bag' ? 'Sacola' : route.name === 'Profile' ? 'Perfil' : label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const MainTabNavigator = () => {
    return (
        <Provider store={store}>
            <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Bag" component={BagScreen} />
                <Tab.Screen name="Orders" component={OrdersScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </Provider>
    );
};

export default MainTabNavigator;