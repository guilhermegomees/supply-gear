import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
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
import { useSelector } from "react-redux";
import { fetchImage } from '../../util';

interface Product {
  name: string
  descript: string
  techniqueSheet: string
  price: number
  quant: number
  image: string
}

export function Product({ route }: any) {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const userId = useSelector((state: any) => state.userId);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [imagem, setImagem] = useState<string>('');
  //const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduct = async (): Promise<any> => {
    try {
      const response = await api.get(`/getProducts/${productId}`);
      const productData = response.data[0];

      const productMapped: Product = {
        name: productData.nameProduct,
        descript: productData.descript,
        techniqueSheet: productData.techniqueSheet,
        price: Number(productData.price),
        quant: productData.quantity,
        image: productData.image
      };

      setProduct(productMapped);
    } catch (error) {
      console.error(`Erro ao buscar produto com id: ${productId}`, error);
      throw error;
    }
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

  const handleHomeScreenPress = () => {
    navigation.navigate('Home');
  };

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleCartCreation = async () => {
    try {
      // Verificar se já existe um carrinho "Processing" para o usuário
      const existingCartResponse = await api.get(`/getCartsByIdUser/${userId}/statusProcessing`);

      if (existingCartResponse.data.length > 0) {
        // Se existir um carrinho "Processing", adicione o produto a esse carrinho
        const existingCartId = existingCartResponse.data[0].idCart;

        const responseAddToExistingCart = await api.post('/addDetails', {
          fkIdCart: existingCartId,
          fkIdProduct: productId,
          quantity: selectedQuantity,
          unityPrice: product!.price,
          subTotal: selectedQuantity * product!.price,
        });

        if (responseAddToExistingCart.status === 200) {
          console.log("Produto adicionado ao carrinho existente com sucesso!");
          //navigation.navigate('Bag');
        } else {
          console.error("Falha ao adicionar o produto ao carrinho existente. Por favor, tente novamente mais tarde.");
        }
      }
    } catch (error) {
      createNewCart();
    }
  };

  const createNewCart = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const responseCreateNewCart = await api.post('/addCarts', {
      creationDate: formattedDate,
      total: 0,
      status: 'Processing',
      fkIdUser: userId,
    });

    if (responseCreateNewCart.status === 200) {
      const newCartId = responseCreateNewCart.data.idCart;

      // Aguardar a criação do carrinho antes de chamar addDetails
      await addToNewCart(newCartId);
    } else {
      console.error("Falha ao criar o carrinho.");
    }
  };

  const addToNewCart = async (newCartId : number) => {
    try {
      const responseAddToNewCart = await api.post('/addDetails', {
        fkIdCart: newCartId,
        fkIdProduct: productId,
        quantity: selectedQuantity,
        unityPrice: product!.price,
        subTotal: selectedQuantity * product!.price,
      });

      console.log("addDetails criado");

      if (responseAddToNewCart.status === 200) {
        console.log("Produto adicionado ao novo carrinho com sucesso!");
      } else {
        console.error("Falha ao adicionar o produto ao novo carrinho.");
      }
    } catch (error) {
      console.error("Erro ao adicionar o produto ao novo carrinho:", error);
    }
  };

  const formatPrice = (price: number): string => {
    const hasCents = price % 1 !== 0;
    return hasCents ? price.toFixed(2).replace('.', ',') : `${price},00`;
  };

  StatusBar.setBarStyle('dark-content');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111111' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={[styles.topContainer]}>
            <View style={[globalStyles.w100, globalStyles.mt30, globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
              <TouchableOpacity style={globalStyles.ml30} onPress={handleHomeScreenPress}>
                <ArrowSquareLeft size={35} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerImage}>
            {loading ? (
              <View style={{
                height: 460,
                width: '87%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFF',
                borderRadius: 15,
              }}>
                <Image 
                  source={require('../../../assets/loading.gif')} 
                  style={{
                    width: 150,
                    height: 150
                  }}
                />
              </View>
            ) : (
              <Image
                source={{ uri: imagem }}
                style={{
                  width: '87%',
                  height: 460,
                  borderRadius: 15,
                  display: !loading ? 'flex' : 'none',
                }}
                resizeMode="contain"
              />
            )}
          </View>
          <View style={[styles.bottomContainer, globalStyles.px40]}>
            {product ? (
              <>
                <View style={[{ marginTop: 440 }, globalStyles.flexCenter]}>
                  <Text style={[styles.nameProduct]}>{product.name}</Text>
                  <View style={[globalStyles.flexRow, globalStyles.alignItemsCenter]} >
                    <Text style={[styles.dolarSign]}>R$ </Text><Text style={styles.price}>{formatPrice(product.price)}</Text>
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
                  <TouchableOpacity style={[styles.buttonBag, globalStyles.flexCenter]} onPress={handleCartCreation}>
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