import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { MinusCircle, PlusCircle } from 'phosphor-react-native';

interface QuantitySelectorProps {
    limit: number;
    initialQuantity: number;
    onQuantityChange: (newQuantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ limit, initialQuantity, onQuantityChange }) => {
    const [quantity, setQuantity] = useState<number>(initialQuantity);
    const conditionMinusBtn = quantity === 1;
    const conditionPlusBtn = quantity === limit;

    const handleIncrement = () => {
        if (quantity < limit) {
            setQuantity(quantity + 1);
            onQuantityChange(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            onQuantityChange(quantity - 1);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleDecrement} disabled={conditionMinusBtn}>
                <MinusCircle size={50} weight='light' style={conditionMinusBtn ? globalStyles.opacity30 : null} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrement} disabled={conditionPlusBtn}>
                <PlusCircle size={50} weight='light' style={conditionPlusBtn ? globalStyles.opacity30 : null} />
            </TouchableOpacity>
        </View>
    );
};

export default QuantitySelector;