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
  const {
    darkMode,
    toggleDarkMode,
    theme,
    gridView,
    toggleGridView,
  } = useTheme()
  const flatListData = [
    {
      key: 'darkMode',
      label: 'Dark Mode',
      icon: 'theme-light-dark',
      iconStyle: {
        backgroundColor: theme.colors.border,
      },
      switchButton: true,
      value: darkMode,
      onPress: toggleDarkMode,
    },
    {
      key: 'view',
      label: 'Class Grid View',
      icon: 'view-grid',
      iconStyle: {
        backgroundColor: theme.colors.border,
      },
      switchButton: true,
      value: gridView,
      onPress: toggleGridView,
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: 'account',
      iconStyle: {
        backgroundColor: theme.colors.border,
      },
      onPress: () => {},
    },
    {
      key: 'term&cond',
      label: 'Terms and Condition',
      icon: 'file-multiple',
      iconStyle: {
        backgroundColor: theme.colors.border,
      },
      onPress: () => {},
    },
    {
      key: 'privacyPolicy',
      label: 'Privacy Policy',
      icon: 'shield-account',
      iconStyle: {
        backgroundColor: theme.colors.border,
      },
      onPress: () => {},
    },
    {
      key: 'about',
      label: 'About',
      icon: 'information-variant',
      iconStyle: {
        backgroundColor: theme.colors.border,
      },
      onPress: () => {},
    },
    {
      key: 'signOut',
      label: 'Sign Out',
      icon: 'exit-to-app',
      iconStyle: {
        backgroundColor: theme.colors.border,
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
            <Text style={styles.profileText}>{userCredentials.fullName}</Text>
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
