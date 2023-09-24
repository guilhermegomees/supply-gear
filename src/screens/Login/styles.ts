import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mt50: {
    marginTop: 50
  },
  mt40: {
    marginTop: 40
  },
  mt10: {
    marginTop: 10
  },
  mb0: {
    marginBottom: 0
  },
  mb10: {
    marginBottom: 10
  },
  ml5: {
    marginLeft: 5
  },
  pl15: {
    paddingLeft: 15
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  body: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'space-between',
  },
  containerLogo: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center'
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
    height: '60%',
    backgroundColor: '#fff',
    borderTopRightRadius: 90,
    borderTopLeftRadius: 7,
    paddingHorizontal: 70
  },
  headerText: {
    fontSize: 65,
    fontWeight: "bold",
    color: '#1c2120',
    marginTop: '12%',
    letterSpacing: -2,
    textAlign: 'center'
  },
  containerInput: {
    backgroundColor: '#8F8E8E',
    opacity: 0.3,
    height: 55,
    padding: 10,
    borderRadius: 16,
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  labelInput: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '400',
    color: '#8F8E8E',
    letterSpacing: 2
  },
  input: {
    color: '#000',
    width: '80%',
    paddingLeft: 10,
    fontSize: 20
  },
  button: {
    backgroundColor: '#1C2120',
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
  errorInput: {
    borderWidth: 2,
    borderColor: 'red'
  },
  errorText: {
    marginLeft: 10,
    color: 'red'
  },
  errorTextCnpj: {
    marginBottom: 10
  }
});