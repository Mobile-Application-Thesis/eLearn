import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import styles from './styles'

const Header = ({ headerTitle = 'Header Title', rightActions = [] }) => {
  const { theme } = useTheme()
  const { navigate } = useNavigation()

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <View style={styles.leftContainer}>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
          {headerTitle}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => navigate('Settings')}>
          <Avatar.Icon
            size={theme.icons.size.small}
            color={theme.colors.primary}
            icon="cog-outline"
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.border,
              },
            ]}
          />
        </TouchableOpacity>
        {rightActions.map(({ style, onPress, ...rest }) => (
          <TouchableOpacity onPress={onPress}>
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
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default Header
