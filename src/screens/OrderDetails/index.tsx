import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../../css/globalStyles';
import { styles } from './styles';
import { signInUpStyles } from '../../css/signInUpStyles';
import Logo from '../../../assets/images/logo.svg';
import PixLogo from "../../../assets/images/pix-logo.svg";
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../../services/api';
import { useSelector } from 'react-redux';
import { fetchImage } from '../../util';
import { ArrowSquareLeft } from 'phosphor-react-native';

interface BagReviewProps {
  products: Product[];
  cartDetails: CartDetail[];
  onNext: () => void;
}

interface CartDetail {
  idDetail: number;
  fkIdCart: number;
  fkIdProduct: number;
  quantity: number;
  unityPrice: string;
  subTotal: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  company: number;
}

interface Company {
  id: number;
  name: string;
  cnpj: string;
  cep: string;
  address: string;
  number: number;
  district: string;
  city: string;
  state: string;
}

interface Product {
  id: number;
  nameProduct: string;
  descript: string;
  techniqueSheet: string;
  price: number;
  quantity: number;
  image: string;
}

interface BagItemProps {
  product: Product;
}

interface BagListProps {
  bag: Product[];
}

const ProductItem: React.FC<BagItemProps> = ({ product }) => {
  const [imagem, setImagem] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const formatPrice = (price: number): string => {
    return price.toString().replace('.', ',');
  };

  useEffect(() => {
    if (product && product.image) {
      fetchImage(
        product.image,
        (base64: string) => setImagem(base64),
        (errorMessage: string) => setError(errorMessage),
        setLoading
      );
    }
  }, [product]);

  return (
    <>
      <View style={[styles.containerOrder, globalStyles.px10]}>
        <View key={product.id} style={[globalStyles.dFlex, globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
          <View style={[globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
            <View style={[globalStyles.flexRow, globalStyles.gap17]}>
              {loading ? (
                <View style={[styles.imgProduct, globalStyles.flexCenter]}>
                  <Image
                    source={require('../../../assets/loading.gif')}
                    style={{
                      width: 50,
                      height: 50
                    }}
                  />
                </View>
              ) : (
                <Image
                  source={{ uri: imagem }}
                  style={[styles.imgProduct]}
                  resizeMode="contain"
                />
              )}
              <View>
                <Text style={[styles.containerOrderText, globalStyles.mt20, { width: 170 }]}>{product.nameProduct}</Text>
                <Text style={[styles.containerOrderText, globalStyles.mt5]}>Quantidade: {product.quantity}</Text>
              </View>
            </View>
          </View>
          <View style={[globalStyles.mt35]}>
            <Text style={[styles.textPrice, globalStyles.mt15, globalStyles.ml5, globalStyles.mb10]}>R$ {formatPrice(product.price)}</Text>
          </View>
        </View>
      </View>
      <View style={[globalStyles.my15, globalStyles.flexCenter]}>
        <View style={styles.divider}></View>
      </View>
    </>
  );
};

const BagList: React.FC<BagListProps> = ({ bag }) => {
  return (
    <View style={{ maxHeight: 500 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {bag.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ScrollView>
    </View>
  );
};

type OrderDetailsRouteProp = RouteProp<{
  OrderDetails: { products: Product[]; };
}, 'OrderDetails'>;

export function OrderDetails () {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<OrderDetailsRouteProp>();
  const { products } = route.params;
  const userId = useSelector((state: any) => state.userId);
  const [company, setCompany] = useState<Company | null>(null);

  const fetchClientAndCompany = async (): Promise<any> => {
    try {
      const responseClient = await api.get(`/getUsuarios/${userId}`);
      const userData = responseClient.data[0];

      const userMapped: User = {
        id: userData.idUser,
        name: userData.nomeUser,
        email: userData.username,
        password: userData.password,
        company: userData.fkIdCompany
      };

      const responseCompany = await api.get(`/getCompanies/${userMapped.company}`);
      const companyData = responseCompany.data[0];

      const companyMapped: Company = {
        id: companyData.idCompany,
        name: companyData.nameCompany,
        cnpj: companyData.CNPJ,
        cep: companyData.cepCompany,
        address: companyData.streetCompany,
        number: companyData.numberCompany,
        district: companyData.districtCompany,
        city: companyData.cityCompany,
        state: companyData.stateCompany
      };

      setCompany(companyMapped);
    } catch (error) {
      console.error('Erro ao buscar usuário e empresa:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchClientAndCompany();
  }, []);

  const calculateTotalPrice = (products: Product[]): string => {
    let totalSum = 0;

    products.forEach((product) => {
      const productTotal = product.quantity * product.price;

      totalSum += productTotal;
    });

    return totalSum.toFixed(2).replace('.', ',');
  };

  const handleLoginScreenPress = () => {
    navigation.navigate('Orders');
  };

  return (
    <>
      <View style={[styles.sections, globalStyles.pt50, globalStyles.pl30]}>
        <TouchableOpacity onPress={handleLoginScreenPress}>
          <ArrowSquareLeft size={35} color="black" style={[globalStyles.mb20]} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Lista de Produtos */}
        <View style={[styles.sections, globalStyles.px30, {marginTop: 0}]}>
          <Text style={[styles.sectionsTitle, globalStyles.mb15]}>Produtos</Text>
          <View>
            <BagList bag={products} />
          </View>
        </View>

        {/* Método de Pagamento */}
        <View style={[styles.sections, globalStyles.px30, globalStyles.pb15]}>
          <Text style={[styles.sectionsTitle, globalStyles.mb15]}>Método de pagamento</Text>
          <View style={[globalStyles.flexRow, globalStyles.flexSpaceBetween, globalStyles.alignItemsCenter]}>
            <View style={[globalStyles.flexRow, globalStyles.gap17]}>
              <PixLogo height={50} width={50} />
              <View>
                <Text style={[styles.containerOrderText, globalStyles.mt20]}>Pix</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Informações de Entrega */}
        <View style={[styles.sections]}>
          <View style={[globalStyles.px30, globalStyles.pr40]}>
            <Text style={[styles.sectionsTitle, globalStyles.mb15]}>Endereço de entrega</Text>
            <View style={[globalStyles.w100, globalStyles.flexColumn, globalStyles.px20, globalStyles.pb15, globalStyles.mt5]}>
              <View style={[globalStyles.flexRow]}>
                <View style={[globalStyles.w40]}>
                  <Text style={[styles.titleMyCompany]}>Endereço</Text>
                  <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.address}</Text>
                </View>
                <View style={[globalStyles.w60, globalStyles.ml40]}>
                  <Text style={[styles.titleMyCompany]}>CEP</Text>
                  <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.cep}</Text>
                </View>
              </View>
              <View style={[globalStyles.flexRow, globalStyles.mt15]}>
                <View style={[globalStyles.w40]}>
                  <Text style={[styles.titleMyCompany]}>Número</Text>
                  <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.number}</Text>
                </View>
                <View style={[globalStyles.w60, globalStyles.ml40]}>
                  <Text style={[styles.titleMyCompany]}>Bairro</Text>
                  <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.district}</Text>
                </View>
              </View>
              <View style={[globalStyles.flexRow, globalStyles.mt15]}>
                <View style={[globalStyles.w40]}>
                  <Text style={[styles.titleMyCompany]}>Cidade</Text>
                  <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.city}</Text>
                </View>
                <View style={[globalStyles.w60, globalStyles.ml40]}>
                  <Text style={[styles.titleMyCompany]}>Estado</Text>
                  <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.state}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Total */}
        <View style={[styles.sections, globalStyles.px35, globalStyles.pb25, globalStyles.pt20]}>
          <View style={[globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
            <Text style={[styles.sectionsTitle]}>Total do pedido</Text>
            <Text style={[styles.sectionsSubTitle]}>R$ {calculateTotalPrice(products)}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default OrderDetails;