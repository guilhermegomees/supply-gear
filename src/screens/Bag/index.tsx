import { FlatList, Text, TouchableOpacity, View } from "react-native";
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

interface Product {
  id: number;
  nameProduct: string;
  descript: string;
  techniqueSheet: string;
  price: number;
  quantity: number;
  image: string;
}

interface Bag {
  idCart: number;
  creationDate: string;
  total: string;
  status: string;
  fkIdUser: number;
}

interface BagItemProps {
  product: Product;
}

interface BagListProps {
  bag: Product[];
}

const ProductItem: React.FC<BagItemProps> = ({ product }) => {
  const [selectedQuantity, setSelectedQuantity] = useState<number>();

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
  };

  const formatPrice = (price : number): string => {
    const hasCents = price % 1 !== 0;
    return hasCents ? price.toFixed(2).replace('.', ',') : `${price},00`;
  };

  const deleteItemBag = () => {
    // TODO: Implementar lógica para excluir item da sacola e atualizar os itens na tela
  };

  return (
    <>
      <View style={[styles.containerOrder, globalStyles.py20, globalStyles.px35]}>
        <View key={product.id} style={[globalStyles.dFlex, globalStyles.pl10, globalStyles.mt20]}>
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
                initialQuantity={1} // TODO: Aplicar quantidade selecionada pelo usuário na tela do produto
                onQuantityChange={handleQuantityChange}
                quantitySelectorBag={true} />
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

const BagList: React.FC<BagListProps> = ({ bag }) => {
  return (
    <FlatList
      data={bag}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductItem product={item} />}
    />
  );
};


export function Bag() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const userId = useSelector((state: any) => state.userId);

  //const [loading, setLoading] = useState<boolean>(true);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);

  // TODO: Quando não houver produtos no carrinho ou nenhum carrinho criado,
  //       aplicar setNoOrdersFound(true) (Semelhante a tela de Orders),
  //       para que seja renderizada a mensagem para o usuário

  const handleHomeScreenPress = () => {
    navigation.navigate("Home");
  };

  // TODO: Substituir products por uma função que chama um método da api e retorna os produtos do carrinho, semelhante a tela 'Orders'
  const products: Product[] = [
    {
      id: 1,
      nameProduct: "Product 1",
      descript: "Description of Product 1",
      techniqueSheet: "Technical details of Product 1",
      price: 19.99,
      quantity: 10,
      image: "product1.jpg",
    },
    {
      id: 2,
      nameProduct: "Product 2",
      descript: "Description of Product 2",
      techniqueSheet: "Technical details of Product 2",
      price: 29.99,
      quantity: 15,
      image: "product2.jpg",
    },
  ];

  const calculateTotalPrice = (products: Product[]): string => {
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    const hasCents = totalPrice % 1 !== 0;
    const formattedTotal = hasCents ? totalPrice.toFixed(2) : `${totalPrice},00`;

    return formattedTotal;
  };

  const handlePurchasePress = () => {
    // TODO: Navegar para a tela 'Payment' (ainda não criada) mandando junto o id do carrinho (semelhante a função 'handleOrderPress' na tela 'Orders')
    return;
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
          <TouchableOpacity style={[globalStyles.ml30, globalStyles.mb5]} onPress={handleHomeScreenPress}>
            <ArrowSquareLeft size={35} color="black" />
          </TouchableOpacity>
          {products.length > 0
            ?
            <>
              <View>
                <BagList bag={products} />
              </View>
              <View style={[globalStyles.py20, globalStyles.px40, globalStyles.flexRow, globalStyles.flexSpaceBetween]}>
                <View>
                  <Text style={[styles.textZipCodeAndShipping]}>CEP</Text>
                  <Text style={[styles.textCepNumber, globalStyles.mt5]}>XXXXX-XXX</Text>
                  {/* TODO: Colocar CEP da empresa (pode ser obtido chamando o método getCompanies/userId da api, id do user já está na página, linha 98) */}
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
                <Text style={[styles.textPrice]}>R$ {calculateTotalPrice(products)} no Pix</Text>
              </View>
            </>
            :
            <View>
              {noproductsMessage}
            </View>
          }
        </View>
      </View>
      {products.length > 0
        ?
        <View style={[globalStyles.px35]}>
          <TouchableOpacity style={[styles.buttonPurchase, globalStyles.mt25]} onPress={handlePurchasePress}>
            <Text style={signInUpStyles.buttonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
        :
        <View style={[globalStyles.px35]}>
          <TouchableOpacity style={[styles.buttonPurchase, globalStyles.mt25, { backgroundColor: '#005B8E' }]} onPress={handleChechProductsPress}>
            <Text style={signInUpStyles.buttonText}>Conferir produtos</Text>
          </TouchableOpacity>
        </View>
      }
    </>
  )
}

export default Bag;