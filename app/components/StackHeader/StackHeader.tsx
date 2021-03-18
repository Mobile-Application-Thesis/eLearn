import React, { ReactNode } from 'react'
import { TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import { useTheme } from '../../contexts/ThemeProvider'

import styles from './styles'
declare type Actions =
  | {
      icon?: string
      color?: string
      onPress?: () => void
    }
  | ReactNode
interface Props extends TextInputProps {
  headerTitle?: string
  headerTextInput?: boolean
  textInputContainerStyle?: TextStyle
  containerStyle?: ViewStyle
  rightAction?: Actions[] | ReactNode
  backHandler?: () => void
}

const StackHeader: React.FC<Props> = ({
  headerTitle,
  headerTextInput,
  textInputContainerStyle,
  containerStyle,
  rightAction = [],
  backHandler,
  ...rest
}) => {
  const { goBack } = useNavigation()
  const { theme } = useTheme()

  return (
    <Appbar.Header
      style={[{ backgroundColor: theme.colors.background }, containerStyle]}>
      <Appbar.Action
        icon="arrow-left"
        onPress={() => {
          if (backHandler) return backHandler()
          goBack()
        }}
        color={theme.colors.text}
      />

      {!headerTextInput ? (
        <Appbar.Content title={headerTitle} color={theme.colors.text} />
      ) : (
        <TextInput
          placeholder="Search"
          placeholderTextColor={theme.colors.primary}
          autoFocus
          style={[
            styles.textInput,
            { color: theme.colors.text },
            textInputContainerStyle,
          ]}
          {...rest}
        />
      )}
      {Array.isArray(rightAction)
        ? rightAction.map((action) => {
            if (action.icon)
              return (
                <Appbar.Action
                  key={action.icon}
                  icon={action.icon}
                  color={theme.colors.text}
                  {...action}
                />
              )

            return action()
          })
        : rightAction()}
    </Appbar.Header>
  )
}

StackHeader.defaultProps = {
  headerTitle: 'Title',
  headerTextInput: false,
}

export default StackHeader
