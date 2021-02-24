import { StyleSheet } from 'react-native'
import { DarkTheme } from '../../constants/theme'

const tagsStyles = (theme?: typeof DarkTheme, preview?: boolean) => {
  const {
    colors: { text, greyOutline },
  } = theme
  return StyleSheet.create({
    i: { color: preview ? greyOutline : text },
    li: { color: preview ? greyOutline : text },
    ul: { color: preview ? greyOutline : text },
    p: { color: preview ? greyOutline : text },
    div: { color: preview ? greyOutline : text },
    h1: { color: preview ? greyOutline : text },
    h2: { color: preview ? greyOutline : text },
    h3: { color: preview ? greyOutline : text },
    h4: { color: preview ? greyOutline : text },
  })
}

export default tagsStyles
