import React from 'react'
import { View, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import SimpleToast from 'react-native-simple-toast'
import { useNavigation } from '@react-navigation/core'

import { HTMLView } from './../../../../components'
import { useTheme } from '../../../../contexts/ThemeProvider'
import data, { LessonDataTypes } from '../../../../constants/data'
import { useAuth } from '../../../../contexts/AuthProvider'
import { FirebaseService } from '../../../../services/firebase.services'
import styles from './styles'
import MenuActions from '../../../../components/MenuActions'

interface Props extends LessonDataTypes {
  classId: string
}

const LessonCard: React.FC<Props> = ({
  title,
  htmlContent,
  classId,
  id,
  ...rest
}) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { navigate } = useNavigation()

  const deleteLesson = () =>
    Alert.alert(
      title,
      'Are you sure you? Assessment will be included. (If any)',
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await FirebaseService.deleteFBDocChild({
              parentCollection: 'class',
              doc: classId,
              childCollection: 'lesson',
              childDoc: id,
            })
            SimpleToast.show('Successfully deleted!')
          },
        },
        { text: 'Cancel' },
      ],
    )

  const editLesson = () =>
    navigate('Create Lesson', {
      classId: classId,
      lessonDetails: {
        lessonId: id,
        title: title,
        htmlContent: htmlContent,
        ...rest,
      },
    })

  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      onPress={() =>
        navigate('Lesson Viewer', {
          id: id,
          title: title,
          htmlContent: htmlContent,
          ...rest,
        })
      }>
      <View
        style={[
          styles.htmlPreviewContainer,
          theme.dark
            ? {
                ...styles.darkMode,
                borderColor: theme.colors.border,
              }
            : { backgroundColor: theme.colors.code },
        ]}>
        <Text
          style={[
            styles.preview,
            {
              color: theme.dark ? theme.colors.text : theme.colors.grey1,
            },
          ]}>
          Preview
        </Text>
        {user.role === data.role.teacher && (
          <View
            style={[
              {
                position: 'absolute',
                top: 15,
                right: 10,
              },
            ]}>
            <MenuActions
              actions={[
                { onPress: editLesson, title: 'Edit' },
                { onPress: deleteLesson, title: 'Delete' },
              ]}
            />
          </View>
        )}
        <HTMLView
          htmlText={htmlContent}
          containerStyle={{ marginTop: 15 }}
          preview={true}
        />
      </View>
      <View
        style={[
          styles.titleContainer,
          { backgroundColor: theme.colors.facebook },
          theme.dark
            ? {
                borderBottomWidth: 1,
                borderColor: theme.colors.border,
              }
            : {},
        ]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default LessonCard
