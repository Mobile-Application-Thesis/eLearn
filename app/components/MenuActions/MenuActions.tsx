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
  icon?: string
  iconColor?: string
  key?: string
  isHeaderAction?: boolean
  headerActionProps?: any
}

const MenuActions: React.FC<Props> = ({
  actions,
  iconColor,
  icon,
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
                color={theme.colors.text}
                icon={icon}
                {...headerActionProps}
              />
            )

          return (
            <TouchableOpacity onPress={openMenu}>
              <Icon
                name={icon}
                type="material-community"
                color={iconColor || theme.colors.text}
              />
            </TouchableOpacity>
          )
        }}
      </MenuContext.Consumer>
    </MenuProvider>
  )
}

MenuActions.defaultProps = {
  icon: 'dots-vertical',
}

export default MenuActions
