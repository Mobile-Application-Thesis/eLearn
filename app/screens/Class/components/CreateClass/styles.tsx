import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  content: ViewStyle
  button: ViewStyle
  buttonText: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  button: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: '#2f426f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
})
