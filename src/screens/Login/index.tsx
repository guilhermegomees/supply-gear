import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "./styles";
import { Buildings, Eye, EyeClosed, Key } from 'phosphor-react-native';
import React, { useEffect, useState } from "react";
import Logo from '../../../assets/images/logo.svg';

export function Login() {
  const [cnpj, setCnpj] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [cnpjError, setCnpjError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const formatCnpj = (inputValue: string): string => {
      const numericValue: string = inputValue.replace(/\D/g, '');
      const cnpjMasked = numericValue.replace(
          /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2}).*/,
          (match, p1, p2, p3, p4, p5) => {
              let masked = '';
              if (p1) masked += p1;
              if (p2) masked += `.${p2}`;
              if (p3) masked += `.${p3}`;
              if (p4) masked += `/${p4}`;
              if (p5) masked += `-${p5}`;
              return masked;
          }
      );
      return cnpjMasked;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginPress = () => {
    const cnpjValid = validateCnpj(cnpj);
    const passwordValid = validatePassword(password);

    if (cnpjValid && passwordValid) {
      Alert.alert('Success');
    }
  };

  const validateCnpj = (value: string): boolean => {
    const trimmedCnpj = cnpj.trim();
    if (!trimmedCnpj) {
      setCnpjError('CNPJ é obrigatório!');
      return false;
    }

    if (trimmedCnpj.length !== 18) {
      setCnpjError('CNPJ inválido!');
      return false;
    }

    setCnpjError('');
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

  const handleCnpjChange = (text: string) => {
    const formattedCnpj = formatCnpj(text);
    setCnpj(formattedCnpj);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  useEffect(() => {
    if (cnpjError) {
      validateCnpj(cnpj);
    }
  }, [cnpj, cnpjError]);

  useEffect(() => {
    if (passwordError) {
      validatePassword(password);
    }
  }, [password, passwordError]);

  const renderErrorText = (error: string | null, isCnpjError: boolean = false) => {
    const errorStyle = isCnpjError ? styles.errorTextCnpj : null;
    return error ? <Text style={[styles.errorText, errorStyle]}>{error}</Text> : null;
  };

  return (
    <View style={styles.body}>
      <View style={styles.containerLogo}>
        <View style={{ width: 130, height: 130, borderRadius: 65, overflow: 'hidden', justifyContent: "center", alignItems: "center" }}>
          <Logo width={130} height={130} />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Login</Text>
        <Text style={[styles.labelInput, styles.mt40]}>CNPJ</Text>
        <View style={[styles.containerInput, cnpjError ? styles.errorInput : null]}>
          <Buildings size={25} color="black" weight="fill" style={styles.ml5} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={cnpj}
            onChangeText={handleCnpjChange}
          />
        </View>
        {renderErrorText(cnpjError, true)}
        <Text style={styles.labelInput}>Senha</Text>
        <View style={[styles.containerInput, passwordError ? styles.errorInput : null]}>
          <Key size={25} color="black" weight="fill" style={styles.ml5} />
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
        <TouchableOpacity style={[styles.button, styles.mt40]} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.containerText, styles.mt50, styles.textAlignCenter]}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.containerText, styles.mt10, styles.textAlignCenter]}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}