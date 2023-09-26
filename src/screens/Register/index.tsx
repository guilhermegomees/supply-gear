import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "./styles";
import { EnvelopeSimple, Eye, EyeClosed, LockKey, User } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import Logo from '../../../assets/images/logo.svg';

export function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginPress = () => {
    const nameValid = validateName(name);
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (nameValid && emailValid && passwordValid) {
      Alert.alert('Success');
    }
  };

  const validateName = (value: string): boolean => {
    if (!name) {
      setNameError('Nome/Razão Social é obrigatório!');
      return false;
    }

    setNameError('');
    return true;
  };

  const validateEmail = (value: string): boolean => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('E-mail é obrigatório!');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(trimmedEmail)) {
      setEmailError('Informe um e-mail válido!');
      return false;
    }

    setEmailError('');
    return true;
  };

  const validatePassword = (value: string): boolean => {
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setPasswordError('Senha é obrigatória!');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(trimmedPassword)) {
      setPasswordError('Sua senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial e ter pelo menos 8 caracteres!');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  useEffect(() => {
    if (nameError) {
      validateName(name);
    }
  }, [name, nameError]);

  useEffect(() => {
    if (emailError) {
      validateEmail(email);
    }
  }, [email, emailError]);

  useEffect(() => {
    if (passwordError) {
      validatePassword(password);
    }
  }, [password, passwordError]);

  const renderErrorText = (error: string | null) => {
    return error ? <Text style={[styles.errorText]}>{error}</Text> : null;
  };

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleLoginScreenPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}></View>
      <View style={styles.containerImage}>
        <Logo height={80}/>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.headerText}>Crie uma conta</Text>

        {/* NOME */}
        <Text style={[styles.labelInput, styles.mt40]}>NOME/RAZÃO SOCIAL</Text>
        <View style={[styles.containerInput, nameError ? styles.errorInput : null]}>
          <User size={25} color="black" weight="fill" style={styles.ml5} />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleNameChange}
          />
        </View>
        {renderErrorText(nameError)}

        {/* EMAIL */}
        <Text style={[styles.labelInput, styles.mt10]}>E-MAIL</Text>
        <View style={[styles.containerInput, emailError ? styles.errorInput : null]}>
          <EnvelopeSimple size={25} color="black" weight="fill" style={styles.ml5} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>
        {renderErrorText(emailError)}

        {/* SENHA */}
        <Text style={[styles.labelInput, styles.mt10]}>SENHA</Text>
        <View style={[styles.containerInput, passwordError ? styles.errorInput : null]}>
          <LockKey size={25} color="black" weight="fill" style={styles.ml5} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.pl15}
            onPress={togglePasswordVisibility} >
            {showPassword ? (
              <EyeClosed size={25} color="black" weight="bold" />
            ) : (
              <Eye size={25} color="black" weight="bold" />
            )}
          </TouchableOpacity>
        </View>
        {renderErrorText(passwordError)}

        {/* Button - Cadastrar */}
        <TouchableOpacity style={[styles.button, styles.mt40]} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/*  */}
        <Text style={[styles.containerText, styles.mt50, styles.textAlignCenter]}>Já possui uma conta?</Text>
        <TouchableOpacity onPress={handleLoginScreenPress}>
          <Text style={[styles.containerText, styles.mt10, styles.textAlignCenter, styles.textUndeline]}>Entre aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Register;