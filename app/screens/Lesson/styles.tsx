import { StyleSheet, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  content: ViewStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
})
