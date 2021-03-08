import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Alert,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import SimpleToast from 'react-native-simple-toast'
import { Avatar } from 'react-native-paper'

import { LessonDataTypes } from '../../../../constants/data'
import { FirebaseService } from './../../../../services/firebase.services'
import { HTMLView, Button } from './../../../../components'
import { LessonDetailsProps } from '../../../../routes/types'
import { useTheme } from './../../../../contexts/ThemeProvider'

import styles from './styles'

const LessonDetails: React.FC<LessonDetailsProps> = ({ navigation, route }) => {
  const { attachments, classId, htmlText, ...rest } = route.params
  const { theme } = useTheme()
  const [lessonTitle, setLessonTitle] = useState(
    route.params.lessonDetails?.title || '',
  )

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={route.params.lessonDetails ? updateLesson : createLesson}
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
      htmlContent: htmlText || '',
      attachments: attachments || [],
      externalLinks: [],
      assessmentId: '',
    }
    await FirebaseService.addFBDocToChildDoc({
      collection: 'class',
      docData: toSave,
      parentDoc: classId,
      endCollection: 'lesson',
    })
    SimpleToast.show('Successfully created!')
    navigation.navigate('Classroom')
  }
  const updateLesson = async () => {
    const toSave: LessonDataTypes = {
      ...route.params.lessonDetails,
      title: lessonTitle || '',
      htmlContent: htmlText || '',
      assessmentId: '',
    }
    await FirebaseService.updateFBChildData({
      collection: 'class',
      values: toSave,
      doc: classId,
      childCollection: 'lesson',
      childDoc: route.params.lessonDetails.lessonId,
    })
    SimpleToast.show('Successfully updated!')
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

      {htmlText && (
        <>
          <Text style={[styles.previewTitle, { marginBottom: 15 }]}>
            Content preview:
          </Text>
          <HTMLView htmlText={htmlText} {...rest} />
        </>
      )}
      {attachments && (
        <>
          <Text style={[styles.previewTitle, { marginBottom: 15 }]}>
            Attachments:
          </Text>
          <View>{attachments.map(({ link }) => console.log(link))}</View>
        </>
      )}
    </ScrollView>
  )
}

export default LessonDetails
