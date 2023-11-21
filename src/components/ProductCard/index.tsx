import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { fetchImage } from '../../util';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductCardProps {
    product: Product;
    style?: ViewStyle;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, style }) => {
    const [imagem, setImagem] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

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
        <View style={[styles.card]}>
            {loading ? (
                <View style={[styles.image, { backgroundColor: '#F5F5F5' }, globalStyles.flexCenter]}>
                    <Image
                        source={require('../../../assets/loading.gif')}
                        style={{
                            width: 70,
                            height: 70
                        }}
                    />
                </View>
            ) : (
                <Image
                    source={{ uri: imagem }}
                    style={[styles.image]}
                    resizeMode="contain"
                />
            )}
            <View style={[styles.textContainer]}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>R$ {formatPrice(product.price)}</Text>
            </View>
        </View>
    );
};

export default ProductCard;