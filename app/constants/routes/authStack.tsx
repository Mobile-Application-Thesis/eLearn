import SignIn from '../../screens/SignIn'
import SignUp from '../../screens/SignUp'

const mainStack = [
  {
    name: 'SignIn',
    component: SignIn,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SignUp',
    component: SignUp,
    options: {
      headerShown: false,
    },
  },
]

export default mainStack
