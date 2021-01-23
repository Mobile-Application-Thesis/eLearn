import React, { useRef, useState } from 'react'
import { TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { Icon } from 'react-native-elements'

import { useTheme } from 'eLearn/app/contexts/ThemeProvider'

import styles, { styleObj } from './styles'

export default function ({
  containerProps = {},
  containerStyle = {},
  textInputStyle = {},
  rightIcon = {},
  leftIcon = {},
  ...rest
}) {
  const { theme } = useTheme()
  const [containerSize, setContainerSize] = useState(0)
  const [leftIconSize, setLeftIconSize] = useState(0)
  const textInput = useRef(null)
  return (
    <TouchableWithoutFeedback onPress={() => textInput.current.focus()}>
      <View
        onLayout={(e) => setContainerSize(e.nativeEvent.layout.width)}
        style={[styles.root, containerStyle]}
        {...containerProps}>
        <Icon
          onLayout={(e) => setLeftIconSize(e.nativeEvent.layout.width)}
          {...leftIcon}
        />
        <TextInput
          ref={textInput}
          style={[
            {
              color: theme.colors.primary,
              width:
                containerSize -
                styleObj.paddingHorizontal * 2 -
                leftIconSize -
                24,
            },
            styles.textInput,
            textInputStyle,
          ]}
          {...rest}
        />
        <Icon {...rightIcon} />
      </View>
    </TouchableWithoutFeedback>
  )
}
