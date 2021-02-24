import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import Clipboard from '@react-native-clipboard/clipboard'
import SimpleToast from 'react-native-simple-toast'

import { useTheme } from './../../../../contexts/ThemeProvider'
import { ClassroomTabContextTypes } from '../../../../routes/types'
import styles from './styles'

const ClassHeader: React.FC<ClassroomTabContextTypes> = ({
  name,
  description,
  classCode,
}) => {
  const [codeVisibility, setCodeVisibility] = useState(false)
  const { theme } = useTheme()

  const copyToClipboard = () => {
    Clipboard.setString(classCode)
    SimpleToast.show('Copied to clipboard!')
  }
  return (
    <>
      <View style={[styles.root, { backgroundColor: theme.colors.facebook }]}>
        <View style={styles.content}>
          <Text style={[styles.text, styles.name]}>{name}</Text>
          <Text style={[styles.description]}>{description}</Text>
          <View style={styles.footer}>
            <View style={[styles.classCodeContainer]}>
              <Text style={[styles.text]}>Class Code: </Text>
              <TouchableOpacity onPress={copyToClipboard}>
                <Text
                  style={[
                    styles.classCode,
                    {
                      backgroundColor: theme.dark
                        ? theme.colors.primary
                        : theme.colors.background,
                      color: theme.dark
                        ? theme.colors.background
                        : theme.colors.primary,
                    },
                  ]}>
                  {codeVisibility ? classCode : '********'}
                </Text>
              </TouchableOpacity>
              <View style={styles.icon}>
                <Icon
                  type="material-community"
                  name={codeVisibility ? 'eye-outline' : 'eye-off-outline'}
                  color="#fff"
                  size={16}
                  onPress={() => setCodeVisibility((prevState) => !prevState)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.lessonTitle, { color: theme.colors.primary }]}>
          Lessons:
        </Text>
      </View>
    </>
  )
}

export default ClassHeader
