import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
    marginBottom: 10,
    borderRadius: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
  },
  description: {
    marginTop: 5,
    color: '#fff',
  },
  name: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
  classCode: {
    borderRadius: 3,
    paddingHorizontal: 8,
    color: '#000',
    fontWeight: '700',
    paddingVertical: 1,
  },
  classCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 5,
  },
})
