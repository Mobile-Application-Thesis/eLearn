import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  profileContainer: ViewStyle
  profileText: TextStyle
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
    fontSize: 24,
    fontWeight: '700',
    marginTop: 5,
    paddingVertical: 5,
  },
})
