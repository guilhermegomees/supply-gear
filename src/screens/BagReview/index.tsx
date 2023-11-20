import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../../css/globalStyles';
import { styles } from './styles';
import { signInUpStyles } from '../../css/signInUpStyles';
import Logo from '../../../assets/images/logo.svg';
import PixLogo from "../../../assets/images/pix-logo.svg";
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { useSelector } from 'react-redux';
import { fetchImage } from '../../util';

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
  cartDetails: CartDetail[];
}

interface BagListProps {
  bag: Product[];
  cartDetails: CartDetail[];
}

const ProductItem: React.FC<BagItemProps> = ({ product, cartDetails }) => {
  const [imagem, setImagem] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const quantityFromDetailCart = cartDetails.find((detail) => detail.fkIdProduct === product.id)?.quantity || 1;

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
                <Text style={[styles.containerOrderText, globalStyles.mt20]}>{product.nameProduct}</Text>
                <Text style={[styles.containerOrderText, globalStyles.mt5]}>Quantidade: {quantityFromDetailCart}</Text>
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

const BagList: React.FC<BagListProps> = ({ bag, cartDetails }) => {
  return (
    <View style={{ maxHeight: 350 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {bag.map((product) => (
          <ProductItem key={product.id} product={product} cartDetails={cartDetails} />
        ))}
      </ScrollView>
    </View>
  );
};

const BagReview: React.FC<BagReviewProps> = ({ products, cartDetails, onNext }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const userId = useSelector((state: any) => state.userId);
  const [user, setUser] = useState<User | null>(null);
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

      setUser(userMapped);

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
      const quantityFromDetailCart = cartDetails.find((detail) => detail.fkIdProduct === product.id)?.quantity || 1;
      const productTotal = quantityFromDetailCart * product.price;

      totalSum += productTotal;
    });

    return totalSum.toFixed(2).replace('.', ',');
  };

  return (
    <ScrollView>
      {/* Lista de Produtos */}
      <View style={[styles.sections, globalStyles.px30]}>
        <Text style={[styles.sectionsTitle, globalStyles.mb15]}>Produtos</Text>
        <View>
          <BagList bag={products} cartDetails={cartDetails} />
        </View>
      </View>

      {/* Informações de Entrega */}
      <View style={[styles.sections]}>
        <View style={[globalStyles.px30]}>
          <Text style={[styles.sectionsTitle, globalStyles.mb15]}>Entrega será feita em</Text>
          <View style={[globalStyles.w100, globalStyles.flexColumn, globalStyles.px20, globalStyles.pb15, globalStyles.mt5]}>
            <View style={[globalStyles.flexRow]}>
              <View style={[globalStyles.w40]}>
                <Text style={[styles.titleMyCompany]}>Razão Social</Text>
                <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.name}</Text>
              </View>
              <View style={[globalStyles.w60, globalStyles.ml40]}>
                <Text style={[styles.titleMyCompany]}>CNPJ</Text>
                <Text style={[styles.subtitleMyCompany, globalStyles.mt5]}>{company?.cnpj}</Text>
              </View>
            </View>
            <View style={[globalStyles.flexRow, globalStyles.mt15]}>
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
        <View style={[globalStyles.my5, globalStyles.flexCenter]}>
          <View style={styles.divider}></View>
        </View>
        <View style={[globalStyles.mt10, globalStyles.px30]}>
          <Text style={[styles.sectionsTitle, globalStyles.mb15]}>Transporte</Text>
          <View style={[styles.transport, globalStyles.flexRow, globalStyles.flexSpaceBetween, globalStyles.alignItemsEnd]}>
            <View style={[globalStyles.flexRow, globalStyles.alignItemsCenter, globalStyles.gap10]}>
              <View style={[styles.logo]}>
                <Logo height={30} width={30} />
              </View>
              <View>
                <Text style={[styles.transportTitle]}>SupplyGear</Text>
                <Text style={[styles.transportSubTitle]}>Até 10 dias úteis</Text>
              </View>
            </View>
            <View style={[globalStyles.flexRow, globalStyles.gap2]}>
              <Text style={[styles.transportSubTitle]}>Frete:</Text>
              <Text style={[styles.transportSubTitle, { color: '#0EB500' }]}>Gratis</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Método de Pagamento */}
      <View style={[styles.sections, globalStyles.px30, globalStyles.pb15]}>
        <Text style={[styles.sectionsTitle, globalStyles.mb15]}>Pagamento</Text>
        <View style={[globalStyles.flexRow, globalStyles.flexSpaceBetween, globalStyles.alignItemsCenter]}>
          <View style={[globalStyles.flexRow, globalStyles.gap17]}>
            <PixLogo height={50} width={50} />
            <View>
              <Text style={[styles.containerOrderText, globalStyles.mt20]}>Pix</Text>
            </View>
          </View>
          <View style={[{ backgroundColor: 'rgba(73, 221, 88, 0.4)', borderRadius: 8, height: 20 }, globalStyles.px10, globalStyles.py5, globalStyles.mr5]}>
            <Text style={[{ fontSize: 10 }, globalStyles.fontWeight400]}>Aprovação em minutos</Text>
          </View>
        </View>
      </View>

      {/* Finalizar Compra */}
      <View style={[styles.sections, globalStyles.px35, globalStyles.pb30]}>
        <View style={[globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
          <Text style={[styles.sectionsTitle]}>Total</Text>
          <Text style={[styles.sectionsSubTitle]}>R$ {calculateTotalPrice(products)}</Text>
        </View>
        <TouchableOpacity style={[styles.buttonPurchase, globalStyles.mt20]} onPress={onNext}>
          <Text style={[styles.buttonText]}>Finalizar compra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonKeepBuying, globalStyles.mt10]} onPress={() => { navigation.navigate('Home'); }}>
          <Text style={[styles.buttonText, { color: '#000' }]}>Continuar comprando</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BagReview;