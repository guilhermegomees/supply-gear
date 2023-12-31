import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import { ArrowSquareLeft, CreditCard, CheckSquareOffset, Wallet, Barcode } from "phosphor-react-native";
import PixLogo from "../../../assets/images/pix-logo.svg";
import { useSelector } from "react-redux";
import { api } from "../../services/api";

import ChoosePayment from '../ChoosePayment';
import BagReview from '../BagReview';
import Payment from '../Payment';

import ProgressIndicator from '../../components/ProgressIndicator';

interface Product {
  id: number;
  nameProduct: string;
  descript: string;
  techniqueSheet: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDetail {
  idDetail: number;
  fkIdCart: number;
  fkIdProduct: number;
  quantity: number;
  unityPrice: string;
  subTotal: string;
}

type MainPaymentRouteProp = RouteProp<{
  MainPayment: { products: Product[]; cartDetails: CartDetail[], cartId: number };
}, 'MainPayment'>;

export function MainPayment() {
  const route = useRoute<MainPaymentRouteProp>();
  const { products, cartDetails, cartId } = route.params;

  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [progressStatus, setProgressStatus] = useState<'initial' | 'partial' | 'complete'>('initial');

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleHomeScreenPress = () => {
    if (currentScreen > 1) {
      // Se estiver em uma tela diferente da primeira, voltar para a tela anterior
      handleScreenChange(currentScreen - 1);
    } else {
      // Se estiver na primeira tela, navegar para a tela 'Bag'
      navigation.navigate('Bag');
    }
  };

  const handleScreenChange = (nextScreen: number) => {
    if (nextScreen > currentScreen) {
      // Avançar para a próxima tela
      setCurrentScreen(nextScreen);

      switch (nextScreen) {
        case 2:
          setProgressStatus('partial');
          break;
        case 3:
          setProgressStatus('complete');
          break;
        default:
          setProgressStatus('initial');
      }
    } else if (nextScreen < currentScreen) {
      // Voltar para a tela anterior
      setCurrentScreen(nextScreen);

      switch (nextScreen) {
        case 1:
          setProgressStatus('initial');
          break;
        case 2:
          setProgressStatus('partial');
          break;
        default:
          setProgressStatus('initial');
      }
    }
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 1:
        return <ChoosePayment onNext={() => handleScreenChange(currentScreen + 1)} />;
      case 2:
        return <BagReview products={products} cartDetails={cartDetails} onNext={() => handleScreenChange(currentScreen + 1)} />;
      case 3:
        return <Payment cartId={cartId} />;
      default:
        return null;
    }
  };

  return (
    <>
      <View style={[styles.container]}>
        <View style={[globalStyles.w100, globalStyles.mt60, globalStyles.flexColumn, globalStyles.pb40]}>
          <TouchableOpacity style={[globalStyles.ml30, globalStyles.mb10]} onPress={handleHomeScreenPress}>
            <ArrowSquareLeft size={35} color="black" />
          </TouchableOpacity>
          <ProgressIndicator status={progressStatus} />
        </View>
      </View>
      {renderContent()}
    </>
  );
}

export default MainPayment;