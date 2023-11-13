import { Platform, StyleSheet } from "react-native";

export const signInUpStyles = StyleSheet.create({
  // Global styles login and Register screen
  labelInput: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '400',
    color: '#8F8E8E',
    letterSpacing: 2
  },
  containerInput: {
    backgroundColor: '#F5F5F5',
    height: 55,
    padding: 10,
    borderRadius: 16,
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
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
  errorInput: {
    borderWidth: 2,
    borderColor: 'red'
  },
  errorText: {
    marginLeft: 10,
    color: 'red',
    fontSize: 16
  },
  successText: {
    color: 'green',
    fontSize: 16
  },
  input: {
    color: '#000',
    width: '80%',
    paddingLeft: 10,
    fontSize: 20
  },
  button: {
    backgroundColor: '#111111',
    padding: 14,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  containerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '400',
    color: '#8F8E8E',
    letterSpacing: 1
  },
  headerText: {
    fontSize: 45,
    fontWeight: "bold",
    color: '#1c2120',
    marginTop: '12%',
    letterSpacing: -2,
    textAlign: 'center'
  },
});