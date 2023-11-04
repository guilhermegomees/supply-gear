import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        zIndex: 3
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: '100%',
        zIndex: 3
    },
    selectedOption: {
        flex: 1,
        color: '#000',
        paddingLeft: 10,
        fontSize: 20
    },
    dropdownList: {
        position: 'absolute',
        top: '105%',
        left: 0,
        right: 0,
        width: '100%',
        paddingVertical: 20,
        borderRadius: 13,
        backgroundColor: '#F5F5F5',
        zIndex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 4,
            },
        }),
    },
    dropdownItem: {
        paddingLeft: 25,
        zIndex: 1,
        color: '#383838',
        fontSize: 12,
        fontWeight: '500',
        flexWrap: 'wrap',
    },
    divider: {
        height: 1,
        width: '92%',
        backgroundColor: '#E3E3E3',
        marginVertical: 10
    },
});