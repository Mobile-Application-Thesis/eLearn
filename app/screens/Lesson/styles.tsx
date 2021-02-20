import { StyleSheet, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  container: ViewStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
})
