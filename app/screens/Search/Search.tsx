import React from 'react'
import { View, FlatList } from 'react-native'

import { StackHeader, EmptyList } from '../../components'
import styles from './styles'

const Search: React.FC = () => {
  return (
    <View style={styles.root}>
      <StackHeader headerTextInput={true} />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={[]}
        ListEmptyComponent={() => <EmptyList />}
        renderItem={() => <></>}
      />
    </View>
  )
}

export default Search
