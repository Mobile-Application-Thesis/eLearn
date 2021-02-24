import { StackScreenProps } from '@react-navigation/stack'
import { User } from '../contexts/types'

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

export declare type ClassroomTabContextTypes = {
  id?: string
  classCode?: string
  description?: string
  name?: string
  status?: string
  students?: User[]
  teachers?: User[]
}
