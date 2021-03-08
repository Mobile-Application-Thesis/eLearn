import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

interface Styles {
  root: ViewStyle
  titleContainer: ViewStyle
  htmlPreviewContainer: ViewStyle
  text: TextStyle
  darkMode: TextStyle
  preview: TextStyle
}

export default StyleSheet.create<Styles>({
  root: {
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 1,
  },
  htmlPreviewContainer: {
    height: 100,
    overflow: 'hidden',
    paddingTop: 20,
    paddingHorizontal: 30,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
  },
  darkMode: {
    borderWidth: 1,
  },
  titleContainer: {
    padding: 10,
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
  },
  preview: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 100,
    fontStyle: 'italic',
    fontWeight: '700',
  },
})
