import React, { createContext } from 'react'
import { Menu, Divider } from 'react-native-paper'

declare type Action = {
  onPress: () => void
  title: string
  shouldWait?: boolean
  icon?: string
}
export declare type MenuActionType = 'divider' | Action

interface Props {
  children: React.ReactNode
  actions: MenuActionType[]
}

declare type context = {
  openMenu?: () => void
}

export const MenuContext = createContext<context>({})

const MenuProvider: React.FC<Props> = ({ children, actions }) => {
  const [visible, setVisible] = React.useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  const handleOnPress = (action: Action) => {
    const { onPress, shouldWait = false } = action

    onPress()
    !shouldWait && closeMenu()
  }
  return (
    <MenuContext.Provider value={{ openMenu }}>
      <Menu visible={visible} onDismiss={closeMenu} anchor={children}>
        {actions.map((action, i) => {
          if (action === 'divider') return <Divider />

          return (
            <Menu.Item
              key={'menu-' + i}
              {...action}
              onPress={() => handleOnPress(action)}
            />
          )
        })}
      </Menu>
    </MenuContext.Provider>
  )
}

export default MenuProvider
