import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper'
import { colors } from 'react-native-elements'

const DefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...colors,
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#2f426f',
    facebook: '#2f426f',
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
    ...colors,
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#fff',
    facebook: '#181818',
    background: '#212121',
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
