import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { signInUpStyles } from "../../css/signInUpStyles";
import { EnvelopeSimple, Eye, EyeClosed, LockKey, User, ArrowSquareLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import Logo from '../../../assets/images/logo.svg';
import ComboBox, { Option } from '../../components/ComboBox';
import { api } from "../../services/api";

export function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<Option>({ label: null, value: null });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [companyError, setCompanyError] = useState<string>('');

  const [comboBoxOptions, setComboBoxOptions] = useState<Option[]>([]);

  const fetchOptions = async (): Promise<Option[]> => {
    try {
      const response = await api.get('/getCompanies');

      const options: Option[] = response.data.map((item: any) => ({
        label: item.nameCompany,
        value: item.idCompany,
      }));

      return options;
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadComboBoxOptions = async () => {
      try {
        const options = await fetchOptions();
        setComboBoxOptions(options);
      } catch (error) {
        console.error('Erro ao carregar opções:', error);
      }
    };

    loadComboBoxOptions();
  }, []);

  const handleComboBoxSelect = (selectedOption: Option) => {
    setCompany(selectedOption);
    console.log(selectedOption);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginPress = async () => {
    const nameValid = validateName(name);
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    const companyValid = validateCompany(company);

    if (nameValid && emailValid && passwordValid && companyValid) {
      try {
        const response = await api.post('/addUsuarios', {
          nomeUser: name,
          username: email,
          password: password,
          fkIdCompany: company.value, // Supondo que seu endpoint da API espera companyId
        });
        console.log(response);
        // Manipule a resposta, por exemplo, verificando o status da resposta da API
        if (response.status === 200) {
          Alert.alert('Sucesso', 'Conta criada com sucesso');
        } else {
          Alert.alert('Erro', 'Falha ao criar conta. Por favor, tente novamente mais tarde.');
        }
      } catch (error) {
        // Trate os erros, por exemplo, mostrando uma mensagem de erro
        console.error('Erro durante o registro:', error);
        Alert.alert('Erro', 'Falha ao criar conta. Por favor, tente novamente mais tarde.');
      }
    }
  };

  const validateName = (value: string): boolean => {
    if (!name) {
      setNameError('Nome é obrigatório!');
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

  const validateCompany = (value: Option): boolean => {
    if (company.label === null && company.value === null) {
      setCompanyError('Empresa é obrigatório!');
      return false;
    }

    setCompanyError('');
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

  useEffect(() => {
    if (companyError) {
      validateCompany(company);
    }
  }, [company, companyError]);

  const renderErrorText = (error: string | null) => {
    return error ? <Text style={[signInUpStyles.errorText, globalStyles.zIndexNeg1]}>{error}</Text> : null;
  };

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleLoginScreenPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleLoginScreenPress}>
          <ArrowSquareLeft size={35} color="white" style={{ top: 90, left: 50 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerImage}>
        <Logo height={80}/>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={signInUpStyles.headerText}>Crie uma conta</Text>

        {/* NOME */}
        <Text style={[signInUpStyles.labelInput, globalStyles.mt40]}>NOME</Text>
        <View style={[signInUpStyles.containerInput, nameError ? signInUpStyles.errorInput : null]}>
          <User size={25} color="black" weight="fill" style={[globalStyles.ml5, globalStyles.opacity60]} />
          <TextInput
            style={signInUpStyles.input}
            value={name}
            onChangeText={handleNameChange}
          />
        </View>
        {renderErrorText(nameError)}

        {/* EMAIL */}
        <Text style={[signInUpStyles.labelInput, globalStyles.mt10]}>E-MAIL</Text>
        <View style={[signInUpStyles.containerInput, emailError ? signInUpStyles.errorInput : null]}>
          <EnvelopeSimple size={25} color="black" weight="fill" style={[globalStyles.ml5, globalStyles.opacity60]} />
          <TextInput
            style={signInUpStyles.input}
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>
        {renderErrorText(emailError)}

        {/* SENHA */}
        <Text style={[signInUpStyles.labelInput, globalStyles.mt10]}>SENHA</Text>
        <View style={[signInUpStyles.containerInput, passwordError ? signInUpStyles.errorInput : null, globalStyles.pr20]}>
          <LockKey size={25} color="black" weight="fill" style={[globalStyles.ml5, globalStyles.opacity60]} />
          <TextInput
            style={signInUpStyles.input}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={globalStyles.mr5}
            onPress={togglePasswordVisibility} >
            {showPassword ? (
              <EyeClosed size={25} color="black" weight="bold" style={globalStyles.opacity60} />
            ) : (
              <Eye size={25} color="black" weight="bold" style={globalStyles.opacity60} />
            )}
          </TouchableOpacity>
        </View>
        {renderErrorText(passwordError)}

        <Text style={[signInUpStyles.labelInput, globalStyles.mt10]}>EMPRESA</Text>
        <View style={[globalStyles.zIndex5, signInUpStyles.containerInput, companyError ? signInUpStyles.errorInput : null, globalStyles.p0]}>
          <ComboBox options={comboBoxOptions} onSelect={handleComboBoxSelect} />
        </View>
        {renderErrorText(companyError)}

        {/* Button - Cadastrar */}
        <TouchableOpacity style={[globalStyles.zIndex1, signInUpStyles.button, globalStyles.mt40]} onPress={handleLoginPress}>
          <Text style={signInUpStyles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/*  */}
        <Text style={[signInUpStyles.containerText, globalStyles.mt50, globalStyles.textCenter]}>Já possui uma conta?</Text>
        <TouchableOpacity onPress={handleLoginScreenPress} style={globalStyles.zIndexNeg1}>
          <Text style={[signInUpStyles.containerText, globalStyles.mt10, globalStyles.textCenter, globalStyles.textUnderline]}>Entre aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Register;