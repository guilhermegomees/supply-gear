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
  const [selectedQuantity, setSelectedQuantity] = useState<number>();

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

  const handleHomeScreenPress = () => {
    navigation.navigate('Home');
  };

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
  };

  useEffect(() => {
    fetchProduct();
    fetchProducts();
  }, []);

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleCartCreation = async () => {
    try {
      // Verificar se já existe um carrinho "Processing" para o usuário
      const existingCartResponse = await api.get(`/getCarts?status=Processing&fkIdUser=14`);
  
      if (existingCartResponse.data.length > 0) {
        // Se existir um carrinho "Processing", adicione o produto a esse carrinho
        const existingCartId = existingCartResponse.data[0].idCart;
  
        const responseAddToExistingCart = await api.post('/addDetails', {
          fkIdCart: existingCartId,
          fkIdProduct: productId, // Substitua isso pelo ID do produto que você deseja adicionar
          quantity: 3, // Substitua isso pela quantidade do produto
          unityPrice: 10, // Substitua isso pelo preço unitário do produto
          subTotal: 3 * 10
        });
  
        if (responseAddToExistingCart.status === 200) {
          setSuccess("Produto adicionado ao carrinho existente com sucesso!");
        } else {
          setError("Falha ao adicionar o produto ao carrinho existente. Por favor, tente novamente mais tarde.");
        }
      } else {
        // Se não existir um carrinho "Processing", crie um novo carrinho
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
  
        const responseCreateNewCart = await api.post('/addCarts', {
          creationDate: formattedDate,
          total: 11.00,
          status: 'Processing',
          fkIdUser: 14,
        });
  
        if (responseCreateNewCart.status === 200) {
          setSuccess("Carrinho criado com sucesso!");
  
          // Adicione o produto ao detailCart do novo carrinho
          const newCartId = responseCreateNewCart.data.insertId;
  
          const responseAddToNewCart = await api.post('/addDetails', {
            fkIdCart: newCartId,
            fkIdProduct: productId,
            quantity: 2,
            unityPrice: 10,
            subTotal: 2 * 10
          });
  
          if (responseAddToNewCart.status === 200) {
            setSuccess("Produto adicionado ao novo carrinho com sucesso!");
          } else {
            setError("Falha ao adicionar o produto ao novo carrinho. Por favor, tente novamente mais tarde.");
          }
        } else {
          setError("Falha ao criar o carrinho. Por favor, tente novamente mais tarde.");
        }
      }
    } catch (error) {
      setError("Falha ao realizar a operação. Por favor, tente novamente mais tarde.");
    }
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