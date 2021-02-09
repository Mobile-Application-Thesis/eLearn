import React from 'react'
import {
  GestureResponderEvent,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'
import { Avatar, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { useTheme } from '../../contexts/ThemeProvider'
import styles from './styles'

interface Actions {
  style?: ViewStyle
  onPress?: (event: GestureResponderEvent) => void
  icon: IconSource
}

interface Props {
  headerTitle?: string
  rightActions?: Actions[]
}

const Header: React.FC<Props> = ({ headerTitle, rightActions }) => {
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
        {rightActions.map(({ style, onPress, icon, ...rest }) => (
          <TouchableOpacity onPress={onPress}>
            <Avatar.Icon
              key={`${icon}`}
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
      </View>
    </View>
  )
}

Header.defaultProps = {
  headerTitle: 'Header Title',
  rightActions: [],
}

export default Header
