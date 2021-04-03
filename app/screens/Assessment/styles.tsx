import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  button: TextStyle
  footer: ViewStyle
  padd: ViewStyle
  row: ViewStyle
  textInput: ViewStyle
  radio: ImageStyle
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
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  padd: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
  },
  radio: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
})
