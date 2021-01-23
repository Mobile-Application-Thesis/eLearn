import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { StackHeader } from 'eLearn/app/components'

const Search = () => {
  return (
    <View>
      <StackHeader headerTextInput={true} />
      <Text>Search</Text>
    </View>
  )
}

export default Search
