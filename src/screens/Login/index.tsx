import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { signInUpStyles } from "../../css/signInUpStyles";
import { EnvelopeSimple, Eye, EyeClosed, LockKey } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import Logo from '../../../assets/images/logo.svg';

export function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginPress = () => {
    // const emailValid = validateEmail(email);
    // const passwordValid = validatePassword(password);

    // if (emailValid && passwordValid) {
    //   Alert.alert('Success');
    // } else {
    //   setError('E-mail ou senha incorretos!');
    // }
    navigation.navigate('Home');
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
    return error ? <Text style={signInUpStyles.errorText}>{error}</Text> : null;
  };

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleRegisterScreenPress = () => {
    navigation.navigate('Register');
    setError('');
  };

  return (
    <View style={styles.body}>
      <View style={styles.containerLogo}>
        <View style={[{ width: 130, height: 130 }, globalStyles.flexCenter]}>
          <Logo width={130} height={130} />
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
        <View style={[signInUpStyles.containerInput, error ? signInUpStyles.errorInput : null]}>
          <LockKey size={25} color="black" weight="fill" style={[globalStyles.ml5, globalStyles.opacity60]} />
          <TextInput
            style={signInUpStyles.input}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={globalStyles.ml15}
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

        <TouchableOpacity onPress={handleRegisterScreenPress}>
          <Text style={[signInUpStyles.containerText, globalStyles.mt50, globalStyles.textCenter]}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login;