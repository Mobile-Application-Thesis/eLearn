import React from 'react'
import AuthProvider from './app/contexts/AuthProvider'
import ThemeProvider from './app/contexts/ThemeProvider'
import FormAuthProvider from './app/contexts/FormAuthProvider'
import MainStack from './app/routes/MainStack'

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FormAuthProvider>
          <MainStack />
        </FormAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
