import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#111111'
  },
  topContainer: {
    backgroundColor: '#111111',
    marginBottom: 20
  },
  containerImage: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 8,
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 7,
    paddingHorizontal: 70
  },
  scrollContainer: {
    flexGrow: 1,
  },
});