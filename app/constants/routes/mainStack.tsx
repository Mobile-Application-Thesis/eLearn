import HomeTab from 'eLearn/app/routes/HomeTab'
import Search from 'eLearn/app/screens/Search'
import Settings from 'eLearn/app/screens/Settings'
import { CreateClass } from 'eLearn/app/screens/Class/components'

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
]

export default mainStack
