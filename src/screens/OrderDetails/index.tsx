import { ArrowSquareLeft } from 'phosphor-react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../../css/globalStyles';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function OrderDetails({ route }: { route: any }) {
  const { orderId } = route.params;

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleHomeScreenPress = () => {
    navigation.navigate('Orders');
  };

  return (
    <View>
      <View style={[styles.container]}>
        <View style={[globalStyles.w100, globalStyles.mt60, globalStyles.flexColumn, globalStyles.justifyContentCenter]}>
          <TouchableOpacity style={globalStyles.ml30} onPress={handleHomeScreenPress}>
            <ArrowSquareLeft size={35} color="black" />
          </TouchableOpacity>
          <Text style={[styles.textOrders, globalStyles.ml35, globalStyles.mt30, globalStyles.mb20]}>Detalhes do Pedido {orderId}</Text>
        </View>
      </View>
    </View>
  );
}

export default OrderDetails;