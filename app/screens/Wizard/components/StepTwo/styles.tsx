import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  content: ViewStyle
  title: TextStyle
  button: ViewStyle
  buttonContainer: ViewStyle
  desc: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
    paddingTop: '10%',
    paddingHorizontal: '10%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#2f426f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonContainer: {
    width: '50%',
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    marginBottom: 20,
  },
})
