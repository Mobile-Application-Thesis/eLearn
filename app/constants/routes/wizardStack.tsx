import { Wizard } from '../../screens'
import { StepOne, StepTwo } from '../../screens/Wizard/components'

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
