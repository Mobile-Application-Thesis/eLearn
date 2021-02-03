import React from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { Header, EmptyList } from 'eLearn/app/components'
import styles from './styles'

const Discover = () => {
  const { navigate } = useNavigation()
  const headerProps = {
    headerTitle: 'Discover',
    rightActions: [
      {
        icon: 'magnify',
        onPress: () => navigate('Search'),
      },
    ],
  }

  return (
    <View style={styles.root}>
      <Header {...headerProps} />
      <FlatList
        data={[]}
        ListEmptyComponent={() => <EmptyList />}
      />
    </View>
  )
}

export default Discover
