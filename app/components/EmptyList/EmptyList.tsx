import React from 'react'
import { View, Image } from 'react-native'
import { Text } from 'react-native-paper'

import styles from './styles'

const professorImage = require('eLearn/app/assets/undraw_faq.png')

interface Props {
  image?: number
  title?: string
}

const EmptyList: React.FC<Props> = ({ image, title }) => {
  return (
    <View style={styles.root}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
EmptyList.defaultProps = {
  image: professorImage,
  title: 'Feature not yet available!',
}

export default EmptyList
