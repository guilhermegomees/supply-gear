import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#111111',
  },
  topContainer: {
    flex: 2,
    paddingBottom: 80,
    backgroundColor: '#111111'
  },
  containerImage: {
    position: 'absolute',
    marginTop: 90,
    height: 'auto',
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 8,
    backgroundColor: '#F5F5F5',
  },
  nameProduct: {
    color: 'black',
    fontSize: 36,
    fontWeight: '700',
    flexWrap: 'wrap',
  },
  price: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    flexWrap: 'wrap',
    verticalAlign: "bottom"
  },
  dolarSign: {
    color: 'black',
    fontSize: 24,
    fontWeight: '400',
    flexWrap: 'wrap',
  },
  buttonBag: {
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 10,
    width: '45%',
    height: 56
  },
  buttonBagText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: "center",
    width: '90%'
  },
  subTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: "600"
  },
  description: {
    color: 'black',
    fontSize: 16,
    fontWeight: "400",
  },
});