const data = {
  role: {
    student: 'student',
    teacher: 'teacher',
  },
}

declare type Attachments = {
  link: string
  name: string
  type: string
}

export declare type LessonDataTypes = {
  assessmentId?: string
  attachments?: Attachments[]
  externalLinks?: string[]
  htmlContent: string
  title: string
  id?: string
}

export default data
