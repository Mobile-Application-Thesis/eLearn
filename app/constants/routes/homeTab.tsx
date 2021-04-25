import Class from '../../screens/Class'
import Discover from '../../screens/Discover'

const homeTab = [
  {
    name: 'Class',
    component: Class,
    options: {
      icon: {
        name: 'google-classroom',
        type: 'material-community',
        size: 25,
      },
    },
  },
  // {
  //   name: 'Discover',
  //   component: Discover,
  //   options: {
  //     icon: {
  //       name: 'compass',
  //       type: 'font-awesome-5',
  //       size: 25,
  //     },
  //   },
  // },
]

export default homeTab
