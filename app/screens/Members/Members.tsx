import React from 'react'
import { FlatList, Image, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Header, EmptyList } from '../../components'
import { classParams } from '../../routes/ClassroomTab'
import { useTheme } from './../../contexts/ThemeProvider'
import styles from './styles'
import { useAuth } from './../../contexts/AuthProvider'

interface ItemProps {
  fullName: string
  avatar: string
  id: string
}

const Item: React.FC<ItemProps> = ({ fullName, avatar, id }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  return (
    <View style={styles.item}>
      <View style={styles.leftItemContent}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={[styles.name, { color: theme.colors.primary }]}>
          {fullName}
        </Text>
        <Text style={[styles.name, { marginLeft: 10 }]}>
          {user.id === id && '( me )'}
        </Text>
      </View>
    </View>
  )
}

const Members: React.FC = () => {
  const { name, teachers, students } = classParams()
  const { theme } = useTheme()

  return (
    <View style={styles.root}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.className}>{name}</Text>

        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={students}
          ListHeaderComponent={
            <FlatList
              data={teachers}
              ListHeaderComponent={
                <Text style={[styles.title, { color: theme.colors.primary }]}>
                  Teachers
                </Text>
              }
              renderItem={({ item }) => <Item key={item.id} {...item} />}
              ListFooterComponent={
                <Text style={[styles.title, { color: theme.colors.primary }]}>
                  Students
                </Text>
              }
            />
          }
          renderItem={({ item }) => <Item key={item.id} {...item} />}
          ListEmptyComponent={
            <EmptyList title="You don't have any student yet!" />
          }
        />
      </View>
    </View>
  )
}

export default Members
