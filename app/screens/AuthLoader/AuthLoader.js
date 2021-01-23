import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Avatar, Text } from 'react-native-paper'

import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import styles from './styles'

const AuthLoader = () => {
  const { theme } = useTheme()
  return (
    <View style={styles.root}>
      <Avatar.Icon
        size={100}
        icon="bookshelf"
        style={{
          backgroundColor: theme.colors.primary,
        }}
      />
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        eLearn
      </Text>
      <Text style={styles.text}>A new way to learn!</Text>

      <ActivityIndicator
        animating={true}
        color={theme.colors.primary}
        size={30}
      />
    </View>
  )
}

export default AuthLoader
