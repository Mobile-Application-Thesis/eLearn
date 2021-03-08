import { StyleSheet } from 'react-native'
import { DarkTheme } from '../../constants/theme'

const tagsStyles = (theme?: typeof DarkTheme, preview?: boolean) => {
  const {
    colors: { text, greyOutline },
  } = theme
  const style = { color: preview ? greyOutline : text }
  return StyleSheet.create({
    i: style,
    li: style,
    ul: style,
    p: style,
    div: { ...style, textAlign: 'justify' },
    h1: style,
    h2: style,
    h3: style,
    h4: style,
  })
}

export default tagsStyles
