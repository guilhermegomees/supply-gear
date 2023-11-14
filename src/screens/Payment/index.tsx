import { useState } from 'react';
import { TouchableOpacity, View, Text, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import globalStyles from '../../css/globalStyles';
import { styles } from './styles';
import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Payment: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isPaymentConfirmed, setPaymentConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pixCode, setPixCode] = useState('01234567890123456789012345');

  const handleCopyPixCode = () => {
    if (Clipboard) {
      //Clipboard.setString('pixCode');
      showAlertWithCustomTitle();
      setCopied(true);
      setPaymentConfirmed(true);
    } else {
      alert('Não foi possível acessar a área de transferência.');
    }
  };

  const showAlertWithCustomTitle = () => {
    Alert.alert(
      'Pix',
      'Código Pix copiado para a área de transferência!',
      [
        { text: 'OK' },
      ],
      { cancelable: false }
    );
  };

  const handleConfirmPayment = () => {
    navigation.navigate('PaymentConfirmation');
  };

  return (
    <>
      <View style={[globalStyles.flex9, globalStyles.alignItemsCenter, globalStyles.justifyContentCenter, styles.container, globalStyles.mt5]}>
        {/* Seção com o QR Code do Pix */}
        <Text style={[styles.title, globalStyles.py20]}>PIX</Text>
        <View style={[globalStyles.mb50]}>
          <QRCode value={pixCode} size={200} />
        </View>

        {/* Botão para copiar o código Pix */}
        <TouchableOpacity
          style={[
            styles.button,
            globalStyles.mb20,
            { backgroundColor: copied ? '#0EB500' : '#005B8E' },
          ]}
          onPress={handleCopyPixCode}
          disabled={copied}
        >
          <Text style={styles.buttonText}>{copied ? 'Copiado' : 'Copiar'}</Text>
        </TouchableOpacity>

        {/* Botão para confirmar o pagamento (habilitado apenas se o código Pix foi copiado) */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isPaymentConfirmed ? '#005B8E' : '#C5C5C5' }]}
          onPress={handleConfirmPayment}
          disabled={!isPaymentConfirmed}
        >
          <Text style={[styles.buttonText]}>Pagamento efetuado</Text>
        </TouchableOpacity>
      </View>
      <View style={[globalStyles.flex1, globalStyles.flexRow, globalStyles.flexSpaceBetween, globalStyles.alignItemsCenter, globalStyles.px20, globalStyles.mt20, {backgroundColor: '#FFF'}]}>
        <Text style={[styles.sectionsTitle]}>Total</Text>
        <Text style={[styles.sectionsSubTitle]}>R$ 0,00</Text>
      </View>
    </>
  );
};

export default Payment;