import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import { ArrowSquareLeft, XCircle } from "phosphor-react-native";
import { useSelector } from "react-redux";
import { api } from "../../services/api";
import { fetchImage } from '../../util';
import { useFocusEffect } from '@react-navigation/native';

interface Product {
  id: number;
  nameProduct: string;
  descript: string;
  techniqueSheet: string;
  price: string;
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

interface Cart {
  idCart: number;
  creationDate: string;
  total: string;
  status: string;
  fkIdUser: number;
}

interface OrderItemProps {
  order: Cart;
}

interface OrderListProps {
  orders: Cart[];
}

const Product: React.FC<{ product: Product }> = ({ product }) => {
  const [imagem, setImagem] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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
    <View key={product.id} style={[globalStyles.dFlex, globalStyles.flexRow, globalStyles.gap32, globalStyles.pl10, globalStyles.mt20]}>
      {loading ? (
        <View style={[styles.imgProduct, globalStyles.flexCenter]}>
          <Image
            source={require('../../../assets/loading.gif')}
            style={{
              width: 65,
              height: 65
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
        <Text style={[styles.containerOrderText, globalStyles.mt20, {width: 250}]}>{product.nameProduct}</Text>
        <Text style={[styles.containerOrderText, globalStyles.mt5]}>Quantidade: {product.quantity}</Text>
      </View>
    </View>
  );
};

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async (cartId: number): Promise<void> => {
    try {
      const response = await api.get(`/getDetailsCart/${cartId}`);

      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error(`Resposta da API inválida para detalhes do carrinho:`, response);
        return;
      }

      const cartDetails = response.data;

      const productsMapped: Product[] = await Promise.all(cartDetails.map(async (detail: CartDetail) => {
        const productResponse = await api.get(`/getProducts/${detail.fkIdProduct}`);
        const productData = productResponse.data[0];

        return {
          id: productData.id,
          nameProduct: productData.nameProduct,
          descript: productData.descript,
          techniqueSheet: productData.techniqueSheet,
          price: productData.price,
          quantity: detail.quantity,
          image: productData.image,
        };
      }));

      setProducts(productsMapped);
    } catch (error) {
      console.error(`Erro ao buscar detalhes do carrinho:`, error);
      throw error;
    }
  };

  useEffect(() => {
    if (order.idCart) {
      fetchProducts(order.idCart);
    }
  }, [order.idCart]);

  const handleOrderPress = () => {
    navigation.navigate("OrderDetails", { products });
  };

  return (
    <TouchableOpacity onPress={handleOrderPress}>
      <View style={[styles.containerOrder, globalStyles.py20, globalStyles.px20, globalStyles.mt10]}>
        <Text style={styles.containerOrderTitle}>Pedido {order.idCart}</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Product product={item} />}
        />
      </View>
    </TouchableOpacity>
  );
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.idCart.toString()}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
};


export function Orders() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const userId = useSelector((state: any) => state.userId);

  const [orders, setOrders] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [noOrdersFound, setNoOrdersFound] = useState<boolean>(false);

  const handleHomeScreenPress = () => {
    navigation.navigate("Home");
  };

  const fetchOrders = async (): Promise<void> => {
    try {
      const response = await api.get(`/getCartsByIdUser/${userId}/statusCompleted`);

      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error(`Resposta da API inválida:`, response);
        return;
      }

      const carts = response.data;

      setOrders(carts);
    } catch (error : any) {
      if (error.response && error.response.status === 404) {
        setNoOrdersFound(true);
      } else {
        console.error(`Falha ao buscar pedidos, erro: `, error);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );

  const noOrdersMessage = noOrdersFound && !loading && (
    <View style={[styles.noResultsContainer, { marginBottom: 100}]}>
      <XCircle color={'black'} size={80} weight="bold" />
      <Text style={[styles.noResultsText, globalStyles.px50]}>Parece que está vazio aqui!</Text>
      <Text style={[styles.noResultsText, globalStyles.px50]}>Descubra nossos produtos e faça seu primeiro pedido agora mesmo.</Text>
    </View>
  );

  return (
    <View style={[styles.container, globalStyles.h100]}>
      <View style={[globalStyles.w100, globalStyles.flexColumn, globalStyles.justifyContentCenter, globalStyles.h100]}>
        <TouchableOpacity style={[globalStyles.ml30, globalStyles.mt60]} onPress={handleHomeScreenPress}>
          <ArrowSquareLeft size={35} color="black" />
        </TouchableOpacity>
        {orders.length > 0 
          ? <Text style={[styles.textOrders, globalStyles.ml35, globalStyles.mt30, globalStyles.mb20]}>Pedidos</Text>
          : null
        }
        {noOrdersMessage}
        {orders.length > 0 && <OrderList orders={orders} />}
      </View>
    </View>
  )
}

export default Orders;