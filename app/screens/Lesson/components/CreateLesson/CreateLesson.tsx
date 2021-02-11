import React from 'react'
import { View } from 'react-native'

import { StackHeader } from './../../../../components'
import styles from './styles'

interface Props {}

const CreateLesson: React.FC<Props> = () => {
  return (
    <View style={styles.root}>
      <StackHeader headerTitle={'Create Lesson'} />
    </View>
  )
}

export default CreateLesson
