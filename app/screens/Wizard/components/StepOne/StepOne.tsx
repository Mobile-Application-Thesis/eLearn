import React, { useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { Icon } from 'react-native-elements'

import { Button } from '../../../../components'
import { useTheme } from '../../../../contexts/ThemeProvider'
import { useAuth } from '../../../../contexts/AuthProvider'
import constants from '../../../../constants/data'
import WizardHeader from '../WizardHeader'
import styles from './styles'

const StepOne = () => {
  const { navigate } = useNavigation()
  const { theme } = useTheme()
  const { updateUser } = useAuth()
  const [role, setRole] = useState('')
  const [error, setError] = useState(false)

  const action = (value) => {
    setRole(value)
    setError(false)
    updateUser({ role: value })
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
            onPress={action.bind(this, constants.userRole.student)}>
            <Text style={{ color: theme.colors.primary }}>Student</Text>
            {role === constants.userRole.student && (
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
            onPress={action.bind(this, constants.userRole.teacher)}>
            <Text style={{ color: theme.colors.primary }}>
              Teacher/Professor
            </Text>
            {role === constants.userRole.teacher && (
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
