import React from 'react'
import { View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { useAuth } from 'eLearn/app/contexts/AuthProvider'

import WizardHeader from '../WizardHeader'
import styles from './styles'

const StepTwo = () => {
  const { setWizard } = useAuth()
  return (
    <View style={styles.root}>
      <WizardHeader step="2" />
      <Text>Step Two</Text>

      <Pressable onPress={() => setWizard(false)}>
        <Text>Finish</Text>
      </Pressable>
    </View>
  )
}

export default StepTwo
