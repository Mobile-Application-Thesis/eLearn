import React, { useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { Icon } from 'react-native-elements'

import { Button } from 'eLearn/app/components'
import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import { useAuth } from 'eLearn/app/contexts/AuthProvider'
import { userRole } from 'eLearn/app/constants/data'
import WizardHeader from '../WizardHeader'
import styles from './styles'

const StepOne = () => {
  const { navigate } = useNavigation()
  const { theme } = useTheme()
  const { setUserCredentials } = useAuth()
  const [role, setRole] = useState('')
  const [error, setError] = useState(false)

  const action = (value) => {
    setRole(value)
    setError(false)
    setUserCredentials({ role: value })
  }

  const nextStep = () => {
    if (!role) {
      return setError(true)
    }

    navigate('StepTwo')
  }

  return (
    <View style={styles.root}>
      <WizardHeader step="1" />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Please select your role
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            style={[styles.choices]}
            onPress={action.bind(this, userRole.student)}>
            <Text style={{ color: theme.colors.primary }}>Student</Text>
            {role === userRole.student && (
              <Icon
                name="check-bold"
                type="material-community"
                color={theme.colors.primary}
              />
            )}
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={[styles.choices]}
            onPress={action.bind(this, userRole.teacher)}>
            <Text style={{ color: theme.colors.primary }}>
              Teacher/Professor
            </Text>
            {role === userRole.teacher && (
              <Icon
                name="check-bold"
                type="material-community"
                color={theme.colors.primary}
              />
            )}
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={nextStep}>
            <Text style={{ color: theme.colors.background }}>Next</Text>
          </Button>
        </View>
        <Text style={[styles.errorMsg, { color: theme.colors.error }]}>
          {error && 'You need to select your role to continue.'}
        </Text>
      </View>
    </View>
  )
}

export default StepOne
