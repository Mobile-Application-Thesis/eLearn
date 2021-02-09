import React from 'react'
import { View, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'

const radioButtonChecked = require('../../../../assets/radio-button-checked.png')
const radioButtonUnchecked = require('../../../../assets/radio-button-unchecked.png')

import { useTheme } from '../../../../contexts/ThemeProvider'
import styles from './styles'

const WizardHeader = ({ step }) => {
  const { goBack } = useNavigation()
  const { theme } = useTheme()

  return (
    <View style={styles.root}>
      {step === '0' ? (
        <View />
      ) : (
        <Icon
          onPress={goBack}
          name="arrow-left"
          type="material-community"
          color={theme.colors.primary}
          size={24}
        />
      )}
      <View style={styles.stepsContainer}>
        <Image
          source={radioButtonChecked}
          style={[styles.radio, { tintColor: theme.colors.primary }]}
        />
        <Image
          source={
            ['1', '2'].includes(step)
              ? radioButtonChecked
              : radioButtonUnchecked
          }
          style={[styles.radio, { tintColor: theme.colors.primary }]}
        />
        <Image
          source={step === '2' ? radioButtonChecked : radioButtonUnchecked}
          style={[styles.radio, { tintColor: theme.colors.primary }]}
        />
      </View>
    </View>
  )
}

export default WizardHeader
