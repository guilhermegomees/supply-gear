import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { styles } from "./styles";
import { globalStyles } from "../../css/globalStyles";

interface SearchBarProps {
    onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (text: string) => {
        setSearchText(text);
        onSearch(text);
    };

    return (
        <View style={styles.containerInput}>
            <TextInput
                placeholderTextColor={"#7A7A7A"}
                placeholder="Pesquisar"
                style={styles.input}
                value={searchText}
                onChangeText={handleSearch}
            />
            <MagnifyingGlass color='#000' size={22} weight="bold" />
        </View>
    );
};

export default SearchBar;