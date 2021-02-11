import React, { useRef, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import ImagePicker from 'react-native-image-crop-picker'

import { useTheme } from './../../../../contexts/ThemeProvider'
import styles from './styles'

interface Props {}

const CreateLesson: React.FC<Props> = () => {
  const editorRef = useRef<any>()
  const scrollView = useRef<any>()
  const [htmlText, setHtmlText] = useState('')
  const [toolBarHeight, setToolBarHeight] = useState(0)
  const { theme } = useTheme()

  const addImage = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      compressImageQuality: 0.5,
    }).then((image: any) => {
      editorRef.current?.insertImage(`data:${image.mime};base64,${image.data}`)
    })
  }

  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollView}
        onContentSizeChange={() =>
          scrollView.current?.scrollToEnd({ animated: true })
        }
        style={{ marginBottom: toolBarHeight }}>
        <RichEditor
          onChange={(text) => setHtmlText(text)}
          style={{ flexGrow: 1 }}
          ref={editorRef}
        />
      </ScrollView>
      <View
        onLayout={(e) => setToolBarHeight(e.nativeEvent.layout.height)}
        style={{
          width: '100%',
          backgroundColor: theme.colors.background,
          position: 'absolute',
          bottom: 0,
        }}>
        <RichToolbar
          editor={editorRef}
          onPressAddImage={addImage}
          iconTint="#949494"
          selectedIconTint={theme.colors.primary}
          actions={[
            actions.insertImage,
            actions.code,
            actions.blockquote,
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.indent,
            actions.outdent,
          ]}
        />
      </View>
    </View>
  )
}

export default CreateLesson
