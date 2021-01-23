import React from 'react'
import { View, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import WizardHeader from '../WizardHeader'
import styles from './styles'

const StepOne = () => {
  const { navigate } = useNavigation()
  return (
    <View style={styles.root}>
      <WizardHeader step="1" />
      <Text>Step One</Text>

      <Pressable onPress={() => navigate('StepTwo')}>
        <Text>Next</Text>
      </Pressable>
    </View>
  )
}

export default StepOne
