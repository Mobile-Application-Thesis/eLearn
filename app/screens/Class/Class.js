import React from 'react'
import { View, FlatList } from 'react-native'

import styles from './styles'

import { Header, EmptyList, FloatingButton } from 'eLearn/app/components'
import { ClassCard } from './components'

const Class = () => {
  const headerProps = {
    headerTitle: 'E-Learn',
  }
  return (
    <View style={styles.root}>
      <Header {...headerProps} />
      <FloatingButton name="Join a Class" />

      <FlatList
        numColumns={2}
        data={[]}
        renderItem={({ item }) => <ClassCard key={item.id} item={item} />}
        ListEmptyComponent={() => (
          <EmptyList title="You don't have any class yet!" />
        )}
      />
    </View>
  )
}

const tempData = [
  {
    id: 1,
    content: 'test 1',
  },
  {
    id: 2,
    content: 'test 2',
  },
  {
    id: 3,
    content: 'test 3',
  },
  {
    id: 4,
    content: 'test 4',
  },
  {
    id: 5,
    content: 'test 5',
  },
  {
    id: 6,
    content: 'test 6',
  },
  {
    id: 7,
    content: 'test 7',
  },
  {
    id: 8,
    content: 'test 8',
  },
  {
    id: 9,
    content: 'test 9',
  },
]

export default Class
