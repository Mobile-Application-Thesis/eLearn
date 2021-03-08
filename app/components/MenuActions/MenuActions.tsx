import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Appbar } from 'react-native-paper'
import { Icon } from 'react-native-elements'

import MenuProvider, {
  MenuActionType,
  MenuContext,
} from '../../contexts/MenuProvider'
import { useTheme } from './../../contexts/ThemeProvider'

interface Props {
  actions: MenuActionType[]
  iconColor?: string
  key?: string
  isHeaderAction?: boolean
  headerActionProps?: any
}

const MenuActions: React.FC<Props> = ({
  actions,
  iconColor,
  isHeaderAction,
  headerActionProps,
}) => {
  const { theme } = useTheme()
  return (
    <MenuProvider actions={actions}>
      <MenuContext.Consumer>
        {({ openMenu }) => {
          if (isHeaderAction)
            return (
              <Appbar.Action
                onPress={openMenu}
                color={theme.colors.facebook}
                icon="dots-vertical"
                {...headerActionProps}
              />
            )

          return (
            <TouchableOpacity onPress={openMenu}>
              <Icon
                name="dots-vertical"
                type="material-community"
                color={iconColor || theme.colors.primary}
              />
            </TouchableOpacity>
          )
        }}
      </MenuContext.Consumer>
    </MenuProvider>
  )
}

export default MenuActions
