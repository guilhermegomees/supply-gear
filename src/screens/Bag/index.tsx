import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import { ArrowSquareLeft, ShoppingBagOpen, Trash, XCircle } from "phosphor-react-native";
import { useSelector } from "react-redux";
import { api } from "../../services/api";
import QuantitySelector from "../../components/QuantitySelector";
import { signInUpStyles } from "../../css/signInUpStyles";

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

interface BagItemProps {
  product: Product;
  onQuantityChange: (productId: number, newQuantity: number, quantityFromDetailCart: number) => void;
  detailCart: CartDetail[];
  onItemDelete: () => void;
}

interface BagListProps {
  bag: Product[];
  onQuantityChange: (productId: number, newQuantity: number) => void;
  detailCart: CartDetail[];
  onItemDelete: () => void;
}

const ProductItem: React.FC<BagItemProps> = ({ product, onQuantityChange, detailCart, onItemDelete }) => {
  const quantityFromDetailCart = detailCart.find((detail) => detail.fkIdProduct === product.id)?.quantity || 1;
  const idDetailCart = detailCart.find((detail) => detail.fkIdProduct === product.id)?.idDetail;

  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(product.id, newQuantity, quantityFromDetailCart);
  };

  const formatPrice = (price : number): string => {
    return price.toString().replace('.', ',');
  };

  const deleteItemBag = async () => {
    try {
      await api.delete(`/deleteDetailCart/${idDetailCart}`);
      
      onItemDelete();
    } catch (error) {
      console.error("Erro ao excluir item do carrinho:", error);
    }
  };

  return (
    <>
      <View style={[styles.containerOrder, globalStyles.pb20, globalStyles.px35]}>
        <View style={[globalStyles.dFlex, globalStyles.pl10, globalStyles.mt20]}>
          <View style={[globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
            <View style={[globalStyles.flexRow, globalStyles.gap17]}>
              <View style={styles.imgProduct}></View>
              <Text style={[styles.containerOrderText, globalStyles.mt20]}>{product.nameProduct}</Text>
            </View>
            <TouchableOpacity onPress={deleteItemBag}>
              <Trash size={22} weight="bold" color="#008EDE" style={[globalStyles.mr5]} />
            </TouchableOpacity>
          </View>
          <View style={[globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
            <View>
              <Text style={[styles.textQuantity, globalStyles.mt15, globalStyles.ml5, globalStyles.mb10]}>Quantidade:</Text>
              <QuantitySelector
                limit={product.quantity}
                initialQuantity={quantityFromDetailCart}
                onQuantityChange={handleQuantityChange}
                quantitySelectorBag={true} 
              />
            </View>
            <View style={[globalStyles.mt15]}>
              <Text style={[styles.textPrice, globalStyles.mt15, globalStyles.ml5, globalStyles.mb10]}>R$ {formatPrice(product.price)}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[globalStyles.mt10, globalStyles.flexCenter]}>
        <View style={styles.divider}></View>
      </View>
    </>
  );
};

const BagList: React.FC<BagListProps> = ({ bag, onQuantityChange, detailCart, onItemDelete }) => {
  return (
    <View style={{ maxHeight: 550 }}>
      <FlatList
        data={bag}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem product={item} onQuantityChange={onQuantityChange} detailCart={detailCart} onItemDelete={onItemDelete} />}
      />
    </View>
  );
};

export function Bag() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const userId = useSelector((state: any) => state.userId);

  const [company, setCompany] = useState<Company | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<{ [productId: number]: number }>({});
  const [detailCart, setDetailCart] = useState<CartDetail[]>([]);
  const [cartId, setCartId] = useState<number>();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const handleHomeScreenPress = () => {
    navigation.navigate("Home");
  };

  const fetchProducts = async (): Promise<void> => {
    try {
      const orderResponse = await api.get(`/getCartsByIdUser/${userId}/statusProcessing`);

      if (!orderResponse || !orderResponse.data || !Array.isArray(orderResponse.data)) {
        console.error(`Resposta da API inválida ao buscar carrinhos:`, orderResponse);
        return;
      }

      const order = orderResponse.data;

      // Pega o cartId do primeiro carrinho retornado (você pode ajustar isso conforme necessário)
      const cartId = order[0].idCart;
      setCartId(cartId)

      // Obtém os detalhes do carrinho usando o cartId
      const cartDetailsResponse = await api.get(`/getDetailsCart/${cartId}`);

      if (!cartDetailsResponse || !cartDetailsResponse.data || !Array.isArray(cartDetailsResponse.data)) {
        console.error(`Resposta da API inválida para detalhes do carrinho:`, cartDetailsResponse);
        return;
      }

      const cartDetails = cartDetailsResponse.data;
      setDetailCart(cartDetails);

      // Mapeia os produtos usando os detalhes do carrinho
      const productsMapped: Product[] = await Promise.all(cartDetails.map(async (detail: CartDetail) => {
        const productResponse = await api.get(`/getProducts/${detail.fkIdProduct}`);
        const productData = productResponse.data[0];

        return {
          id: productData.id,
          nameProduct: productData.nameProduct,
          descript: productData.descript,
          techniqueSheet: productData.techniqueSheet,
          price: productData.price,
          quantity: productData.quantity,
          image: productData.image,
        };
      }));

      // Define o estado com os produtos mapeados
      setProducts(productsMapped);
    } catch (error : any) {
      if (error.response && error.response.status === 404) {
        setNoProductsFound(true);
        return;
      } else {
        console.error(`Erro ao buscar detalhes do carrinho:`, error);
        throw error;
      }
    }
  };

  const fetchCompany = async (): Promise<any> => {
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

  const fetchUpdatedDetailCart = async () => {
    try {
      const updatedCartDetailsResponse = await api.get(`/getDetailsCart/${cartId}`);

      if (!updatedCartDetailsResponse || !updatedCartDetailsResponse.data || !Array.isArray(updatedCartDetailsResponse.data)) {
        console.error(`Resposta da API inválida para detalhes atualizados do carrinho:`, updatedCartDetailsResponse);
        return;
      }

      const updatedCartDetails = updatedCartDetailsResponse.data;

      return updatedCartDetails;
    } catch (error) {
      console.error('Erro ao buscar detalhes atualizados do carrinho:', error);
      throw error;
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCompany();
  }, []);

  const calculateTotalPrice = (products: Product[]): string => {
    let totalSum = 0;

    products.forEach((product) => {
      const selectedQuantity = quantities[product.id];
      const quantityFromDetailCart = detailCart.find((detail) => detail.fkIdProduct === product.id)?.quantity || 1;
      const finalQuantity = selectedQuantity ? selectedQuantity : quantityFromDetailCart;
      const productTotal = finalQuantity * product.price;
      
      totalSum += productTotal;
    });

    return totalSum.toFixed(2).replace('.', ',');
  };

  const handlePurchasePress = async () => {
    // Calcular as quantidades que foram alteradas
    const updatedQuantities: { [idDetail: number]: number } = {};
    Object.keys(quantities).forEach((productIdStr) => {
      const productId = parseInt(productIdStr, 10);
      const selectedQuantity = quantities[productId];

      // Verificar se a quantidade foi alterada
      if (selectedQuantity !== undefined) {
        // Encontrar o idDetail associado ao productId
        const idDetail = detailCart.find((detail) => detail.fkIdProduct === productId)?.idDetail;

        if (idDetail !== undefined) {
          updatedQuantities[idDetail] = selectedQuantity;
        }
      }
    });

    // Enviar requisição para atualizar o banco de dados
    try {
      // Iterar sobre os detalhes do carrinho e atualizar a quantidade no banco de dados
      await Promise.all(Object.keys(updatedQuantities).map(async (idDetailStr) => {
        const idDetail = parseInt(idDetailStr, 10);
        const quantity = updatedQuantities[idDetail];

        // Obter detalhes específicos do carrinho para obter o preço do produto
        const detail = detailCart.find((d) => d.idDetail === idDetail);
        const productResponse = await api.get(`/getProducts/${detail!.fkIdProduct}`);
        const productData = productResponse.data[0];
        const productPrice = productData.price;

        // Calcular o novo subtotal
        const newSubtotal = (quantity * productPrice).toFixed(2);
        await api.put(`/updateDetailCart/${idDetail}`, { quantity: quantity, subTotal: newSubtotal });
      }));

      const cartDetails = await fetchUpdatedDetailCart();

      await api.put(`/updateCarts/${cartId}`, { total : calculateTotalPrice(products) });

      // Navegar para a tela 'MainPayment'
      navigation.navigate('MainPayment', { products, cartDetails, cartId });
    } catch (error) {
      console.error('Erro ao atualizar as quantidades no banco de dados:', error);
      // Trate o erro conforme necessário
    }
  }
  
  const handleChechProductsPress = () => {
    navigation.navigate("Home");
  }

  const noproductsMessage = noProductsFound /*&& !loading*/ && (
    <View style={[styles.noResultsContainer, { marginBottom: 30 }]}>
      <ShoppingBagOpen color={'black'} size={80} weight="bold" />
      <Text style={[styles.noResultsText, globalStyles.px50]}>Parece que está vazio aqui!</Text>
      <Text style={[styles.noResultsText, globalStyles.px50]}>Que tal dar uma olhada em nossos produtos e adicionar algo ao seu carrinho?</Text>
    </View>
  );

  return (
    <>
      <View style={[styles.container]}>
        <View style={[globalStyles.w100, globalStyles.mt60, globalStyles.flexColumn]}>
          <TouchableOpacity style={[globalStyles.ml30, globalStyles.mb20]} onPress={handleHomeScreenPress}>
            <ArrowSquareLeft size={35} color="black" />
          </TouchableOpacity>
          {products.length > 0
            ?
            <>
              <View>
                <BagList bag={products} onQuantityChange={handleQuantityChange} detailCart={detailCart} onItemDelete={fetchProducts} />
              </View>
              <View style={[globalStyles.py20, globalStyles.px40, globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
                <View>
                  <Text style={[styles.textZipCodeAndShipping]}>CEP</Text>
                  <Text style={[styles.textCepNumber, globalStyles.mt5]}>{company?.cep}</Text>
                </View>
                <View style={[globalStyles.flexRow, globalStyles.mt10]}>
                  <Text style={[styles.textZipCodeAndShipping]}>Frete:</Text>
                  <Text style={[{ marginLeft: 3 }, styles.textFree]}>Gratis</Text>
                </View>
              </View>
              <View style={[globalStyles.flexCenter]}>
                <View style={[styles.divider]}></View>
              </View>
              <View style={[globalStyles.py20, globalStyles.px40, globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
                <Text style={[styles.textPrice]}>Total</Text>
                <Text style={[styles.textPrice]}>R$ {calculateTotalPrice(products)}</Text>
              </View>
            </>
            :
            <View>
              {noproductsMessage}
            </View>
          }
        </View>
      </View>
      {products.length > 0 ? (
        <View style={[globalStyles.px35]}>
          <TouchableOpacity style={[styles.buttonPurchase, globalStyles.mt25]} onPress={handlePurchasePress}>
            <Text style={signInUpStyles.buttonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[globalStyles.px35]}>
          <TouchableOpacity style={[styles.buttonPurchase, globalStyles.mt25, { backgroundColor: '#005B8E' }]} onPress={handleChechProductsPress}>
            <Text style={signInUpStyles.buttonText}>Conferir produtos</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}

export default Bag;