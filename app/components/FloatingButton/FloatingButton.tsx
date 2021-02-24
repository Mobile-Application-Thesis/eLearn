import React from 'react'
import { TextStyle, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import styles from './styles'
import Button from '../Button'
import { useTheme } from './../../contexts/ThemeProvider'

interface Props {
  name?: string
  containerStyle?: ViewStyle
  textStyle?: TextStyle
  onPress?: () => void
}

const FloatingButton: React.FC<Props> = ({
  name,
  containerStyle,
  textStyle,
  onPress,
}) => {
  const { theme } = useTheme()
  return (
    <Button
      style={[
        styles.root,
        { backgroundColor: theme.colors.facebook },
        containerStyle,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{name}</Text>
    </Button>
  )
}

FloatingButton.defaultProps = {
  name: 'button',
  containerStyle: {},
  textStyle: {},
  onPress: () => {},
}

export default FloatingButton
