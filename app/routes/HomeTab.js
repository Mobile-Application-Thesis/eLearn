import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import homeTab from 'eLearn/app/constants/routes/homeTab'
import { useTheme } from '../contexts/ThemeProvider'
import { BottomTabs } from '../components'

const Tab = createBottomTabNavigator()

const HomeTab = () => {
  const { theme } = useTheme()
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomTabs {...props} />}
      tabBarOptions={{
        activeBackgroundColor: theme.colors.background,
        inactiveBackgroundColor: theme.colors.background,
      }}>
      {homeTab.map(({ name, ...rest }) => (
        <Tab.Screen key={name} name={name} {...rest} />
      ))}
    </Tab.Navigator>
  )
}

export default HomeTab
