import React from 'react'
import { View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { useAuth } from 'eLearn/app/contexts/AuthProvider'
import { WizardHeader } from './components'
import styles from './styles'

const Wizard = () => {
  const { userCredentials } = useAuth()
  const { navigate } = useNavigation()

  return (
    <View style={styles.root}>
      <WizardHeader step="0" />
      <View style={styles.content}>
        <Text>Hello {userCredentials.displayName}!</Text>
        <Pressable onPress={() => navigate('StepOne')}>
          <Text>Next</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Wizard
