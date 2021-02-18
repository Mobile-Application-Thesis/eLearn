import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  previewTitle: TextStyle
  textInput: ViewStyle
  button: ViewStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  previewTitle: {
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
    fontWeight: '700',
  },
  textInput: {
    borderRadius: 5,
  },
  button: {
    textTransform: 'uppercase',
    marginRight: 20,
    fontWeight: '700',
  },
})
