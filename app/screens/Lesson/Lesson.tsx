import React from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { Header, FloatingButton, EmptyList } from '../../components'
import { useAuth } from '../../contexts/AuthProvider'
import data from './../../constants/data'
import styles from './styles'

interface Props {}

const Lesson: React.FC<Props> = () => {
  const {
    user: { role },
  } = useAuth()
  const { navigate } = useNavigation()
  const floatingButtonProps = {
    onPress: () => navigate('Create Lesson'),
    name: 'Create Lesson',
  }
  return (
    <View style={styles.root}>
      <Header />
      {role === data.role.teacher && (
        <FloatingButton {...floatingButtonProps} />
      )}

      <FlatList
        contentContainerStyle={styles.content}
        data={[]}
        keyExtractor={({ id }) => id}
        ListEmptyComponent={
          <EmptyList title="You don't have any Lessons yet!" />
        }
        renderItem={({}) => <Text>"</Text>}
      />
    </View>
  )
}

export default Lesson
