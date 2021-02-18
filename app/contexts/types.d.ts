import React from 'react'
import { DarkTheme as theme } from '../constants/theme'

declare type Mode = 'adaptive' | 'exact'

export declare type ThemeContextTypes = {
  theme: typeof theme
  darkMode: boolean
  toggleDarkMode: () => any
}

export declare type FormAuthContextTypes = {
  formErrors: object
  setError: (name: string) => void
  clearError: (name: string) => void
  handleSubmit: (next: any, callback: any) => void
  reset: () => (value: React.SetStateAction<{}>) => void
}

declare type signIn = {
  email: string
  password: string
}
declare type signUp = {
  fullName: string
  username: string
  email: string
  password: string
}

export declare type AuthContextTypes = {
  signIn: ({ email, password }: signIn) => Promise<void>
  signUp: ({ fullName, username, email, password }: signUp) => Promise<void>
  signOut: () => Promise<void>
  loggedIn: boolean
  initializing: boolean
  loggedInFromStorage: boolean
  user: {
    id: string
    fullName: string
    status: string
    username: string
    country: string
    birthday: string
    address: string
    avatar: string
    email: string
    role: string
  }
  wizard: boolean
  wizardFromStorage: boolean
  setWizard: (value: any) => Promise<void>
  updateUser: (data: object) => any
}

export {}
