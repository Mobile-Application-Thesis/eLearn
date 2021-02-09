import React from 'react'
import { View, Image } from 'react-native'
import { Text } from 'react-native-paper'
import PropTypes from 'prop-types'

import styles from './styles'

import professorImage from 'eLearn/app/assets/undraw_faq.png'

const EmptyList = ({ image, title }) => {
  return (
    <View style={styles.root}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

EmptyList.propTypes = {
  image: PropTypes.number,
  title: PropTypes.string,
}

EmptyList.defaultProps = {
  image: professorImage,
  title: 'Feature not yet available!',
}

export default EmptyList
