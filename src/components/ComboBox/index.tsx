import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CaretDown, CaretUp, Buildings } from 'phosphor-react-native';
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";

export interface Option {
    label: string | null;
    value: string | null;
}

interface ComboBoxProps {
    options: Option[];
    onSelect: (option: Option) => void;
    clearSelection: boolean;
    showIcon?: boolean;
    setIcon?: React.ReactNode;
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, onSelect, clearSelection, showIcon=true, setIcon }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (option: Option) => {
        setSelectedOption(option);
        onSelect(option || { label: null, value: null });
        toggleDropdown();
    };

    useEffect(() => {
        if (clearSelection) {
            setSelectedOption(null);
        }
    }, [clearSelection]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
                {showIcon && (
                    <View>
                        {setIcon ? setIcon : <Buildings size={25} color="black" weight="fill" style={[globalStyles.ml5, globalStyles.opacity60]} />}
                    </View>
                )}
                <Text style={styles.selectedOption}>
                    {selectedOption && selectedOption.label !== null && selectedOption.value !== null ? selectedOption.label : ''}
                </Text>
                {isDropdownOpen ? (
                    <CaretUp size={20} color="black" weight="bold" />
                ) : (
                    <CaretDown size={20} color="black" weight="bold" />
                )}
            </TouchableOpacity>
            {isDropdownOpen && (
                <View style={styles.dropdownList}>
                    <ScrollView>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={option.value}
                                style={styles.dropdownItem}
                                onPress={() => handleOptionSelect(option)}
                            >
                                {index > 0 && ( // Verifica se não é o primeiro item
                                    <View style={styles.divider} />
                                )}
                                <Text style={{ width: 250 }}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default ComboBox;