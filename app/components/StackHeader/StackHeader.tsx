import React from 'react'
import { Appbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { TextInput, TextInputProps, TextStyle } from 'react-native'

import { useTheme } from '../../contexts/ThemeProvider'

import styles from './styles'

interface Props extends TextInputProps {
  headerTitle?: string
  headerTextInput?: boolean
  textInputContainerStyle?: TextStyle
}

const StackHeader: React.FC<Props> = ({
  headerTitle,
  headerTextInput,
  textInputContainerStyle,
  ...rest
}) => {
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
            textInputContainerStyle,
          ]}
          {...rest}
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
