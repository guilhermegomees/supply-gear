import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
      backgroundColor: '#000',
      padding: 20,
      paddingHorizontal: 20,
      height: 200,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    marginTop: 10,
    fontSize: 20,
    color: '#999'
  },
  tBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
  }
});