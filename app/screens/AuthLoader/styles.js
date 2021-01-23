import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  root: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  box: {
    width: 220,
    resizeMode: 'cover',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#000',
  },
})
