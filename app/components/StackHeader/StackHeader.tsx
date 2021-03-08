import React from 'react'
import { TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { useTheme } from '../../contexts/ThemeProvider'

import styles from './styles'
interface Actions {
  icon?: string
  iconColor?: string
  onPress?: () => void
  component?: React.ReactElement
}
interface Props extends TextInputProps {
  headerTitle?: string
  headerTextInput?: boolean
  textInputContainerStyle?: TextStyle
  containerStyle?: ViewStyle
  rightActions?: Actions[]
}

const StackHeader: React.FC<Props> = ({
  headerTitle,
  headerTextInput,
  textInputContainerStyle,
  containerStyle,
  rightActions = [],
  ...rest
}) => {
  const { goBack } = useNavigation()
  const { theme } = useTheme()

  return (
    <Appbar.Header
      style={[{ backgroundColor: theme.colors.background }, containerStyle]}>
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
      {rightActions.map(({ onPress, icon, iconColor, component }) => {
        if (component) return component

        return (
          <Appbar.Action
            key={icon}
            icon={icon}
            onPress={onPress}
            color={iconColor || theme.colors.primary}
          />
        )
      })}
    </Appbar.Header>
  )
}

StackHeader.defaultProps = {
  headerTitle: 'Title',
  headerTextInput: false,
}

export default StackHeader
