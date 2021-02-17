import React, { useState, useEffect } from 'react'

import ActionsSheet, { ActionsSheetAction } from '../components/ActionsSheet'

export const ActionsModalContext = React.createContext({
  isVisible: false,
  openActions: () => {},
  hideActions: () => {},
  actions: [],
  setActions: () => {},
})

export const ActionsModalProvider = ({
  children,
  actions,
  title,
}: {
  children?
  actions?
  title?
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [internalActions, setActions] = useState([])
  const [activeItem, setActiveItem] = useState({
    isAlert: false,
    onPress: () => {},
    onModalHide: () => {},
  })
  const [loadingItem, setLoadingItem] = useState(null)

  const openActions = () => {
    setIsVisible(true)
    setActiveItem({})
  }

  const hideActions = () => {
    setIsVisible(false)
  }

  const updateActions = (newActions) => {
    setActions(newActions)
  }

  useEffect(() => {
    const onPressAction = (item) => async () => {
      setIsVisible(false)
      setActiveItem(item)
    }

    const onAlertPress = (item) => () => {
      item.onPress(
        () => {
          setLoadingItem(item)
        },
        () => {
          setLoadingItem(null)
          hideActions()
        },
      )
      setActiveItem(item)
    }

    if (actions) {
      setActions(
        actions.map((entry) => ({
          ...entry,
          onPress:
            entry.isAlert || entry.shouldWait
              ? onAlertPress(entry)
              : onPressAction(entry),
        })),
      )
    }
  }, [actions])

  return (
    <ActionsModalContext.Provider
      value={{
        isVisible,
        openActions,
        hideActions,
        actions: internalActions,
        setActions: updateActions,
      }}>
      <>
        {children}
        <ActionsSheet
          title={title}
          isVisible={isVisible}
          onClose={hideActions}
          contentBackground="#fff"
          data={internalActions}
          renderItem={({ item }) => {
            if (item.component) return item.component

            return (
              <ActionsSheetAction
                containerStyle={{
                  paddingHorizontal: 16,
                }}
                showLoading={loadingItem?.key === item.key}
                {...item}
              />
            )
          }}
          onModalHide={
            !activeItem.isAlert
              ? async () => {
                  await activeItem.onPress?.()
                  activeItem.onModalHide?.()
                }
              : () => null
          }
        />
      </>
    </ActionsModalContext.Provider>
  )
}
