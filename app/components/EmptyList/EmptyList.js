import React from 'react'
import { View, Image } from 'react-native'
import { Text } from 'react-native-paper'

import styles from './styles'

import professorImage from 'eLearn/app/assets/undraw_faq.png'

const EmptyList = ({
  image = professorImage,
  title = 'Feature not yet available!',
}) => {
  return (
    <View style={styles.root}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default EmptyList
