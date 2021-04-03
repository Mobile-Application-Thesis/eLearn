import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  row: ViewStyle
  textInput: ViewStyle
  radio: ImageStyle
  addItem: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 0.5,
    marginTop: 0,
    marginLeft: -10,
    backgroundColor: 'transparent',
    width: '100%',
  },
  radio: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  addItem: {
    paddingVertical: 5,
    marginLeft: 5,
  },
})
