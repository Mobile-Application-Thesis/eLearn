import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  button: ViewStyle
  buttonText: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    marginLeft: 15,
    fontSize: 16,
  },
})
