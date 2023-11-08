import React, { useState } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ProductCard from './../ProductCard';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const windowWidth = Dimensions.get('window').width;

    const calculateNumColumns = () => {
        return windowWidth < 600 ? 2 : 3;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                numColumns={calculateNumColumns()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={globalStyles.px10}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Product', { productId: item.id });
                            }}>
                                <ProductCard product={item} />
                            </TouchableOpacity>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{ gap: 20 }, globalStyles.alignItemsCenter, globalStyles.py25]}
            />
        </View>
    );
};

export default ProductList;