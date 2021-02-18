import { StackScreenProps } from '@react-navigation/stack'

export declare type MainStackParamList = {
  Home: undefined
  Settings: undefined
  Search: undefined
  CreateClass: undefined
  Classroom: undefined
  'Create Lesson': {
    classId?: string
    lessonId?: string
  }
  'Lesson Details': {
    classId?: string
    htmlText?: string
    attachments?: Array<string>
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

export declare type CreateLessonProps = StackScreenProps<
  MainStackParamList,
  'Create Lesson'
>

export declare type LessonDetailsProps = StackScreenProps<
  MainStackParamList,
  'Lesson Details'
>
