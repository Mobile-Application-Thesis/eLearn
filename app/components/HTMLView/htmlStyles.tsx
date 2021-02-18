import { StyleSheet } from 'react-native'
import { DarkTheme } from '../../constants/theme'

const tagsStyles = (theme?: typeof DarkTheme) =>
  StyleSheet.create({
    i: { color: theme.colors.text },
    li: { color: theme.colors.text },
    ul: { color: theme.colors.text },
    p: { color: theme.colors.text },
    div: { color: theme.colors.text },
    h1: { color: theme.colors.text },
    h2: { color: theme.colors.text },
    h3: { color: theme.colors.text },
    h4: { color: theme.colors.text },
  })

export default tagsStyles
