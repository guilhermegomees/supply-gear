import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductCardProps {
    product: Product;
    style?: ViewStyle; // Estenda as props para aceitar o estilo
}

const formatPrice = (price : string) => {
    if (price.includes(',') || price.includes('.')) {
        return `R$ ${price}`;
    } else {
        return `R$ ${price},00`;
    }
};

const ProductCard: React.FC<ProductCardProps> = ({ product, style }) => {
    const navigation = useNavigation();

    // const navigateToProductDetails = () => {
    //     navigation.navigate('Product');
    // };

    return (
        <View style={[styles.card, style]}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{formatPrice(String(product.price))}</Text>
            </View>
        </View>
    );
};

export default ProductCard;