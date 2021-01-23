import React from 'react'
import { View } from 'react-native'

import styles from './styles'

import { Header } from 'eLearn/app/components'

const Discover = () => {
  const headerProps = {
    headerTitle: 'Discover',
    rightActions: [
      {
        icon: 'account-plus',
        onPress: () => {},
      },
      {
        icon: 'book-account',
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

export default Discover
