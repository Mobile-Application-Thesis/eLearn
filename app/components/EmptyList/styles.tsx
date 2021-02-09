import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  image: ImageStyle
  title: TextStyle
}

const styles = StyleSheet.create<Styles>({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '35%',
  },
  image: {
    width: 300,
    height: 250,
  },
  title: {
    fontSize: 20,
  },
})
export default styles
