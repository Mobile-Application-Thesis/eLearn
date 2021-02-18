import React, { useRef, useState } from 'react'
import {
  TextInput as Text,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import { Icon } from 'react-native-elements'

import { useTheme } from '../../contexts/ThemeProvider'

import styles from './styles'

interface Props extends React.Component<TextInputProps> {
  containerProps?: ViewProps
  containerStyle?: ViewStyle
  textInputStyle?: object
  rightIcon?
  leftIcon?
  multiline?: boolean
}

const TextInput = ({
  containerProps,
  containerStyle,
  textInputStyle,
  rightIcon,
  leftIcon,
  multiline = false,
  ...rest
}: Props) => {
  const { theme } = useTheme()
  const [containerSize, setContainerSize] = useState(0)
  const [leftIconSize, setLeftIconSize] = useState(0)
  const textInput = useRef(null)
  return (
    <TouchableWithoutFeedback onPress={() => textInput.current.focus()}>
      <View
        onLayout={(e) => setContainerSize(e.nativeEvent.layout.width)}
        style={[
          styles.root,
          containerStyle,
          {
            alignItems: multiline ? 'flex-start' : 'center',
          },
        ]}
        {...containerProps}>
        <Icon
          onLayout={(e) => setLeftIconSize(e.nativeEvent.layout.width)}
          {...leftIcon}
        />
        <Text
          ref={textInput}
          placeholderTextColor={theme.colors.primary}
          style={[
            {
              color: theme.colors.primary,
              width:
                containerSize - 15 * 2 - leftIconSize - (rightIcon ? 24 : 0),
            },
            textInputStyle,
          ]}
          multiline={multiline}
          {...rest}
        />
        <View style={{ paddingTop: multiline ? 8 : 0 }}>
          <Icon {...rightIcon} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default TextInput
