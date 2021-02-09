import React from 'react'
import { View, ViewStyle } from 'react-native'
import { Avatar, Switch, Text, TouchableRipple } from 'react-native-paper'

import { useTheme } from '../../../../contexts/ThemeProvider'
import styles from './styles'

interface Props {
  label?: string
  icon?: string
  size?: number
  iconStyle?: ViewStyle
  switchButton?: boolean
  value?: boolean
  onPress?: () => void
}

const SettingsButton: React.FC<Props> = ({
  label,
  icon,
  iconStyle,
  switchButton,
  value,
  onPress,
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

SettingsButton.defaultProps = {
  label: '',
  icon: '',
  iconStyle: {},
  switchButton: false,
  value: false,
  onPress: () => {},
}

export default SettingsButton
