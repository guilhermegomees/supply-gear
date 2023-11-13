import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";
import { Minus, MinusCircle, Plus, PlusCircle } from 'phosphor-react-native';

interface QuantitySelectorProps {
    limit: number;
    initialQuantity: number;
    onQuantityChange: (newQuantity: number) => void;
    quantitySelectorBag?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ limit, initialQuantity, onQuantityChange, quantitySelectorBag }) => {
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
        <>
            {quantitySelectorBag
                ? 
                <View style={[styles.container, { width: 110, backgroundColor: '#FBFBFB', borderWidth: 1, borderColor: '#B1B1B1', borderRadius: 7 }]}>
                    <TouchableOpacity onPress={handleDecrement} disabled={conditionMinusBtn} style={[globalStyles.w40]}>
                        <View style={[globalStyles.w100, globalStyles.flexCenter, {paddingVertical: 7}]}>
                            <Minus size={12} weight='bold' color='#008EDE' style={conditionMinusBtn ? globalStyles.opacity30 : null} />
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.quantity, globalStyles.w20, globalStyles.fontSizeSmall, globalStyles.fontWeight600]}>{quantity}</Text>
                    <TouchableOpacity onPress={handleIncrement} disabled={conditionPlusBtn} style={[globalStyles.w40]}>
                        <View style={[globalStyles.w100, globalStyles.flexCenter, { paddingVertical: 7 }]}>
                            <Plus size={12} weight='bold' color='#008EDE' style={conditionPlusBtn ? globalStyles.opacity30 : null} />
                        </View>
                    </TouchableOpacity>
                </View>
                : 
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleDecrement} disabled={conditionMinusBtn}>
                        <MinusCircle size={50} weight='light' style={conditionMinusBtn ? globalStyles.opacity30 : null} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity onPress={handleIncrement} disabled={conditionPlusBtn}>
                        <PlusCircle size={50} weight='light' style={conditionPlusBtn ? globalStyles.opacity30 : null} />
                    </TouchableOpacity>
                </View>
            }
        </>
    );
};

export default QuantitySelector;