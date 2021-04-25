import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage'
import PushNotification from 'react-native-push-notification'
import SimpleToast from 'react-native-simple-toast'
import RNFetchBlob from 'rn-fetch-blob'

import {
  Header,
  FloatingButton,
  EmptyList,
  MoreActions,
} from '../../components'
import { ClassHeader, LessonCard } from './components'

import { FirebaseService } from './../../services/firebase.services'
import { useAuth } from '../../contexts/AuthProvider'
import { useTheme } from '../../contexts/ThemeProvider'
import data, { LessonDataTypes } from './../../constants/data'
import styles from './styles'
import { classParams } from '../../routes/ClassroomTab'

interface Props {}

const Lesson: React.FC<Props> = () => {
  const [lessons, setLessons] = useState<LessonDataTypes[]>()
  const { user } = useAuth()
  const { theme } = useTheme()
  const { navigate } = useNavigation()
  const classDetails = classParams()

  PushNotification.configure({
    onNotification: (notification) => {
      notification.finish()
    },
    popInitialNotification: true,
    requestPermissions: true,
  })
  PushNotification.createChannel({
    channelId: user.id,
    channelName: `eLearn-${user.id}`,
    importance: 4,
  })

  const pickDocs = async () => {
    const document = await DocumentPicker.pick({
      type: [DocumentPicker.types.docx, DocumentPicker.types.pdf],
    })
    const stat = await RNFetchBlob.fs.readFile(document.uri, 'base64')
    const { name, type } = document
    const upload = storage()
      .ref(`users/${user.id}/uploads/documents/${Date.now() + '_' + name}`)
      .putString(stat, 'base64')

    SimpleToast.show('Upload inprogress!')
    upload.on(
      'state_changed',
      (snapshot) => {
        switch (snapshot.state) {
          case storage.TaskState.SUCCESS:
            break
        }
      },
      () => {
        SimpleToast.show('An error occured. please try again later.')
      },
      () => {
        upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
          PushNotification.localNotification({
            channelId: user.id,
            message: 'Upload success!',
          })
          navigate('Lesson Details', {
            attachments: [{ link: downloadURL, name: name, type: type }],
          })
        })
      },
    )
  }

  useEffect(() => {
    const unsubscribe = FirebaseService.getFBCollectionFromChildData({
      parentCollection: 'class',
      parentDoc: classDetails.id,
      endCollection: 'lesson',
    })
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        var temp: LessonDataTypes[] = []
        snapshot.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() })
        })
        setLessons(temp)
      })

    return unsubscribe
  }, [])

  return (
    <View style={styles.root}>
      <Header />
      {user.role === data.role.teacher && (
        <MoreActions
          actions={[
            {
              key: 'create',
              shouldWait: false,
              label: 'Open Editor',
              onPress: () =>
                navigate('Create Lesson', { classId: classDetails.id }),
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
            <FloatingButton
              name="Create Lesson"
              onPress={openActions}
              containerStyle={{
                borderWidth: 0.5,
                borderColor: theme.colors.background,
              }}
            />
          )}
        </MoreActions>
      )}

      <FlatList
        contentContainerStyle={styles.container}
        data={lessons}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ClassHeader {...classDetails} />}
        ListEmptyComponent={
          <EmptyList title="You don't have any Lessons yet!" />
        }
        renderItem={({ item }) => (
          <LessonCard {...item} classId={classDetails.id} />
        )}
      />
    </View>
  )
}

export default Lesson
