import { Text, View } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";

export function Orders() {
  return (
    <View style={[globalStyles.flex1, globalStyles.flexCenter]}>
      <Text>Pedidos</Text>
    </View>
  )
}

export default Orders;