import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  stepsContainer: ViewStyle
  radio: ImageStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  stepsContainer: {
    flexDirection: 'row',
  },
  radio: {
    height: 20,
    width: 20,
  },
})
