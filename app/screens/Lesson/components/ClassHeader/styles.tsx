import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  content: ViewStyle
  titleContainer: ViewStyle
  text: TextStyle
  description: TextStyle
  name: TextStyle
  classCode: TextStyle
  classCodeContainer: ViewStyle
  footer: ViewStyle
  icon: ViewStyle
  lessonTitle: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    marginBottom: 10,
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
  lessonTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '700',
    marginHorizontal: 15,
  },
})
