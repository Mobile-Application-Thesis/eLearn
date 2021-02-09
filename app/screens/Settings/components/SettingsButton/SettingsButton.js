import React from 'react'
import { View } from 'react-native'
import { Avatar, Switch, Text, TouchableRipple } from 'react-native-paper'
import PropTypes from 'prop-types'

import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import styles from './styles'

const SettingsButton = ({
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

SettingsButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  iconStyle: PropTypes.instanceOf(Object),
  switchButton: PropTypes.bool,
  value: PropTypes.bool,
  onPress: PropTypes.func,
}

SettingsButton.defaultProps = {
  label: '',
  icon: '',
  iconStyle: {},
  switchButton: false,
  value: false,
  onPress: Function.prototype,
}

export default SettingsButton
