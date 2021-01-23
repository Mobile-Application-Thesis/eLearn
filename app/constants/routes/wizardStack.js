import Wizard from 'eLearn/app/screens/Wizard'
import { StepOne, StepTwo } from 'eLearn/app/screens/Wizard/components'

const wizardStack = [
  {
    name: 'Wizard',
    component: Wizard,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'StepOne',
    component: StepOne,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'StepTwo',
    component: StepTwo,
    options: {
      headerShown: false,
    },
  },
]

export default wizardStack
