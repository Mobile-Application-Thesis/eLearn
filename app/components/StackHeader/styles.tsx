import { StyleSheet, TextStyle } from 'react-native'

interface Styles {
  textInput: TextStyle
}

export default StyleSheet.create<Styles>({
  textInput: {
    fontSize: 16,
    marginLeft: 10,
  },
})
