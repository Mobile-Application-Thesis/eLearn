import React from 'react'

import {
  ActionsModalProvider,
  ActionsModalContext,
} from '../../contexts/ActionsModalContext'

declare type Actions = {
  shouldWait: true | false
  onPress?: () => void
  key: string
  label: string
  icon?: {
    name: string
    type: 'material-community' | 'material'
  }
}

const MoreActions: React.FC<{
  actions: Actions[]
  children: ({ openActions }: { openActions: () => void }) => React.ReactNode
}> = ({ actions, children }) => {
  return (
    <ActionsModalProvider actions={actions}>
      <ActionsModalContext.Consumer>
        {({ openActions }) => children({ openActions })}
      </ActionsModalContext.Consumer>
    </ActionsModalProvider>
  )
}

export default MoreActions
