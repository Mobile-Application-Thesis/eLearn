import { StyleSheet, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  rightIcon: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b9b9ba40',
    borderRadius: 20,
    marginTop: 8,
    fontSize: 16,
    paddingHorizontal: 15,
    width: '100%',
  },
  rightIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export { styles as default }
