import React from 'react'
import { View, FlatList } from 'react-native'

import { StackHeader, EmptyList } from 'eLearn/app/components'

const Search = () => {
  return (
    <View>
      <StackHeader headerTextInput={true} />
      <FlatList
        data={[]}
        ListEmptyComponent={() => <EmptyList title="Feature not available!" />}
      />
    </View>
  )
}

export default Search
