import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  content: ViewStyle
  title: TextStyle
  choices: ViewStyle
  button: ViewStyle
  buttonContainer: ViewStyle
  errorMsg: TextStyle
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
    marginTop: -40,
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 10,
    width: '100%',
  },
  choices: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#2f426f',
    paddingHorizontal: 20,
    height: 50,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#2f426f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
  },
  errorMsg: {
    fontSize: 16,
  },
})
