import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#111111'
  },
  topContainer: {
    flex: 2,
    backgroundColor: '#111111'
  },
  containerImage: {
    position: 'absolute',
    top: '15%',
    height: 'auto',
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 8,
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 7,
    paddingHorizontal: 70
  },
});