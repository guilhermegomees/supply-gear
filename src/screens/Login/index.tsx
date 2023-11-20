import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { signInUpStyles } from "../../css/signInUpStyles";
import { EnvelopeSimple, Eye, EyeClosed, LockKey } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { api } from "../../services/api";
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../../assets/images/logo.svg';
import { loginUser } from '../../actions/userActions';
import { Buffer } from 'buffer';

interface User {
  idUser: number;
  nomeUser: string;
  username: string;
  password: string;
  fkIdCompany: number;
}

export function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para codificar uma string para Base64 em Node.js
  function encodeBase64Node(str: string): string {
    // Use a classe 'Buffer' para codificar a string para Base64
    return Buffer.from(str).toString('base64');
  }

  const handleLoginPress = async () => {
    const emailValid = validateEmail(email);
    //const passwordValid = validatePassword(password);
    const criptPassword = encodeBase64Node(password);
    if (emailValid/* && passwordValid*/) {
      const response = await api.get<User[]>('/getUsuarios');
      const user = response.data;

      const matchingUser: any = user.find(
        (user) => user.username === email && user.password === criptPassword
      );

      if (matchingUser) {
        dispatch(loginUser(matchingUser.idUser));
        navigation.navigate('Home');
      } else {
        setError('E-mail ou senha incorretos!');
      }
    } else {
      setError('E-mail ou senha incorretos!');
    }
  };

  const validateEmail = (value: string): boolean => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError('');
      return false;
    }

    setError('');
    return true;
  };

  const validatePassword = (value: string): boolean => {
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setError('');
      return false;
    }

    setError('');
    return true;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const renderErrorText = (error: string | null) => {
    return error ? <Text style={[signInUpStyles.errorText, globalStyles.fontWeight700]}>{error}</Text> : null;
  };

  const handleRegisterScreenPress = () => {
    navigation.navigate('Register');
    setError('');
  };

  return (
    <View style={styles.body}>
      <View style={styles.containerLogo}>
        <View style={[{ width: 100, height: 100 }, globalStyles.flexCenter]}>
          <Logo width={100} height={100} />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={signInUpStyles.headerText}>Login</Text>
        {/* EMAIL */}
        <Text style={[signInUpStyles.labelInput, globalStyles.mt10]}>E-MAIL</Text>
        <View style={[signInUpStyles.containerInput, error ? signInUpStyles.errorInput : null]}>
          <EnvelopeSimple size={25} color="black" weight="fill" style={[globalStyles.ml5, globalStyles.opacity60]} />
          <TextInput
            style={signInUpStyles.input}
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>

        {/* SENHA */}
        <Text style={[signInUpStyles.labelInput, globalStyles.mt10]}>SENHA</Text>
        <View style={[signInUpStyles.containerInput, error ? signInUpStyles.errorInput : null, globalStyles.pr20]}>
          <LockKey size={25} color="black" weight="fill" style={[globalStyles.ml5, globalStyles.opacity60]} />
          <TextInput
            style={signInUpStyles.input}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            //style={globalStyles.ml0}
            onPress={togglePasswordVisibility} >
            {showPassword ? (
              <EyeClosed size={25} color="black" weight="bold" style={globalStyles.opacity60} />
            ) : (
              <Eye size={25} color="black" weight="bold" style={globalStyles.opacity60} />
            )}
          </TouchableOpacity>
        </View>

        {/* ERROR */}
        {renderErrorText(error)}

        {/* Button - Entrar */}
        <TouchableOpacity style={[signInUpStyles.button, globalStyles.mt40]} onPress={handleLoginPress}>
          <Text style={signInUpStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity>
        <Text style={[styles.containerText, globalStyles.mt50, globalStyles.textCenter]}>Esqueceu sua senha?</Text>
      </TouchableOpacity> */}

        <Text style={[signInUpStyles.containerText, globalStyles.mt50, globalStyles.textCenter]}>Ainda não possui uma conta?</Text>
        <TouchableOpacity onPress={handleRegisterScreenPress}>
          <Text style={[signInUpStyles.containerText, globalStyles.mt10, globalStyles.textCenter]}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login;