import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { useDispatch, useSelector } from 'react-redux';
import { api } from "../../services/api";
import { signInUpStyles } from "../../css/signInUpStyles";
import { logoutUser } from '../../actions/userActions';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  company: number;
}

export function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector((state : any) => state.userId);
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const fetchClient = async (): Promise<any> => {
    try {
      const response = await api.get(`/getUsuarios/${userId}`);
      const userData = response.data[0];

      const userMapped: User = {
        id: userData.idUser,
        name: userData.nomeUser,
        email: userData.username,
        password: userData.password,
        company: userData.fkIdCompany
      };

      setUser(userMapped);
    } catch (error) {
      console.error(`Erro ao buscar usuário com id: ${userId}`, error);
      throw error;
    }
  };

  useEffect(() => {
    fetchClient();
  }, []);

  const handleLoginPress = async () => {
    // Despache a ação para fazer logout
    dispatch(logoutUser());

    // Redirecione para a tela de login
    navigation.navigate('Login');
  };

  return (
    <View style={[globalStyles.flex1, globalStyles.flexCenter]}>
      <Text>Perfil</Text>
      {user ? (
        <>
          <Text>ID: {user.id}</Text>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Password: {user.password}</Text>
          <Text>Company: {user.company}</Text>
          {/* Button - Entrar */}
          <TouchableOpacity style={[signInUpStyles.button, globalStyles.mt40]} onPress={handleLoginPress}>
            <Text style={signInUpStyles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}

export default Profile;