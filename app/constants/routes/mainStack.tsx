import HomeTab from '../../routes/HomeTab'
import Search from '../../screens/Search'
import Settings from '../../screens/Settings'
import { CreateClass } from '../../screens/Class/components'
import ClassroomTab from '../../routes/ClassroomTab'
import { CreateLesson } from './../../screens/Lesson/components'

const mainStack = [
  {
    name: 'Home',
    component: HomeTab,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Settings',
    component: Settings,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Search',
    component: Search,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'CreateClass',
    component: CreateClass,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Classroom',
    component: ClassroomTab,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Create Lesson',
    component: CreateLesson,
    options: {
      headerShown: true,
      headerTitle: 'Editor',
    },
  },
]

export default mainStack
