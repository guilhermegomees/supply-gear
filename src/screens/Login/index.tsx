import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import React, { useEffect, useState } from "react";

export function Login() {
    const handleSignInPress = () => {
        alert('Entrar')
    };
    const handleForgotPasswordPress = () => {
        alert('Esqueceu sua senha?')
    };
    const handleSignUpPress = () => {
        alert('Cadastre-se')
    };

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Login</Text>
                <Text style={[styles.labelInput, styles.mt40]}>CNPJ</Text>
                <View style={styles.containerInput}>
                    <TextInput 
                        placeholderTextColor={"#fff"}
                        style={styles.input}
                    />
                </View>
                <Text style={styles.labelInput}>Senha</Text>
                <View style={styles.containerInput}>
                    <TextInput 
                        placeholderTextColor={"#fff"}
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity style={[styles.button, styles.mt40]} onPress={handleSignInPress}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleForgotPasswordPress}>
                    <Text style={[styles.containerText, styles.mt50, styles.textAlignCenter]}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUpPress}>
                    <Text style={[styles.containerText, styles.mt10, styles.textAlignCenter]}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}