import React, { createContext, useContext, useEffect, useState } from 'react'
import SimpleToast from 'react-native-simple-toast'

import { FirebaseService } from 'eLearn/app/services/firebase.services'
import ErrorHandler from 'eLearn/app/utils/errorHandler'
import { useAsyncStorage } from 'eLearn/app/hooks'
import { useProfile } from '../hooks'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn, loggedInFromStorage] = useAsyncStorage(
    'loggedIn',
    false,
  )
  const [wizard, setWizard, wizardFromStorage] = useAsyncStorage(
    'wizard',
    true,
  )
  const [userCredentials, setUserCredentials] = useProfile()
  const [initializing, setInitializing] = useState(false)

  useEffect(() => {
    const unsubscribe = FirebaseService.auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      }
    })
    return unsubscribe
  }, [])

  const signIn = async ({ email, password }) => {
    setInitializing(true)

    const response = await FirebaseService.signIn({
      email,
      password,
    })
    setInitializing(false)

    if (!response.user) {
      ErrorHandler(response)
    } else {
      SimpleToast.show(`Welcome ${response.user.displayName}`)
    }
  }

  const signUp = async ({ fullName, username, email, password }) => {
    setInitializing(true)
    setWizard(true)

    const response = await FirebaseService.signUp({
      fullName,
      username,
      email,
      password,
    })
    setInitializing(false)

    if (!response.user) {
      ErrorHandler(response)
    }
  }

  const signOut = async () => {
    setLoggedIn(false)
    await FirebaseService.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        loggedIn,
        initializing,
        loggedInFromStorage,
        userCredentials,
        wizard,
        wizardFromStorage,
        setWizard,
        setUserCredentials,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
