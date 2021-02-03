import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useAuth } from 'eLearn/app/contexts/AuthProvider'

import { Button } from 'eLearn/app/components'
import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import WizardHeader from '../WizardHeader'
import styles from './styles'

const StepTwo = () => {
  const { theme } = useTheme()
  const { setWizard } = useAuth()
  return (
    <View style={styles.root}>
      <WizardHeader step="2" />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Awesome!
        </Text>
        <Text style={styles.desc}>You can now use the application!</Text>

        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={() => setWizard(false)}>
            <Text style={{ color: theme.colors.background }}>Finish</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default StepTwo
