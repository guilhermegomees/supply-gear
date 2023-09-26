import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mt50: {
    marginTop: 50
  },
  mt40: {
    marginTop: 40
  },
  mt20: {
    marginTop: 20
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
  textUndeline: {
    textDecorationLine: 'underline'
  },
  textAlignCenter: {
    textAlign: 'center'
  },
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
  headerText: {
    fontSize: 55,
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
    backgroundColor: '#2A364E',
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
    fontSize: 18,
    fontWeight: '400',
    color: '#8F8E8E',
    letterSpacing: 1,
    textDecorationLine: 'underline'
  },
  errorInput: {
    borderWidth: 2,
    borderColor: 'red'
  },
  errorText: {
    marginLeft: 10,
    color: 'red'
  },
});