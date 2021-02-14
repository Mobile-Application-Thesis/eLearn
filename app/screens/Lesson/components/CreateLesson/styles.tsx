import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  editorContainer: ViewStyle
  editor: ViewStyle
  button: TextStyle
  h2: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
    paddingBottom: 10,
  },
  editorContainer: {
    flexGrow: 1,
  },
  editor: {
    flexGrow: 1,
  },
  button: {
    textTransform: 'uppercase',
    marginRight: 20,
    fontWeight: '700',
  },
  h2: {
    fontSize: 19,
    marginTop: -2,
  },
})
