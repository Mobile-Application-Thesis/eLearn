import React, { createContext, useContext } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider, Portal } from 'react-native-paper'

// Themes
import { DarkTheme, DefaultTheme } from 'eLearn/app/constants/theme'
import useAsyncStorage from 'eLearn/app/hooks/useAsyncStorage'

const ThemeContext = createContext({})

export const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useAsyncStorage('darkMode', false)

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const theme = darkMode ? DarkTheme : DefaultTheme

  return (
    <PaperProvider theme={theme}>
      <Portal>
        <NavigationContainer theme={theme}>
          <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
            <StatusBar
              backgroundColor={theme.colors.background}
              barStyle={darkMode ? 'light-content' : 'dark-content'}
            />
            {children}
          </ThemeContext.Provider>
        </NavigationContainer>
      </Portal>
    </PaperProvider>
  )
}

export default ThemeProvider
