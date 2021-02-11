import React from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { Header, EmptyList } from '../../components'
import styles from './styles'

const Discover: React.FC = () => {
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
        renderItem={() => <></>}
      />
    </View>
  )
}

export default Discover
