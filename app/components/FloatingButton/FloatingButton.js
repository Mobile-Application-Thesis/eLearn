import React from 'react'
import { Text } from 'react-native-paper'

import styles from './styles'
import Button from '../Button'

const FloatingButton = ({
  name = 'button',
  containerStyle = {},
  textStyle = {},
  onPress = () => {},
}) => {
  return (
    <Button style={[styles.root, containerStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{name}</Text>
    </Button>
  )
}

export default FloatingButton
