import React from 'react'
import { Alert, FlatList, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'

import { StackHeader } from 'eLearn/app/components'
import { useAuth } from 'eLearn/app/contexts/AuthProvider'
import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import { SettingsButton } from './components'
import styles from './styles'

const Settings = () => {
  const { userCredentials, signOut } = useAuth()
  const { darkMode, toggleDarkMode, theme } = useTheme()
  const flatListData = [
    {
      key: 'darkMode',
      label: 'Dark Mode',
      icon: 'theme-light-dark',
      color: '#fff',
      iconStyle: {
        backgroundColor: darkMode ? theme.colors.border : theme.colors.text,
      },
      switchButton: true,
      value: darkMode,
      onPress: toggleDarkMode,
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: 'shield-account',
      iconStyle: {
        backgroundColor: 'green',
      },
      onPress: () => {},
    },
    {
      key: 'signOut',
      label: 'Sign Out',
      icon: 'exit-to-app',
      iconStyle: {
        backgroundColor: theme.colors.notification,
      },
      onPress: Alert.alert.bind(
        this,
        '',
        'Are you sure you want to sign out?',
        [
          {
            text: 'Ok',
            style: 'destructive',
            onPress: signOut,
          },
          {
            text: 'Cancel',
          },
        ],
      ),
    },
  ]

  return (
    <View style={styles.root}>
      <StackHeader headerTitle="Settings" />
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.profileContainer}>
            <Avatar.Icon
              size={100}
              icon="bookshelf"
              style={{
                backgroundColor: '#2f426f',
              }}
            />
            <Text style={styles.profileText}>
              {userCredentials.displayName}
            </Text>
            <Text>{userCredentials.email}</Text>
          </View>
        )}
        data={flatListData}
        renderItem={({ item: { key, ...rest } }) => (
          <SettingsButton key={key} {...rest} />
        )}
      />
    </View>
  )
}

export default Settings
