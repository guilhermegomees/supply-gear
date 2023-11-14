import { TouchableOpacity, View, Text, Alert } from 'react-native';
import globalStyles from '../../css/globalStyles';
import { styles } from './styles';
import { CheckCircle } from 'phosphor-react-native';
import Logo from '../../../assets/images/logo.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export function PaymentConfirmation() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={[]}>
      <View style={[globalStyles.w100, globalStyles.flexColumn, globalStyles.pb30, globalStyles.alignItemsCenter, { backgroundColor: '#fff', paddingTop: 70 }]}>
        <CheckCircle size={60} color="#0eb500" weight="bold" />
      </View>
      <View style={[globalStyles.h100, globalStyles.alignItemsCenter, globalStyles.justifyContentStart, styles.container, globalStyles.mt5, { backgroundColor: '#fff' }, globalStyles.px50]}>
        <Text style={[styles.title, globalStyles.pt40, {fontSize: 20} ]}>Pagamento Finalizado</Text>
        <Text style={[styles.title, globalStyles.pt25, globalStyles.pb40]}>Obrigado por escolher a SupplyGear! Sua confiança e apoio são fundamentais para nós. Tenha uma ótima experiência!</Text>
        <View style={[globalStyles.flexRow, globalStyles.gap10]}>
          <TouchableOpacity style={[styles.button]} onPress={() => { navigation.navigate("Home"); }}>
            <Text style={styles.buttonText}>Continuar comprando</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={() => { navigation.navigate("Orders"); }}>
            <Text style={styles.buttonText}>Ir para Meus Pedidos</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.logo, {marginTop: 220}]}>
          <Logo height={100} width={100} />
        </View>
      </View>
    </View>
  );
};

export default PaymentConfirmation;