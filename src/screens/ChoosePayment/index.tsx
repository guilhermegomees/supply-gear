import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import PixLogo from "../../../assets/images/pix-logo.svg";
import { Barcode, CaretDown, CaretRight, CreditCard } from 'phosphor-react-native';
import globalStyles from '../../css/globalStyles';

interface ChoosePaymentProps {
  onNext: () => void;
}

const ChoosePayment: React.FC<ChoosePaymentProps> = ({ onNext }) => {
  const data = [
    { id: '1', name: 'Pix', enabled: true, approval: 'Aprovação em minutos', icon: <PixLogo height={35} width={35} /> },
    { id: '2', name: 'Cartão de crédito', enabled: false, icon: <CreditCard size={34} weight="fill" /> },
    { id: '3', name: 'Boleto', enabled: false, approval: 'Aprovação em até 3 dias', icon: <Barcode size={34} weight="bold" /> },
  ];

  const renderItem = ({ item, index }: { item: { id: string; name: string; enabled: boolean; approval?: string, icon: any }; index: number }) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (item.enabled) {
            onNext();
          }
        }}
        style={[{backgroundColor : '#fff'}]}
        disabled={!item.enabled}
      >
        <View style={[globalStyles.flexRow, globalStyles.alignItemsCenter, globalStyles.flexSpaceBetween, globalStyles.py10, globalStyles.px30, item.enabled ? globalStyles.opacity100 : globalStyles.opacity30]}>
          <View style={[globalStyles.flexRow, globalStyles.flexCenter, globalStyles.gap20]}>
            {item.icon}
            <Text style={[globalStyles.fontSizeMedium, globalStyles.fontWeight500, {color: '#000'}]}>{item.name}</Text>
          </View>
          <View style={[globalStyles.flexRow, globalStyles.alignItemsCenter, globalStyles.gap5]}>
            {item.approval ? (
              <View style={[
                { backgroundColor: item.id == '1' ? 'rgba(73, 221, 88, 0.4)' : '', borderRadius: 8 },
                item.id === '1' ? globalStyles.px10 : null,
                item.id === '1' ? globalStyles.py5 : null]}>
                <Text style={[{ fontSize: 10 }, globalStyles.fontWeight400]}>{item.approval}</Text>
              </View>
            ) : (
              null
            )}
            {item.id != '2' ? (
              <CaretRight size={15} weight="bold" />
            ) : (
              <CaretDown size={15} weight="bold" />
            )}
          </View>
        </View>
      </TouchableOpacity>
      {
        index < data.length - 1 && (
          <View style={{ height: 1, backgroundColor: '#EFEFEF', marginLeft: 34, marginRight: 10 }} />
        )
      }
    </View>
  );

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={[globalStyles.mt5]}
      />
    </View>
  );
};

export default ChoosePayment;