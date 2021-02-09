import React, { useState } from 'react'
import { View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { Text } from 'react-native-paper'
import SimpleToast from 'react-native-simple-toast'
import { ImageBackground } from 'react-native'
import { Icon } from 'react-native-elements'
import cardBackground from 'eLearn/app/assets/class-card-background.jpg'
import PropTypes from 'prop-types'

import { useAuth } from 'eLearn/app/contexts/AuthProvider'
import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import { userRole } from 'eLearn/app/constants/data'
import { useProfile } from 'eLearn/app/hooks'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ClassCard = ({ id, name, description, classCode, status, teacher }) => {
  const { theme } = useTheme()
  const {
    user: { role },
  } = useAuth()
  const [instructor] = useProfile(teacher[0])
  const [codeVisibility, setCodeVisibility] = useState(false)

  const copyToClipboard = () => {
    Clipboard.setString(classCode)
    SimpleToast.show('Copied to clipboard!')
  }

  return (
    <ImageBackground
      source={cardBackground}
      imageStyle={{ borderRadius: 10 }}
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
          {role === userRole.teacher ? (
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
                    onPress={() => setCodeVisibility((prevState) => !prevState)}
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
  )
}

ClassCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  classCode: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  teacher: PropTypes.array.isRequired,
}

ClassCard.defaultProps = {
  description: '',
}

export default ClassCard
