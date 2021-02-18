import React from 'react'
import { FlatList, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import DocumentPicker from 'react-native-document-picker'

import {
  Header,
  FloatingButton,
  EmptyList,
  MoreActions,
} from '../../components'
import { useAuth } from '../../contexts/AuthProvider'
import data from './../../constants/data'
import styles from './styles'
import { classParams } from '../../routes/ClassroomTab'

interface Props {}

const Lesson: React.FC<Props> = () => {
  const {
    user: { role },
  } = useAuth()
  const { navigate } = useNavigation()
  const { id } = classParams()

  const pickDocs = async () => {
    const document = await DocumentPicker.pick({
      type: [DocumentPicker.types.docx, DocumentPicker.types.pdf],
    })
    console.log(document.uri, document.type, document.name, document.size)
  }

  return (
    <View style={styles.root}>
      <Header />
      {role === data.role.teacher && (
        <MoreActions
          actions={[
            {
              key: 'create',
              shouldWait: false,
              label: 'Open Editor',
              onPress: () => navigate('Create Lesson', { classId: id }),
              icon: {
                name: 'file-document-edit-outline',
                type: 'material-community',
              },
            },
            {
              key: 'import',
              shouldWait: false,
              label: 'Import document',
              onPress: pickDocs,
              icon: {
                name: 'file-import-outline',
                type: 'material-community',
              },
            },
          ]}>
          {({ openActions }) => (
            <FloatingButton name="Create Lesson" onPress={openActions} />
          )}
        </MoreActions>
      )}

      <FlatList
        contentContainerStyle={styles.content}
        data={[]}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <EmptyList title="You don't have any Lessons yet!" />
        }
        renderItem={({}) => <Text>"</Text>}
      />
    </View>
  )
}

export default Lesson
