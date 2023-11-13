import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import { ArrowSquareLeft, XCircle } from "phosphor-react-native";
import { useSelector } from "react-redux";
import { api } from "../../services/api";

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

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleOrderPress = () => {
    navigation.navigate("OrderDetails", { orderId: order.idCart });
  };

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

  return (
    <TouchableOpacity onPress={handleOrderPress}>
      <View style={[styles.containerOrder, globalStyles.py20, globalStyles.px20, globalStyles.mt10]}>
        <Text style={styles.containerOrderTitle}>Pedido {order.idCart}</Text>

        {products.map((product) => (
          <View key={product.id} style={[globalStyles.dFlex, globalStyles.flexRow, globalStyles.gap32, globalStyles.pl10, globalStyles.mt20]}>
            <View style={styles.imgProduct}></View>
            <View>
              <Text style={[styles.containerOrderText, globalStyles.mt20]}>{product.nameProduct}</Text>
              <Text style={[styles.containerOrderText, globalStyles.mt5]}>Quantidade: {product.quantity}</Text>
            </View>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const completedOrders = orders.filter(order => order.status === 'Completed');

  return (
    <FlatList
      data={completedOrders}
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
      const response = await api.get(`/getCartsByIdUser/${userId}`);

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
        console.error(`Erro ao buscar carrinhos com id do usuário: ${userId}`, error);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const noOrdersMessage = noOrdersFound && !loading && (
    <View style={[styles.noResultsContainer, { marginBottom: 100}]}>
      <XCircle color={'black'} size={80} weight="bold" />
      <Text style={[styles.noResultsText, globalStyles.px50]}>Parece que está vazio aqui!</Text>
      <Text style={[styles.noResultsText, globalStyles.px50]}>Descubra nossos produtos e faça seu primeiro pedido agora mesmo.</Text>
    </View>
  );

  return (
    <View style={[styles.container, globalStyles.h100]}>
      <View style={[globalStyles.w100, globalStyles.mt60, globalStyles.flexColumn, globalStyles.justifyContentCenter, globalStyles.h100]}>
        <TouchableOpacity style={globalStyles.ml30} onPress={handleHomeScreenPress}>
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