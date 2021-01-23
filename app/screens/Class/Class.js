import React from 'react'
import { View } from 'react-native'

import styles from './styles'

import { Header } from 'eLearn/app/components'

const Class = () => {
  const headerProps = {
    headerTitle: 'E-Learn',
    rightActions: [
      {
        icon: 'pencil-plus-outline',
        onPress: () => {},
      },
    ],
  }
  return (
    <View style={styles.root}>
      <Header {...headerProps} />
    </View>
  )
}

export default Class
