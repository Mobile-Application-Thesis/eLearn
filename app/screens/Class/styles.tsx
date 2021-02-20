import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  button: ViewStyle
  friendsContainer: ViewStyle
  box: ViewStyle
  text: TextStyle
  buttonText: TextStyle
  container: ViewStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  friendsContainer: {
    marginLeft: 10,
    marginVertical: 5,
  },
  box: {
    alignItems: 'center',
  },
  text: {
    width: 74,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  container: {
    flexGrow: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
})
