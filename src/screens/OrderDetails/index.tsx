import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { api } from '../../services/api';
import globalStyles from '../../css/globalStyles';
import { styles } from './styles';

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

interface OrderDetailsProps {
  route: any;
}

export function OrderDetails({ route }: OrderDetailsProps) {
  const { orderId } = route.params;

  const [cartDetails, setCartDetails] = useState<CartDetail[]>([]);
  const [totalCart, setTotalCart] = useState<string>('');
  const [productDetails, setProductDetails] = useState<Record<number, Product>>({});

  const fetchCartDetails = async (): Promise<void> => {
    try {
      const response = await api.get(`/getDetailsCart/${orderId}`);

      // Verificar se a resposta da API é válida
      if (!response || !response.data || !Array.isArray(response.data)) {
        console.error(`Resposta da API inválida para detalhes do carrinho:`, response);
        return;
      }

      const cartDetailsData: CartDetail[] = response.data;
      setCartDetails(cartDetailsData);

      // Calcular o total do carrinho somando os subtotais de cada produto
      const total = cartDetailsData.reduce((acc, cartDetail) => acc + parseFloat(cartDetail.subTotal), 0);
      setTotalCart(total.toFixed(2));

      // Buscar detalhes dos produtos uma vez
      const productIds = Array.from(new Set(cartDetailsData.map((item) => item.fkIdProduct)));
      const productsData: Record<number, Product> = {};

      for (const productId of productIds) {
        const productDetails = await fetchProductDetails(productId);
        if (productDetails) {
          productsData[productId] = productDetails;
        }
      }

      setProductDetails(productsData);
    } catch (error) {
      console.error(`Erro ao buscar detalhes do carrinho:`, error);
      throw error;
    }
  };

  const fetchProductDetails = async (productId: number): Promise<Product | null> => {
    try {
      const response = await api.get(`/getProducts/${productId}`);
      const productData: Product | null = response.data[0];
      return productData;
    } catch (error) {
      console.error(`Erro ao buscar detalhes do produto:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCartDetails();
    };

    fetchData();
  }, [orderId]);

  return (
    <View style={[styles.container]}>
      <View style={[globalStyles.flexCenter]}>
        <Text style={styles.title}>Detalhes do Pedido {orderId}</Text>
        <FlatList
          data={cartDetails}
          keyExtractor={(item) => item.idDetail.toString()}
          renderItem={({ item }) => (
            <View style={[styles.itemContainer]}>
              <Text style={[styles.text]}>Produto: {productDetails[item.fkIdProduct]?.nameProduct}</Text>
              <Text style={[styles.text]}>Quantidade: {item.quantity}</Text>
              <Text style={[styles.text]}>Preço Unitário: R$ {item.unityPrice}</Text>
              <Text style={[styles.text]}>Subtotal: R$ {item.subTotal}</Text>
            </View>
          )}
        />
        <Text style={styles.total}>Total do Carrinho: R$ {totalCart}</Text>
      </View>
    </View>
  );
}

export default OrderDetails;