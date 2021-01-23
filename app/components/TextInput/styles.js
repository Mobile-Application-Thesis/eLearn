import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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

const styleObj = StyleSheet.flatten([styles.root])

export { styles as default, styleObj }
