import React from 'react'
import { Appbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { TextInput } from 'react-native'

import { useTheme } from 'eLearn/app/contexts/ThemeProvider'

import styles from './styles'

const StackHeader = ({
  headerTitle = 'Title',
  headerTextInput = false,
  textInputProps = Object,
}) => {
  const { goBack } = useNavigation()
  const { theme } = useTheme()

  return (
    <Appbar.Header style={[{ backgroundColor: theme.colors.background }]}>
      <Appbar.Action icon="arrow-left" onPress={goBack} />

      {!headerTextInput ? (
        <Appbar.Content title={headerTitle} style={styles.title} />
      ) : (
        <TextInput
          placeholder="Search"
          placeholderTextColor={theme.colors.primary}
          autoFocus
          style={[
            styles.textInput,
            { color: theme.colors.primary },
            textInputProps.style,
          ]}
          {...textInputProps}
        />
      )}
    </Appbar.Header>
  )
}

export default StackHeader
