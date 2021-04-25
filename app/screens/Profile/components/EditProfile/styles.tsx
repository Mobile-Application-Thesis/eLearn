import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  profileContainer: ViewStyle
  profileText: TextStyle
  placeholder: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileText: {
    marginTop: 5,
    paddingVertical: 5,
  },
  placeholder: {
    textTransform: 'capitalize',
    fontSize: 12,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: -10,
  },
})
