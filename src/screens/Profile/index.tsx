import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { useDispatch, useSelector } from 'react-redux';
import { api } from "../../services/api";
import { signInUpStyles } from "../../css/signInUpStyles";
import { logoutUser } from '../../actions/userActions';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowSquareLeft, Package, SignOut, UserCircle } from "phosphor-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";


interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  company: number;
}

interface Company {
  id: number;
  name: string;
  cnpj: string;
  cep: string;
  address: string;
  number: number;
  district: string;
  city: string;
  state: string;
}

export function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector((state : any) => state.userId);
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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


  // Função para salvar os dados do usuário e empresa no AsyncStorage
  const saveUserDataToLocal = async (userData: User, companyData: Company) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('companyData', JSON.stringify(companyData));
    } catch (error) {
      console.error('Erro ao salvar dados no AsyncStorage:', error);
    }
  };

  // Função para obter os dados do usuário e empresa do AsyncStorage
  const getLocalUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      const companyDataString = await AsyncStorage.getItem('companyData');

      if (userDataString && companyDataString) {
        const userData = JSON.parse(userDataString);
        const companyData = JSON.parse(companyDataString);
        setUser(userData);
        setCompany(companyData);
      }
    } catch (error) {
      console.error('Erro ao obter dados do AsyncStorage:', error);
    }
  };

  const fetchClientAndCompany = async (): Promise<any> => {
    try {
      const responseClient = await api.get(`/getUsuarios/${userId}`);
      const userData = responseClient.data[0];

      const userMapped: User = {
        id: userData.idUser,
        name: userData.nomeUser,
        email: userData.username,
        password: userData.password,
        company: userData.fkIdCompany
      };

      const responseCompany = await api.get(`/getCompanies/${userMapped.company}`);
      const companyData = responseCompany.data[0];

      const companyMapped: Company = {
        id: companyData.idCompany,
        name: companyData.nameCompany,
        cnpj: companyData.CNPJ,
        cep: companyData.cepCompany,
        address: companyData.streetCompany,
        number: companyData.numberCompany,
        district: companyData.districtCompany,
        city: companyData.cityCompany,
        state: companyData.stateCompany
      };

      setUser(userMapped);
      setCompany(companyMapped);

      // Salvar os dados no AsyncStorage
      saveUserDataToLocal(userMapped, companyMapped);
    } catch (error) {
      console.error('Erro ao buscar usuário e empresa:', error);
      // Tente obter os dados do AsyncStorage em caso de falha
      getLocalUserData();
    }
  };

  useEffect(() => {
    fetchClientAndCompany();
  }, []);


  const handleLoginPress = async () => {
    dispatch(logoutUser());
    navigation.navigate('Login');
  };

  const handleHomeScreenPress = () => {
    navigation.navigate('Home');
  };

  const handleOrdersScreenPress = () => {
    navigation.navigate('Orders');
  };

  return (
    <View style={[styles.container]}>
      <View style={[globalStyles.w100, globalStyles.mt60, globalStyles.flexRow, globalStyles.flexSpaceBetween, globalStyles.alignItemsCenter]}>
        <TouchableOpacity style={globalStyles.ml30} onPress={handleHomeScreenPress}>
          <ArrowSquareLeft size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.mr30} onPress={handleLoginPress}>
          <SignOut size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={[globalStyles.w100, globalStyles.mt50, globalStyles.flexColumn, globalStyles.flexCenter]}>
        <UserCircle size={100} weight="fill" />
        <Text style={[styles.textName, globalStyles.mt15]}>{user?.name}</Text>
        <Text style={[styles.textEmail, globalStyles.mt10, globalStyles.mb50]}>{user?.email}</Text>
      </View>
      <TouchableOpacity onPress={handleOrdersScreenPress}>
        <View style={[styles.containerMyOrders, globalStyles.w100, globalStyles.flexRow, globalStyles.alignItemsCenter, globalStyles.flexSpaceBetween, globalStyles.px45]}>
          <Text style={[styles.textMyOrders]}>Meus pedidos</Text>
          <Package size={27} />
        </View>
      </TouchableOpacity>
      <View style={[styles.containerMyCompany, globalStyles.w100, globalStyles.h100, globalStyles.flexColumn, globalStyles.px45]}>
        <Text style={[styles.textMyCompany]}>Minha empresa</Text>
        <View style={[globalStyles.mt20, globalStyles.pr20]}>
          <View style={[globalStyles.flexRow]}>
            <View style={[globalStyles.w40]}>
              <Text style={[styles.titleMyCompany]}>Razão Social</Text>
              <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.name}</Text>
            </View>
            <View style={[globalStyles.w60, globalStyles.ml40]}>
              <Text style={[styles.titleMyCompany]}>CNPJ</Text>
              <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.cnpj}</Text>
            </View>
          </View>
          <View style={[globalStyles.flexRow, globalStyles.mt15]}>
            <View style={[globalStyles.w40]}>
              <Text style={[styles.titleMyCompany]}>Endereço</Text>
              <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.address}</Text>
            </View>
            <View style={[globalStyles.w60, globalStyles.ml40]}>
              <Text style={[styles.titleMyCompany]}>CEP</Text>
              <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.cep}</Text>
            </View>
          </View>
          <View style={[globalStyles.flexRow, globalStyles.mt15]}>
            <View style={[globalStyles.w40]}>
              <Text style={[styles.titleMyCompany]}>Número</Text>
              <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.number}</Text>
            </View>
            <View style={[globalStyles.w60, globalStyles.ml40]}>
              <Text style={[styles.titleMyCompany]}>Bairro</Text>
              <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.district}</Text>
            </View>
          </View>
          <View style={[globalStyles.flexRow, globalStyles.mt15]}>
            <View style={[globalStyles.w40]}>
              <Text style={[styles.titleMyCompany]}>Cidade</Text>
              <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.city}</Text>
            </View>
            <View style={[globalStyles.w60, globalStyles.ml40]}>
              <Text style={[styles.titleMyCompany]}>Estado</Text>
              <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.state}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Profile;