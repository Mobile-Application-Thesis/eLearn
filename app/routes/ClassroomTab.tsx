/* eslint-disable react-hooks/rules-of-hooks */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { FirebaseService } from '../services/firebase.services'
import { useTheme } from '../contexts/ThemeProvider'
import { BottomTabs } from '../components'
import classroomTab from '../constants/routes/classroomTab'

const TabContext = createContext<any>({})

export const classParams = () => useContext(TabContext)

const Tab = createBottomTabNavigator()

const ClassroomTab = ({ route: { params } }) => {
  const { theme } = useTheme()
  const [students, setStudents] = useState<any>()
  const [teachers, setTeachers] = useState<any>()

  useEffect(() => {
    if (params.student.length !== 0) {
      const unsubscribe = FirebaseService.getFBCollectionWhere({
        key: 'id',
        operator: 'in',
        collection: 'users',
        value: params.student,
      }).onSnapshot((snapshot) => {
        var temp = []
        snapshot.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() })
        })
        setStudents(temp)
      })

      return unsubscribe
    }
  }, [params])

  useEffect(() => {
    const unsubscribe = FirebaseService.getFBCollectionWhere({
      key: 'id',
      operator: 'in',
      collection: 'users',
      value: params.teacher,
    }).onSnapshot((snapshot) => {
      var temp = []
      snapshot.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() })
      })
      setTeachers(temp)
    })

    return unsubscribe
  }, [params])
  return (
    <TabContext.Provider value={{ ...params, teachers, students }}>
      <Tab.Navigator
        initialRouteName="Classroom"
        tabBar={(props) => <BottomTabs {...props} />}
        tabBarOptions={{
          activeBackgroundColor: theme.colors.background,
          inactiveBackgroundColor: theme.colors.background,
        }}>
        {classroomTab.map(({ name, ...rest }) => (
          <Tab.Screen key={name} name={name} {...rest} />
        ))}
      </Tab.Navigator>
    </TabContext.Provider>
  )
}

export default ClassroomTab
