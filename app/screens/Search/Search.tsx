import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'

import { StackHeader, EmptyList } from '../../components'
import { FirebaseService } from '../../services/firebase.services'
import { SearchCard } from './components'
import styles from './styles'

const Search: React.FC = () => {
  const [classList, setClassList] = useState([])
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const unsubscribe = FirebaseService.getFBCollectionData({
      collection: 'class',
    }).onSnapshot((snapshot) => {
      var temp = []
      snapshot.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() })
      })
      setClassList(temp)
    })

    return unsubscribe
  }, [])
  return (
    <View style={styles.root}>
      <StackHeader
        headerTextInput={true}
        onChangeText={(text) => setSearchInput(text)}
        value={searchInput}
      />
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={classList.filter((classDetails) => {
          if (searchInput !== '') {
            const regex = new RegExp(searchInput, 'i')
            if (regex.test(classDetails.name)) return classDetails

            return null
          }
          return classDetails
        })}
        ListEmptyComponent={() => <EmptyList title="No result." />}
        renderItem={({ item }) => <SearchCard key={item.id} {...item} />}
      />
    </View>
  )
}

export default Search
