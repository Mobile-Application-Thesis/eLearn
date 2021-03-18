import React from 'react'
import {
  GestureResponderEvent,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { useTheme } from '../../contexts/ThemeProvider'
import styles from './styles'

interface Actions {
  style?: ViewStyle
  onPress?: (event: GestureResponderEvent) => void
  icon: string
}

interface Props {
  headerTitle?: string
  rightActions?: Actions[]
  settings?: boolean
}

const Header: React.FC<Props> = ({ headerTitle, rightActions, settings }) => {
  const { theme } = useTheme()
  const { navigate } = useNavigation()

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <View style={styles.leftContainer}>
        <Text
          onPress={() => (headerTitle ? null : navigate('Home'))}
          style={[styles.headerTitle, { color: theme.colors.primary }]}>
          {headerTitle}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        {rightActions.map(({ style, onPress, icon, ...rest }) => (
          <TouchableOpacity key={icon} onPress={onPress}>
            <Avatar.Icon
              size={theme.icons.size.small}
              color={theme.colors.primary}
              style={[
                styles.button,
                {
                  backgroundColor: theme.colors.border,
                },
                style,
              ]}
              icon={icon}
              {...rest}
            />
          </TouchableOpacity>
        ))}
        {settings && (
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
        )}
      </View>
    </View>
  )
}

Header.defaultProps = {
  rightActions: [],
  headerTitle: 'E-Learn',
  settings: true,
}

export default Header
