import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  text: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    position: 'absolute',
    backgroundColor: '#2f426f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    bottom: 15,
    right: 15,
    zIndex: 100,
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
})
