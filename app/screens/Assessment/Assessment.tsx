import React, { useState } from 'react'
import { View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-crop-picker'
import SimpleToast from 'react-native-simple-toast'

import { EmptyList, StackHeader } from '../../components'
import styles from './styles'
import { useTheme } from './../../contexts/ThemeProvider'
import { useAuth } from '../../contexts/AuthProvider'

declare type ExamForm = {
  id: number
  question: string
  type: 'mc' | 't/f'
  choices?: string[]
  answer: string
  image?: string
}

const Assessment: React.FC = () => {
  const { goBack } = useNavigation()
  const { theme } = useTheme()
  const { user } = useAuth()

  const [examForm, setExamForm] = useState<ExamForm[]>([])

  const headerProps = {
    headerTitle: 'Assessment',
    rightAction: () => (
      <TouchableOpacity onPress={() => {}} disabled={examForm.length === 0}>
        <Text
          style={[
            styles.button,
            {
              color:
                examForm.length === 0
                  ? theme.dark
                    ? '#43484d'
                    : theme.colors.text
                  : theme.colors.primary,
              fontWeight: examForm.length === 0 ? '100' : '700',
            },
          ]}>
          save
        </Text>
      </TouchableOpacity>
    ),
    backHandler: () => {
      if (examForm.length !== 0) {
        return Alert.alert('Discard changes?', 'Are you sure?', [
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => goBack(),
          },
          {
            text: 'Cancel',
          },
        ])
      }

      goBack()
    },
  }

  const addImage = () => {
    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      mediaType: 'photo',
      compressImageQuality: 0.5,
    }).then(({ mime, path }) => {
      SimpleToast.show('Upload is in progress...')
      const upload = storage()
        .ref(
          `users/${user.id}/uploads/lesson/image/${Date.now()}-${
            path.split('/')[path.split('/').length - 1]
          }`,
        )
        .putFile(path, {
          contentType: mime,
        })

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
            // editorRef.current?.insertVideo(downloadURL)
          })
        },
      )
    })
  }

  const addQuestion = () =>
    setExamForm((prevState) => [
      ...prevState,
      {
        id: 1,
        question: 'Are you alive?',
        type: 't/f',
        choices: ['true', 'false'],
        answer: 'true',
      },
    ])

  return (
    <View style={styles.root}>
      <StackHeader {...headerProps} />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={examForm}
        ListEmptyComponent={() => (
          <EmptyList title="Create your exam now!">
            <TouchableOpacity onPress={addQuestion}>
              <Text
                style={{
                  marginTop: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  borderRadius: 5,
                }}>
                Add Question
              </Text>
            </TouchableOpacity>
          </EmptyList>
        )}
        renderItem={() => <></>}
      />
    </View>
  )
}

export default Assessment
