import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { useAuth } from 'eLearn/app/contexts/AuthProvider'
import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import styles from './styles'

const Header = ({ headerTitle = 'Header Title', rightActions = Array }) => {
  const { userCredentials } = useAuth()
  const { theme } = useTheme()
  const { navigate } = useNavigation()

  return (
    <View style={styles.root}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigate('Settings')}>
          <Avatar.Image
            size={theme.icons.size.small}
            source={{ uri: userCredentials.photoUrl }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>

      <View style={styles.rightContainer}>
        {rightActions.map(({ style, ...rest }) => (
          <Avatar.Icon
            key={rest.icon}
            size={theme.icons.size.small}
            color={theme.colors.primary}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.border,
              },
              style,
            ]}
            {...rest}
          />
        ))}
      </View>
    </View>
  )
}

export default Header
