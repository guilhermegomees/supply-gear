import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../services/api";
import { ArrowSquareLeft, Globe } from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import QuantitySelector from '../../components/QuantitySelector';
import Logo from '../../../assets/images/logo.svg';
import { signInUpStyles } from "../../css/signInUpStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductList from "../../components/ProductList";

interface Product {
  name: string
  descript: string
  techniqueSheet: string
  price: string
  quant: number
}

export function Product({ route }: any) {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const fetchProduct = async (): Promise<any> => {
    try {
      const response = await api.get(`/getProducts/${productId}`);
      const productData = response.data[0];

      const productMapped: Product = {
        name: productData.nameProduct,
        descript: productData.descript,
        techniqueSheet: productData.techniqueSheet,
        price: productData.price,
        quant: productData.quantity,
      };

      setProduct(productMapped);
    } catch (error) {
      console.error(`Erro ao buscar produto com id: ${productId}`, error);
      throw error;
    }
  };

  const fetchProducts = async (): Promise<any> => {
    try {
      const response = await api.get(`/getProductsByQuantity/2`);

      const productsData: [] = response.data.map((item: any) => ({
        id: item.id,
        name: item.nameProduct,
        price: item.price,
        image: 'empty-product.svg'
      }));

      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  };

  const handleLoginScreenPress = () => {
    navigation.navigate('Home');
  };

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
  };

  useEffect(() => {
    fetchProduct();
    fetchProducts();
  }, []);

  StatusBar.setBarStyle('dark-content');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={[styles.topContainer]}>
            <View style={[globalStyles.w100, globalStyles.mt20, globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
              <TouchableOpacity style={globalStyles.ml30} onPress={handleLoginScreenPress}>
                <ArrowSquareLeft size={35} color="white" />
              </TouchableOpacity>
              <Logo height={35} />
            </View>
          </View>
          <View style={styles.containerImage}>
            <View style={{ width: '87%', height: 460, backgroundColor: '#C4C4C4', borderRadius: 20 }}></View>
          </View>
          <View style={[styles.bottomContainer, globalStyles.px40]}>
            {product ? (
              <>
                <View style={[{ marginTop: 440 }, globalStyles.flexCenter]}>
                  <Text style={[styles.nameProduct]}>{product.name}</Text>
                  <View style={[globalStyles.flexRow, globalStyles.alignItemsCenter]} >
                    <Text style={[styles.dolarSign]}>R$ </Text><Text style={styles.price}>{product.price}</Text>
                  </View>
                </View>
                <View style={[globalStyles.flexRow, globalStyles.flexSpaceBetween, globalStyles.mt50]}>
                  {/* Seletor de quantidade */}
                  <QuantitySelector
                    limit={product.quant}
                    initialQuantity={1}
                    onQuantityChange={handleQuantityChange}
                  />
                  {/* Button - Adicionar a sacola */}
                  <TouchableOpacity style={[styles.buttonBag, globalStyles.flexCenter]}>
                    <Text style={styles.buttonBagText}>Adicionar a sacola</Text>
                  </TouchableOpacity>
                </View>
                <View style={globalStyles.mt20}>
                  <Text style={styles.subTitle}>Descrição</Text>
                  <Text style={[styles.description, globalStyles.mt5, globalStyles.mb10]}>{product.descript}</Text>
                  <Text style={styles.subTitle}>Ficha técnica</Text>
                  <Text style={[styles.description, globalStyles.mt5, globalStyles.mb30]}>{product.techniqueSheet}</Text>
                </View>
              </>
            ) : (
              <Text>Carregando...</Text>
            )}
            {/* <Text style={styles.subTitle}>Também adquirido junto</Text>
            <ProductList products={products} /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Product;