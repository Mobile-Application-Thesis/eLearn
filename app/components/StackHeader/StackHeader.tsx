import React from 'react'
import { Appbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { TextInput } from 'react-native'

import { useTheme } from '../../contexts/ThemeProvider'

import styles from './styles'

const StackHeader = ({ headerTitle, headerTextInput, textInputProps }) => {
  const { goBack } = useNavigation()
  const { theme } = useTheme()

  return (
    <Appbar.Header style={[{ backgroundColor: theme.colors.background }]}>
      <Appbar.Action
        icon="arrow-left"
        onPress={goBack}
        color={theme.colors.primary}
      />

      {!headerTextInput ? (
        <Appbar.Content title={headerTitle} color={theme.colors.primary} />
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

StackHeader.defaultProps = {
  headerTitle: 'Title',
  headerTextInput: false,
  textInputProps: {},
}

export default StackHeader
