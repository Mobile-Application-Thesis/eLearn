import SignIn from 'eLearn/app/screens/SignIn'
import SignUp from 'eLearn/app/screens/SignUp'

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
