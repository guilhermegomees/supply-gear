import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 10,
        width: 160,
        height: 240,
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
        marginTop: 15,
        backgroundColor: '#FFF'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 16,
        gap: 8,
        width: '100%',
    },
    name: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold'
    },
});