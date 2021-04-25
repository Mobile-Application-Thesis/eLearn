import { StackScreenProps } from '@react-navigation/stack'
import { LessonDataTypes } from '../constants/data'
import { User } from '../contexts/types'

declare type Attachments = {
  link: string
  name: string
  type: string
}
declare type lessonDetails = {
  lessonId?: string
  assessmentId?: string
  attachments?: Attachments[]
  externalLinks?: string[]
  htmlContent?: string
  title?: string
}

export declare type MainStackParamList = {
  Home: undefined
  Settings: undefined
  Search: undefined
  CreateClass: undefined
  Classroom: undefined
  'Create Lesson': {
    classId?: string
    lessonDetails?: lessonDetails
  }
  'Lesson Details': {
    classId?: string
    htmlText?: string
    attachments?: Attachments[]
    lessonDetails?: lessonDetails
  }
  'Lesson Viewer': LessonDataTypes
  Assessment: {
    classId?: string
    lessonId?: string
    assessment?: any
    assessmentId?: string
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
export declare type LessonViewerProps = StackScreenProps<
  MainStackParamList,
  'Lesson Viewer'
>
export declare type AssessmentProps = StackScreenProps<
  MainStackParamList,
  'Assessment'
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
