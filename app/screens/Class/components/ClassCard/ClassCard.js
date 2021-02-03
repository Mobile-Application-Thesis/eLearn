import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import styles from './styles'

const ClassCard = ({ item }) => {
  const { gridView } = useTheme()
  return (
    <View
      key={item}
      style={[
        styles.root,
        {
          flex: gridView ? 1 / 2 : 1,
          height: gridView ? 200 : 100,
        },
      ]}>
      <Text>Card content</Text>
    </View>
  )
}

export default ClassCard
