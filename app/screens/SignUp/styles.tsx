import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  title: TextStyle
  button: ViewStyle
  buttonText: TextStyle
  textContainer: ViewStyle
  highLight: object
  breakLine: ViewStyle
  textInput: TextStyle
  image: ImageStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
  },
  title: {
    fontSize: 20,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#2f426f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  highLight: {
    color: '#0064bd',
  },
  breakLine: {
    width: '100%',
    height: 10,
  },
  textInput: {
    backgroundColor: '#b9b9ba40',
    borderRadius: 20,
    marginTop: 8,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 250,
  },
})
