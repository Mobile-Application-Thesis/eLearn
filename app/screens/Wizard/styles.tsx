import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  desc: TextStyle
  buttonText: TextStyle
  buttonContainer: ViewStyle
  button: ViewStyle
  title: TextStyle
  content: ViewStyle
  root: ViewStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
    paddingTop: '10%',
    paddingHorizontal: '10%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#2f426f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonContainer: {
    width: '50%',
  },
  buttonText: {
    textTransform: 'uppercase',
  },
  desc: {
    width: '80%',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
})
