import React from 'react'
import { View } from 'react-native'
import { Avatar, Switch, Text, TouchableRipple } from 'react-native-paper'

import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import styles from './styles'

const SettingsButton = ({
  label = String,
  icon = String,
  iconStyle = Object,
  switchButton = false,
  value = Boolean,
  onPress = Function,
}) => {
  const { theme } = useTheme()

  return (
    <TouchableRipple style={styles.root} onPress={onPress}>
      <>
        <View style={styles.button}>
          <Avatar.Icon
            icon={icon}
            size={theme.icons.size.small}
            style={[{ backgroundColor: theme.colors.border }, iconStyle]}
          />
          <Text style={styles.buttonText}>{label}</Text>
        </View>
        {switchButton && <Switch disabled={true} value={value} />}
      </>
    </TouchableRipple>
  )
}

export default SettingsButton
