import React, { useState } from 'react'
import { View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { Text } from 'react-native-paper'
import SimpleToast from 'react-native-simple-toast'
import { ImageBackground } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'

import { useAuth } from '../../../../contexts/AuthProvider'
import { useTheme } from '../../../../contexts/ThemeProvider'
import data from '../../../../constants/data'
import { useProfile } from '../../../../hooks'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button } from './../../../../components'
const cardBackground = require('../../../../assets/class-card-background.jpg')

interface Props {
  id: string
  name: string
  description?: string
  classCode: string
  status: string
  teacher: string[]
}

const ClassCard: React.FC<Props> = (props) => {
  const { id, name, description, classCode, status, teacher } = props
  const { theme } = useTheme()
  const {
    user: { role },
  } = useAuth()
  const { navigate } = useNavigation()
  const [instructor] = useProfile(teacher[0])
  const [codeVisibility, setCodeVisibility] = useState(false)

  const copyToClipboard = () => {
    Clipboard.setString(classCode)
    SimpleToast.show('Copied to clipboard!')
  }

  return (
    <Button onPress={() => navigate('Classroom', props)}>
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
            <Text style={[styles.text, styles.name]}>{name}</Text>
            <Icon type="material-community" name="dots-vertical" color="#fff" />
          </View>
          <Text style={[styles.description]}>{description}</Text>
          <View style={styles.footer}>
            {role === data.role.teacher ? (
              <>
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
                      onPress={() =>
                        setCodeVisibility((prevState) => !prevState)
                      }
                    />
                  </View>
                </View>
                <Text
                  style={[
                    styles.text,
                    {
                      borderBottomWidth: 2,
                      borderBottomColor: status === 'open' ? '#48f727' : 'red',
                    },
                  ]}>
                  {status}
                </Text>
              </>
            ) : (
              <Text style={[styles.text]}>{instructor.fullName}</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </Button>
  )
}

ClassCard.defaultProps = {
  description: '',
}

export default ClassCard
