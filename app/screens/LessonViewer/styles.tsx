import { StyleSheet, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  content: ViewStyle
  header: ViewStyle
  examButton: ViewStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 4,
  },
  content: {
    padding: 20,
  },
  examButton: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
})
