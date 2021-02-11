import React from 'react'
import { Fonts } from 'react-native-paper/lib/typescript/types'

declare type Mode = 'adaptive' | 'exact'

export declare type ThemeContextTypes = {
  theme: {
    dark: boolean
    mode?: Mode
    roundness: number
    colors: {
      primary: string
      background: string
      surface: string
      accent: string
      error: string
      text: string
      onSurface: string
      onBackground: string
      disabled: string
      placeholder: string
      backdrop: string
      border: string
      notification: string
    }
    icons: {
      size: {
        big: number
        small: number
      }
    }
    fonts: Fonts
    animation: {
      scale: number
    }
  }
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
