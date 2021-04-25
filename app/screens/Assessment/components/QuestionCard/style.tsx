import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  row: ViewStyle
  textInput: ViewStyle
  text: ViewStyle
  radio: ImageStyle
  addItem: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 0.5,
    marginTop: 0,
    marginLeft: -10,
    backgroundColor: 'transparent',
  },
  text: {
    marginTop: 8,
    marginLeft: 5,
    backgroundColor: 'transparent',
    textAlign: 'justify',
    width: '90%',
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
