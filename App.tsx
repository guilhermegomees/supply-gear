import { StatusBar } from 'expo-status-bar';
import { AppRoutes } from './src/routes';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import store from './src/store';
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          "Alerta",
          "Seu celular está desconectado. Verifique sua conexão com a internet.",
          [{ text: "OK" }]
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    
    <Provider store={store}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  )
}