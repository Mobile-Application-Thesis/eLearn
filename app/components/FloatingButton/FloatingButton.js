import React from 'react'
import { Text } from 'react-native-paper'
import PropTypes from 'prop-types'

import styles from './styles'
import Button from '../Button'

const FloatingButton = ({ name, containerStyle, textStyle, onPress }) => {
  return (
    <Button style={[styles.root, containerStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{name}</Text>
    </Button>
  )
}

FloatingButton.propTypes = {
  name: PropTypes.string,
  containerStyle: PropTypes.instanceOf(Object),
  textStyle: PropTypes.instanceOf(Object),
  onPress: PropTypes.func,
}

FloatingButton.defaultProps = {
  name: 'button',
  containerStyle: {},
  textStyle: {},
  onPress: Function.prototype,
}

export default FloatingButton
