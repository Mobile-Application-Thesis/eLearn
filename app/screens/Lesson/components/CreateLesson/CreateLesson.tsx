import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Alert, BackHandler } from 'react-native'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import ImagePicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'
import PushNotification from 'react-native-push-notification'
import { Icon } from 'react-native-elements'
import { StackNavigationProp } from '@react-navigation/stack'
import { Avatar } from 'react-native-paper'

import { useTheme } from './../../../../contexts/ThemeProvider'
import { useAuth } from '../../../../contexts/AuthProvider'
import { MainStackParamList } from '../../../../routes/types'
import { Button } from '../../../../components'
import styles from './styles'

type CreateLessonNav = StackNavigationProp<MainStackParamList, 'Create Lesson'>

interface Props {
  navigation: CreateLessonNav
}

const CreateLesson: React.FC<Props> = ({ navigation }) => {
  const editorRef = useRef<any>()
  const [htmlText, setHtmlText] = useState('')
  const [containerSize, setContainerSize] = useState(0)
  const [uploadProgress, setUploadProgress] = useState({
    uploading: false,
    progress: 0,
  })
  const [action, setAction] = useState(false)
  const { theme } = useTheme()
  const { user } = useAuth()
  const moreActions = 'moreActions'

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

  useEffect(() => {
    if (!uploadProgress.uploading) {
      PushNotification.removeAllDeliveredNotifications()
    }
  }, [uploadProgress])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.button, { color: theme.colors.primary }]}>
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
  }, [navigation, htmlText])

  const onBackPress = () => {
    if (htmlText.length !== 0) {
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
    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }, [htmlText])

  const addImage = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      mediaType: 'photo',
      compressImageQuality: 0.5,
    }).then(({ mime, data }) => {
      editorRef.current?.insertImage(`data:${mime};base64,${data}`)
    })
  }

  const addVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      compressImageQuality: 0.5,
    }).then(({ mime, path }) => {
      PushNotification.localNotification({
        channelId: user.id,
        message: 'Upload is in progress...',
      })
      // SimpleToast.show('Upload in progress...')
      const upload = storage()
        .ref(
          `users/${user.id}/uploads/lesson/${
            path.split('/')[path.split('/').length - 1]
          }`,
        )
        .putFile(path, {
          contentType: mime,
        })
      upload.on(
        'state_changed',
        (snapshot) => {
          setUploadProgress({
            uploading: true,
            progress: Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            ),
          })
          switch (snapshot.state) {
            case storage.TaskState.SUCCESS:
              setUploadProgress({
                uploading: false,
                progress: 0,
              })
              break
          }
        },
        () => {
          // Handle unsuccessful uploads
        },
        () => {
          upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
            PushNotification.localNotification({
              channelId: user.id,
              message: 'Upload success!',
            })
            editorRef.current?.insertVideo(downloadURL)
          })
        },
      )
    })
  }

  const openActions = () => setAction((prevState) => !prevState)

  return (
    <View style={styles.root}>
      <View
        onLayout={({ nativeEvent }) =>
          setContainerSize(nativeEvent.layout.height)
        }
        style={{
          backgroundColor: theme.colors.border,
          padding: 10,
          flexGrow: 1,
        }}>
        <RichEditor
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          onChange={(text) => setHtmlText(text)}
          style={{
            flex: 1,
            maxHeight: containerSize - (action ? 100 : 55),
          }}
          ref={editorRef}
        />
      </View>

      <View
        style={{
          width: '100%',
          backgroundColor: theme.colors.background,
          position: 'absolute',
          bottom: 0,
        }}>
        {action && (
          <RichToolbar
            editor={editorRef}
            iconTint="#949494"
            style={{
              backgroundColor: theme.colors.background,
            }}
            selectedIconTint={theme.colors.primary}
            iconMap={{
              [actions.heading1]: ({ tintColor }) => (
                <Text style={[styles.h2, { color: tintColor }]}>H1</Text>
              ),
              [actions.heading2]: ({ tintColor }) => (
                <Text style={[styles.h2, { color: tintColor }]}>H2</Text>
              ),
              [actions.heading3]: ({ tintColor }) => (
                <Text style={[styles.h2, { color: tintColor }]}>H3</Text>
              ),
              [actions.heading4]: ({ tintColor }) => (
                <Text style={[styles.h2, { color: tintColor }]}>H4</Text>
              ),
            }}
            actions={[
              actions.alignFull,
              actions.alignRight,
              actions.alignCenter,
              actions.setBold,
              actions.heading1,
              actions.heading2,
              actions.heading3,
              actions.heading4,
              actions.insertLine,
              actions.redo,
              actions.undo,
            ]}
          />
        )}
        <RichToolbar
          editor={editorRef}
          style={{
            backgroundColor: theme.colors.background,
          }}
          onPressAddImage={addImage}
          insertVideo={addVideo}
          moreActions={openActions}
          iconTint="#949494"
          selectedIconTint={theme.colors.primary}
          iconMap={{
            [actions.insertVideo]: ({ tintColor }) => (
              <Icon
                name="videocam-outline"
                type="ionicon"
                color={tintColor}
                size={28}>
                H2
              </Icon>
            ),
            moreActions: ({ tintColor }) => (
              <Icon
                name={action ? 'keyboard-arrow-up' : 'keyboard-arrow-left'}
                type="material"
                color={tintColor}
              />
            ),
          }}
          actions={[
            actions.insertImage,
            actions.insertVideo,
            actions.code,
            actions.blockquote,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.indent,
            actions.outdent,
            moreActions,
          ]}
        />
      </View>
    </View>
  )
}

export default CreateLesson
