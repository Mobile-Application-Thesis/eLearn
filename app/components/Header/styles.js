import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    marginLeft: 15,
    fontWeight: '700',
  },
  button: {
    marginLeft: 20,
  },
})
