import React, { useState } from 'react'
import { Pressable, PressableProps } from 'react-native'

const Button: React.FC<PressableProps> = ({ children, ...rest }) => {
  const [buttonSize, setButtonSize] = useState(0)
  return (
    <Pressable
      android_ripple={{
        radius: Math.round(buttonSize / 2),
      }}
      onLayout={(e) => setButtonSize(e.nativeEvent.layout.width)}
      {...rest}>
      {children}
    </Pressable>
  )
}

export default Button
