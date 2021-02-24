import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { HTMLView } from './../../../../components'
import { useTheme } from '../../../../contexts/ThemeProvider'
import { LessonDataTypes } from '../../../../constants/data'
import styles from './styles'

const LessonCard: React.FC<LessonDataTypes> = ({ title, htmlContent }) => {
  const { theme } = useTheme()
  const { navigate } = useNavigation()

  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      onPress={() => {}}>
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
        <HTMLView htmlText={htmlContent} preview={true} />
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
