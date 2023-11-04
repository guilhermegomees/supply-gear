import React, { useState } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";

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
    const windowWidth = Dimensions.get('window').width;

    const calculateNumColumns = () => {
        return windowWidth < 600 ? 2 : 3;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                numColumns={calculateNumColumns()}
                renderItem={({ item, index }) => {
                    //const isEven = index % 2 === 0;

                    // const cardStyle = {
                    //     paddingHorizontal: 10
                    //     paddingLeft: !isEven ? 10 : 0,
                    //     paddingRight: isEven ? 10 : 0
                    // };

                    return (
                        <View style={globalStyles.px10}>
                            <ProductCard product={item} />
                        </View>
                    );
                }}
                //keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{ gap: 20 }, globalStyles.alignItemsCenter, globalStyles.py25]}
            />
        </View>
    );
};

export default ProductList;