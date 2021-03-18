import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  button: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
  },
  button: {
    textTransform: 'uppercase',
    marginRight: 20,
    fontWeight: '700',
  },
})
