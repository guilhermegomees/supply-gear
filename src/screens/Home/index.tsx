import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { House, Bag, Package, User, SmileyXEyes } from 'phosphor-react-native';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from "react";
import Logo from '../../../assets/images/logo.svg';
import { useFocusEffect } from '@react-navigation/native';

import ProductList from './../../components/ProductList';
import BagScreen from './../Bag';
import OrdersScreen from './../Orders';
import ProfileScreen from './../Profile';
import SearchBar from '../../components/SearchBar';

import { api } from "../../services/api";
import store from '../../store';
import { Provider, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export function Home() {
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

      setProducts(products);
      setFilteredProducts(products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
    }, [])
  );

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

export default Home;