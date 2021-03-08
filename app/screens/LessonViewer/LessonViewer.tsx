import React, { useState } from 'react'
import { View, Animated, ScrollView, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

import { HTMLView, StackHeader } from '../../components'
import { useTheme } from './../../contexts/ThemeProvider'
import { LessonViewerProps } from '../../routes/types'
import styles from './styles'
import { useAuth } from '../../contexts/AuthProvider'
import data from '../../constants/data'
import MenuActions from '../../components/MenuActions'

const ActionButton: React.FC<{
  onPress: () => void
  name: string
}> = ({ name, onPress }) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      style={[styles.examButton, { backgroundColor: theme.colors.facebook }]}
      onPress={onPress}>
      <Text style={{ color: theme.colors.white }}>{name}</Text>
    </TouchableOpacity>
  )
}

const LessonViewer: React.FC<LessonViewerProps> = ({
  route: {
    params: { htmlContent, title, assessmentId, id },
  },
}) => {
  const { theme } = useTheme()
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

  const stackHeaderActions = [
    {
      component: (
        <MenuActions
          key={id}
          actions={[
            {
              onPress: () => {},
              title: 'Add Exam',
              icon: 'text-box-plus-outline',
            },
          ]}
          isHeaderAction={true}
        />
      ),
    },
  ]

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
        <StackHeader headerTitle={title} rightActions={stackHeaderActions} />
      </Animated.View>
      <ScrollView
        onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}>
        <View style={[styles.content, { marginTop: containerHeight }]}>
          <HTMLView htmlText={htmlContent} />

          {user.role === data.role.student && !!assessmentId && (
            <ActionButton onPress={() => {}} name="Take Assessment" />
          )}

          {user.role === data.role.teacher && !!assessmentId && (
            <ActionButton onPress={() => {}} name="View Assessment" />
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default LessonViewer
