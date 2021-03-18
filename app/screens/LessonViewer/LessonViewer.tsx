import React, { useState, useEffect } from 'react'
import { View, Animated, ScrollView } from 'react-native'

import { HTMLView, StackHeader } from '../../components'
import { useTheme } from './../../contexts/ThemeProvider'
import { LessonViewerProps } from '../../routes/types'
import styles from './styles'
import { useAuth } from '../../contexts/AuthProvider'
import data from '../../constants/data'
import MenuActions from '../../components/MenuActions'
import { useNavigation } from '@react-navigation/core'

const LessonViewer: React.FC<LessonViewerProps> = ({
  route: {
    params: { htmlContent, title, assessmentId, id },
  },
}) => {
  const { theme } = useTheme()
  const { navigate } = useNavigation()
  const { user } = useAuth()
  const [containerHeight, setContainerHeight] = useState(0)
  const scrollY = new Animated.Value(0)
  const translateY = Animated.diffClamp(
    scrollY,
    0,
    containerHeight,
  ).interpolate({
    inputRange: [0, containerHeight],
    outputRange: [0, -containerHeight],
  })
  const [action, setAction] = useState([])

  useEffect(() => {
    if (user.role === data.role.teacher && !assessmentId) {
      setAction((prevState) => [
        ...prevState,
        {
          onPress: () => navigate('Assessment'),
          title: 'Add Exam',
          icon: 'text-box-plus-outline',
        },
      ])
    } else if (user.role === data.role.teacher && assessmentId) {
      setAction((prevState) => [
        ...prevState,
        {
          onPress: () => navigate('Assessment'),
          title: 'Edit Exam',
          icon: 'text-box-plus-outline',
        },
      ])
    } else if (user.role === data.role.student && assessmentId) {
      setAction((prevState) => [
        ...prevState,
        {
          onPress: () => navigate('Assessment'),
          title: 'Take Exam',
          icon: 'text-box-plus-outline',
        },
      ])
    }
  }, [user])

  const headerProps = {
    headerTitle: title,
    rightAction: () => (
      <MenuActions key={id} actions={action} isHeaderAction={true} />
    ),
  }

  return (
    <View style={styles.root}>
      <Animated.View
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
        style={[
          {
            transform: [
              {
                translateY: translateY,
              },
            ],
          },
          styles.header,
        ]}>
        <StackHeader {...headerProps} />
      </Animated.View>
      <ScrollView
        onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}>
        <HTMLView
          htmlText={htmlContent}
          containerStyle={{ ...styles.content, marginTop: containerHeight }}
        />
      </ScrollView>
    </View>
  )
}

export default LessonViewer
