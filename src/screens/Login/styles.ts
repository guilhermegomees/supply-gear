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
  textAlignCenter: {
    textAlign: 'center'
  },
  body: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end'
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
    justifyContent: 'space-between',
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
    paddingLeft: 10
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
});