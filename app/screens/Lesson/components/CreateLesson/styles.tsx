import { StyleSheet, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  editorContainer: ViewStyle
  editor: ViewStyle
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
})
