import React, { createContext, useContext, useEffect, useState } from 'react'
import SimpleToast from 'react-native-simple-toast'

import { FirebaseService } from '../services/firebase.services'
import ErrorHandler from '../utils/errorHandler'
import { useAsyncStorage } from '../hooks'
import { useProfile } from '../hooks'

interface Context {
  signIn?: ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => Promise<void>
  signUp?: ({
    fullName,
    username,
    email,
    password,
  }: {
    fullName: string
    username: string
    email: string
    password: string
  }) => Promise<void>
  signOut?: () => Promise<void>
  loggedIn?: boolean
  initializing?: boolean
  loggedInFromStorage?: boolean
  user?
  wizard?: boolean
  wizardFromStorage?: boolean
  setWizard?: (value: any) => Promise<void>
  updateUser?: (data: object) => any
}

const AuthContext = createContext<Context>({})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn, loggedInFromStorage] = useAsyncStorage(
    'loggedIn',
    false,
  )
  const [wizard, setWizard, wizardFromStorage] = useAsyncStorage(
    'wizard',
    false,
  )
  const [user, updateUser, setUser] = useProfile()
  const [initializing, setInitializing] = useState(false)

  useEffect(() => {
    const unsubscribe = FirebaseService.auth.onAuthStateChanged(
      (currentUser) => {
        if (currentUser) {
          setUser(currentUser.uid)
          setLoggedIn(true)
        }
      },
    )
    return unsubscribe
  }, [])

  const signIn = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    setInitializing(true)

    const response = await FirebaseService.signIn({
      email,
      password,
    })
    setInitializing(false)

    if (!response.user) {
      ErrorHandler(response)
    } else {
      SimpleToast.show(`Welcome back ${response.user.displayName}!`)
    }
  }

  const signUp = async ({
    fullName,
    username,
    email,
    password,
  }: {
    fullName: string
    username: string
    email: string
    password: string
  }) => {
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
        user,
        wizard,
        wizardFromStorage,
        setWizard,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
