import React, { useEffect, useState } from 'react'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'

import { mainStack, authStack, wizardStack } from 'eLearn/app/constants/routes'
import { useAuth } from '../contexts/AuthProvider'
import AuthLoader from '../screens/AuthLoader'

const Stack = createStackNavigator()

const MainStack = () => {
  const [authLoader, setAuthLoader] = useState(true)
  const [stack, setStack] = useState([])
  const [initialRouteName, setInitialRouteName] = useState('')
  const [loading, setLoading] = useState(true)

  const { loggedIn, loggedInFromStorage, wizard, wizardFromStorage } = useAuth()

  useEffect(() => {
    if (loggedInFromStorage && wizardFromStorage) {
      setStack(loggedIn ? (wizard ? wizardStack : mainStack) : authStack)
      setInitialRouteName(loggedIn ? 'Home' : 'SignIn')
    }
  }, [loggedIn, loggedInFromStorage, wizard, wizardFromStorage])

  useEffect(() => {
    if (stack.length !== 0 && initialRouteName) setAuthLoader(false)
  }, [authLoader, initialRouteName])

  useEffect(() => {
    if (stack.length !== 0) {
      setTimeout(() => {
        setLoading()
      }, 1000)
    }
  }, [stack])

  if (loading) {
    return <AuthLoader />
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      headerMode="float"
      animation="fade"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      {stack.map(({ name, ...rest }) => (
        <Stack.Screen key={name} name={name} {...rest} />
      ))}
    </Stack.Navigator>
  )
}

export default MainStack
