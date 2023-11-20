import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { House, Bag, Package, User, SmileyXEyes } from 'phosphor-react-native';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from "react";
import Logo from '../../../assets/images/logo.svg';

import ProductList from './../../components/ProductList';
import BagScreen from './../Bag';
import OrdersScreen from './../Orders';
import ProfileScreen from './../Profile';
import SearchBar from '../../components/SearchBar';

import { api } from "../../services/api";
import store from '../../store';
import { Provider, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  const fetchProducts = async (): Promise<any> => {
    try {
      const response = await api.get('/getProducts');

      const products: [] = response.data.map((item: any) => ({
        id: item.id,
        name: item.nameProduct,
        price: item.price,
        image: item.image
      }));

      return products;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const loadedProducts = await fetchProducts();
        setProducts(loadedProducts);
        setFilteredProducts(loadedProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    loadProducts();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered : any = products.filter((product : any) =>
      product.name.toLowerCase().startsWith(text.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowNoResultsMessage(filtered.length === 0);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Logo height={45} />
        <SearchBar onSearch={handleSearch} />
      </View>
      {filteredProducts.length === 0 && showNoResultsMessage ? (
        <View style={styles.noResultsContainer}>
          <SmileyXEyes color={'black'} size={80} weight="bold" />
          <Text style={styles.noResultsText}>Nenhum resultado encontrado</Text>
        </View>
      ) : (
        <>
          <ProductList products={filteredProducts} />
        </>
      )}
    </>
  );
}

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
              {route.name === 'HomeScreen' && <House color={isFocused ? '#fff' : '#898989'} size={25} />}
              {route.name === 'Sacola' && <Bag color={isFocused ? '#fff' : '#898989'} size={25} />}
              {route.name === 'Pedidos' && <Package color={isFocused ? '#fff' : '#898989'} size={25} />}
              {route.name === 'Perfil' && <User color={isFocused ? '#fff' : '#898989'} size={25} />}
              <Text style={[{ color: isFocused ? '#fff' : '#898989' }, globalStyles.textCenter, globalStyles.fontSizeMedium, globalStyles.fontWeight400 ]}>{route.name === 'HomeScreen' ? 'Home' : label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function Home() {

  return (
    <Provider store={store}>
      <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Sacola" component={BagScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Pedidos" component={OrdersScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Perfil" component={ProfileScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </Provider>
  )
}

export default Home;