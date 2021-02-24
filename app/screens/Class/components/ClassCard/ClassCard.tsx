import React from 'react'
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

interface Props {
  id: string
  name: string
  description?: string
  classCode: string
  status: string
  teacher: string[]
}

const ClassCard: React.FC<Props> = (props) => {
  const { name, description, status, teacher } = props
  const { theme } = useTheme()
  const {
    user: { role },
  } = useAuth()
  const { navigate } = useNavigation()
  const [instructor] = useProfile(teacher[0])

  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor: theme.colors.facebook }]}
      onPress={() => navigate('Classroom', props)}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={[styles.text, styles.name]}>{name}</Text>
          <Icon type="material-community" name="dots-vertical" color="#fff" />
        </View>
        <Text style={[styles.description]}>{description}</Text>
        <View style={styles.footer}>
          {role === data.role.teacher ? (
            <>
              <View />
              <Text
                style={[
                  styles.text,
                  {
                    borderBottomWidth: 2,
                    borderBottomColor:
                      status === 'open'
                        ? theme.colors.success
                        : theme.colors.warning,
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
    </TouchableOpacity>
  )
}

ClassCard.defaultProps = {
  description: '',
}

export default ClassCard
