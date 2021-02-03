import React from 'react'
import { View } from 'react-native'
import { Avatar, Switch, Text, TouchableRipple } from 'react-native-paper'

import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import styles from './styles'

const SettingsButton = ({
  label = '',
  icon = '',
  iconStyle = {},
  switchButton = false,
  value = false,
  onPress = () => {},
  ...rest
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
            {...rest}
          />
          <Text style={styles.buttonText}>{label}</Text>
        </View>
        {switchButton && <Switch onValueChange={onPress} value={value} />}
      </>
    </TouchableRipple>
  )
}

export default SettingsButton
