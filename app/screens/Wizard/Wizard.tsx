import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { useAuth } from '../../contexts/AuthProvider'
import { useTheme } from '../../contexts/ThemeProvider'
import { Button } from '../../components'
import { WizardHeader } from './components'
import styles from './styles'

interface Props {}

const Wizard: React.FC<Props> = () => {
  const { user } = useAuth()
  const { navigate } = useNavigation()
  const { theme } = useTheme()

  return (
    <View style={styles.root}>
      <WizardHeader step="0" />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Welcome {user.fullName}!
        </Text>
        <Text style={[styles.desc]}>
          We would like you to do some things first before proceeding on using
          the application, thank you!
        </Text>
        <View style={styles.buttonContainer}>
          <Button style={[styles.button]} onPress={() => navigate('StepOne')}>
            <Text style={[styles.buttonText, { color: theme.colors.text }]}>
              proceed
            </Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Wizard
