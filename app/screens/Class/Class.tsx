import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { View, FlatList } from 'react-native'

import { FirebaseService } from '../../services/firebase.services'
import { Header, EmptyList, FloatingButton } from '../../components'
import { useAuth } from '../../contexts/AuthProvider'
import data from '../../constants/data'
import { ClassCard } from './components'
import styles from './styles'

const Class: React.FC = () => {
  const headerProps = {
    headerTitle: 'E-Learn',
  }
  const { user } = useAuth()
  const { navigate } = useNavigation()
  const [floatingButtonProps, setFloationButtonProps] = useState({
    onPress: () => {},
    name: '',
  })
  const [classList, setClassList] = useState([])

  useEffect(() => {
    if (user && user.role) {
      const unsubscribe = FirebaseService.getFBCollectionWhere({
        key: user.role,
        operator: 'array-contains',
        collection: 'class',
        value: user.id,
      }).onSnapshot((snapshot) => {
        var temp = []
        snapshot.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() })
        })
        setClassList(temp)
      })

      return unsubscribe
    }
  }, [user])

  useEffect(() => {
    if (user && user.role === data.role.teacher) {
      setFloationButtonProps({
        onPress: () => navigate('CreateClass'),
        name: 'Create a Class',
      })
    } else {
      setFloationButtonProps({
        onPress: () => {},
        name: 'Join a Class',
      })
    }
  }, [user])

  return (
    <View style={[styles.root]}>
      <Header {...headerProps} />
      <FloatingButton {...floatingButtonProps} />
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: 10,
          marginVertical: 10,
        }}
        data={classList}
        renderItem={({ item }) => <ClassCard key={item.id} {...item} />}
        ListEmptyComponent={() => (
          <EmptyList title="You don't have any class yet!" />
        )}
      />
    </View>
  )
}

export default Class
