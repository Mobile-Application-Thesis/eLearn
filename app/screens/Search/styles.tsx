import { StyleSheet, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  contentContainerStyle: ViewStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    padding: 10,
  },
})
