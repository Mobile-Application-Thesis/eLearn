import React from 'react'
import { Text } from 'react-native-paper'
import { Pressable, View, useWindowDimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { useTheme } from '../../contexts/ThemeProvider'
import styles from './styles'

const BottomTabs: React.FC<any> = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme()
  const { width } = useWindowDimensions()
  const focusedOptions = descriptors[state.routes[state.index].key].options

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 2,
        backgroundColor: theme.colors.background,
      }}>
      {state.routes.length > 1 &&
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          return (
            <Pressable
              key={label}
              android_ripple={{
                radius: Math.round(width / (state.routes.length + 2) + 4),
                borderless: true,
              }}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center', paddingTop: 5 }}>
              <>
                {/* <View
                style={[
                  styles.badgeContainer,
                  { backgroundColor: theme.colors.background },
                ]}>
                <Text
                  style={[
                    {
                      backgroundColor:
                        route.name === 'Chats'
                          ? theme.colors.notification
                          : 'green',
                      color: '#fff',
                    },
                    styles.badge,
                  ]}>
                  9
                </Text>
              </View> */}
                {options.icon && (
                  <Icon
                    {...options.icon}
                    color={isFocused ? theme.colors.primary : '#737373'}
                  />
                )}
                <Text
                  style={[
                    {
                      color: isFocused ? theme.colors.primary : '#737373',
                    },
                    styles.label,
                  ]}>
                  {label}
                </Text>
              </>
            </Pressable>
          )
        })}
    </View>
  )
}

export default BottomTabs
