import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { useAuth } from 'eLearn/app/contexts/AuthProvider'
import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import { Button } from 'eLearn/app/components'
import { WizardHeader } from './components'
import styles from './styles'

const Wizard = () => {
  const { userCredentials } = useAuth()
  const { navigate } = useNavigation()
  const { theme } = useTheme()

  return (
    <View style={styles.root}>
      <WizardHeader step="0" />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Welcome {userCredentials.fullName}!
        </Text>
        <Text style={[styles.desc]}>
          We would like you to do some things first before proceeding on using
          the application, thank you!
        </Text>
        <View style={styles.buttonContainer}>
          <Button style={[styles.button]} onPress={() => navigate('StepOne')}>
            <Text
              style={[styles.buttonText, { color: theme.colors.background }]}>
              proceed
            </Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Wizard
