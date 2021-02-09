import React from 'react'
import { View, FlatList } from 'react-native'

import { StackHeader, EmptyList } from '../../components'

const Search = () => {
  return (
    <View>
      <StackHeader headerTextInput={true} />
      <FlatList
        data={[]}
        ListEmptyComponent={() => <EmptyList />}
        renderItem={() => <></>}
      />
    </View>
  )
}

export default Search
