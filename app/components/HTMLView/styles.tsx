import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  blockquote: ViewStyle
  pre: ViewStyle
  text: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
  },
  blockquote: {
    borderLeftWidth: 6,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 15,
    justifyContent: 'center',
  },
  pre: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexGrow: 1,
    width: '100%',
  },
  text: {
    fontFamily: 'monospace',
  },
})
