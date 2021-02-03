import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import styles from './styles'

import { Header, EmptyList, FloatingButton } from 'eLearn/app/components'
import { useAuth } from 'eLearn/app/contexts/AuthProvider'
import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import { userRole } from 'eLearn/app/constants/data'
import { ClassCard } from './components'

const Class = () => {
  const headerProps = {
    headerTitle: 'E-Learn',
  }
  const {
    userCredentials: { role },
  } = useAuth()
  const { gridView } = useTheme()
  const { navigate } = useNavigation()
  const [floatingButtonProps, setFloationButtonProps] = useState({
    onPress: () => {},
    name: 'button',
  })

  useEffect(() => {
    if (role === userRole.teacher) {
      setFloationButtonProps({
        onPress: () => navigate('CreateClass'),
        name: 'Create a class',
      })
    } else {
      setFloationButtonProps({
        onPress: () => {},
        name: 'Join a Class',
      })
    }
  }, [role])

  return (
    <View style={styles.root}>
      <Header {...headerProps} />
      <FloatingButton {...floatingButtonProps} />

      <FlatList
        key={gridView ? 'grid' : 'vertical'}
        numColumns={gridView ? 2 : 1}
        data={tempData}
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
]

export default Class
