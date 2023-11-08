import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'space-between',
  },
  containerLogo: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    zIndex: 2,
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  bgContainer: {
    position: 'absolute'
  },
  container: {
    padding: 25,
    height: '70%',
    backgroundColor: '#fff',
    borderTopRightRadius: 90,
    borderTopLeftRadius: 7,
    paddingHorizontal: 70
  },
});