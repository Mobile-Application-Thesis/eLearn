import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { ImageBackground } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'

import { useAuth } from '../../../../contexts/AuthProvider'
import { useTheme } from '../../../../contexts/ThemeProvider'
import data from '../../../../constants/data'
import { useProfile } from '../../../../hooks'
import styles from './styles'
import { Button } from '../../../../components'
const cardBackground = require('../../../../assets/class-card-background.jpg')

interface Props {
  id?: string
  title?: string
  createdBy?: string
}

const LessonCard: React.FC<Props> = ({ id, title, createdBy }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { role } = data
  const { navigate } = useNavigation()
  const [instructor] = useProfile(createdBy)

  return (
    <Button onPress={() => {}}>
      <ImageBackground
        source={cardBackground}
        imageStyle={{ borderRadius: 5 }}
        key={id}
        style={[
          styles.root,
          {
            flex: 1,
            backgroundColor: theme.colors.border,
          },
        ]}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={[styles.text, styles.name]}>{title}</Text>
            <Icon type="material-community" name="dots-vertical" color="#fff" />
          </View>
          <Text style={[styles.description]}>{}</Text>
          <View style={styles.footer}>
            <Text />
          </View>
        </View>
      </ImageBackground>
    </Button>
  )
}

export default LessonCard
