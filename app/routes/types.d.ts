import { StackScreenProps } from '@react-navigation/stack'

export declare type MainStackParamList = {
  Home: undefined
  Settings: undefined
  Search: undefined
  CreateClass: undefined
  Classroom: undefined
  'Create Lesson': {
    lessonId?: string
  }
}

export declare type HomeTabParamList = {
  Class: undefined
  Discover: undefined
}

export declare type ClassroomTabParamList = {
  Lesson: undefined
  Members: undefined
}

export declare type CreateLessonNav = StackScreenProps<
  MainStackParamList,
  'Create Lesson'
>
