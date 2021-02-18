import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper'

const DefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#2f426f',
    blue: '#1e90ea',
    background: '#fff',
    code: '#f0f0f0',
    blockquote: '#ddd',
  },
  icons: {
    size: {
      big: 58,
      small: 35,
    },
  },
}
const DarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#fff',
    blue: '#1e90ea',
    background: '#181818',
    code: '#2a3836',
    blockquote: '#ddd',
  },
  icons: {
    size: {
      big: 58,
      small: 35,
    },
  },
}

export { DefaultTheme, DarkTheme }
