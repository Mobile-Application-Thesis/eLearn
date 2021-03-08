import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'
import SimpleToast from 'react-native-simple-toast'
import prompt from 'react-native-prompt-android'

import { useTheme } from '../../../../contexts/ThemeProvider'
import { useProfile } from '../../../../hooks'
import styles from './styles'
import { FirebaseService } from '../../../../services/firebase.services'
import { useAuth } from '../../../../contexts/AuthProvider'

interface Props {
  id?: string
  name?: string
  description?: string
  classCode?: string
  status?: string
  teacher?: string[]
  student?: string[]
}

const SearchCard: React.FC<Props> = (props) => {
  const { name, description, teacher, student, classCode } = props
  const { theme } = useTheme()
  const { user } = useAuth()
  const { navigate } = useNavigation()
  const [instructor] = useProfile(teacher[0])

  const prompAlert = prompt.bind(
    this,
    `Join ${name}?`,
    'Enter class code below',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Join',
        onPress: async (code: string) => {
          if (code.length === 0) {
            return null
          }
          if (code === classCode) {
            const updated = { ...props, student: [...student, user.id] }
            await FirebaseService.updateFBData({
              values: updated,
              doc: props.id,
              collection: 'class',
            })
            return navigate('Classroom', updated)
          }
          SimpleToast.show('Wrong class code!')
        },
      },
    ],
  )

  const onPressAction = student.includes(user.id)
    ? navigate.bind(this, 'Classroom', props)
    : prompAlert

  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor: theme.colors.facebook }]}
      onPress={onPressAction}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={[styles.text, styles.name]}>{name}</Text>
        </View>
        <Text style={[styles.description]}>{description}</Text>
        <View style={styles.footer}>
          <Text style={[styles.text]}>{instructor.fullName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="users" type="font-awesome-5" size={16} color="#fff" />
            <Text style={[styles.text, { marginLeft: 5 }]}>
              {student.length}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

SearchCard.defaultProps = {
  description: '',
}

export default SearchCard
