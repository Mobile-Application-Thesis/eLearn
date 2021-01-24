import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import styles from './styles'

const ClassCard = ({ item }) => {
  return (
    <View key={item} style={styles.root}>
      <Text>Card content</Text>
    </View>
  )
}

export default ClassCard
