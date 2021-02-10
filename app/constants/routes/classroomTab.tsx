import { Lesson, Members } from '../../screens'

const classroomTab = [
  // {
  //   name: 'Feeds',
  //   component: Feeds,
  //   options: {
  //     icon: {
  //       name: 'ios-grid',
  //       type: 'ionicon',
  //       size: 25,
  //     },
  //   },
  // },
  {
    name: 'Lesson',
    component: Lesson,
    options: {
      icon: {
        name: 'book',
        type: 'font-awesome-5',
        size: 25,
      },
    },
  },
  {
    name: 'Members',
    component: Members,
    options: {
      icon: {
        name: 'users',
        type: 'font-awesome-5',
        size: 25,
      },
    },
  },
]

export default classroomTab
