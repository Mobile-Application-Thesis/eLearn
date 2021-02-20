import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native'
import { Text } from 'react-native-paper'
import { Avatar } from 'react-native-paper'

import { LessonDataTypes } from '../../../../constants/data'
import { FirebaseService } from './../../../../services/firebase.services'
import { HTMLView, Button } from './../../../../components'
import { LessonDetailsProps } from '../../../../routes/types'
import { useTheme } from './../../../../contexts/ThemeProvider'
import { useAuth } from '../../../../contexts/AuthProvider'

import styles from './styles'

const LessonDetails: React.FC<LessonDetailsProps> = ({ navigation, route }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [lessonTitle, setLessonTitle] = useState('')

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => createLesson()}
          disabled={lessonTitle.length === 0}>
          <Text
            style={[
              styles.button,
              {
                color:
                  lessonTitle.length === 0
                    ? theme.dark
                      ? '#43484d'
                      : theme.colors.text
                    : theme.colors.primary,
                fontWeight: lessonTitle.length === 0 ? '100' : '700',
              },
            ]}>
            save
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <Button style={{ marginLeft: 7 }} onPress={onBackPress}>
          <Avatar.Icon
            color={theme.colors.text}
            icon="arrow-left"
            size={40}
            style={{ backgroundColor: 'transparent' }}
          />
        </Button>
      ),
    })
  }, [navigation, lessonTitle])

  const onBackPress = () => {
    if (lessonTitle.length !== 0) {
      Alert.alert('Discard changes?', 'Are you sure?', [
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'Cancel',
        },
      ])
    } else {
      navigation.goBack()
    }
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    )
    return () => backHandler.remove()
  }, [lessonTitle])

  const createLesson = async () => {
    const toSave: LessonDataTypes = {
      title: lessonTitle || '',
      htmlContent: route.params.htmlText || '',
      attachments: [],
      externalLinks: [],
      assessmentId: '',
      createdBy: user.id,
    }
    await FirebaseService.addFBDocToChildDoc({
      collection: 'class',
      docData: toSave,
      parentDoc: route.params.classId,
      endCollection: 'lesson',
    })

    navigation.navigate('Classroom')
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.previewTitle}>Lesson Title:</Text>
      <TextInput
        value={lessonTitle}
        onChangeText={(text) => setLessonTitle(text)}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.primary,
          color: theme.colors.text,
        }}
      />
      {route.params.htmlText && (
        <>
          <Text style={[styles.previewTitle, { marginBottom: 10 }]}>
            Content preview:
          </Text>
          <HTMLView {...route.params} />
        </>
      )}
    </ScrollView>
  )
}

export default LessonDetails
