import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/core'

import { useTheme } from '../../../../contexts/ThemeProvider'
import { useProfile } from '../../../../hooks'
import styles from './styles'

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
  const { name, description, teacher, student } = props
  const { theme } = useTheme()
  const { navigate } = useNavigation()
  const [instructor] = useProfile(teacher[0])

  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor: theme.colors.facebook }]}
      onPress={() => {}}>
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
