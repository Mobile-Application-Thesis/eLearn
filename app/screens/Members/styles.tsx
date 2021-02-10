import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  content: ViewStyle
  className: TextStyle
  title: TextStyle
  item: ViewStyle
  avatar: ImageStyle
  name: TextStyle
  leftItemContent: ViewStyle
}

export default StyleSheet.create<Styles>({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  className: {
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 10,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 20,
    marginHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 2,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  leftItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 25,
  },
  name: {
    fontSize: 15,
    marginLeft: 20,
  },
})
