import React, { createContext, useContext, useState } from 'react'
import Modal from 'react-native-modal'

const ModalContext = createContext({})

export const useModal = () => useContext(ModalContext)

const ModalProvider = ({ children }) => {
  const [isVisible, setModalVisibility] = useState(false)

  const toggleModal = () => setModalVisibility((prevState) => !prevState)

  return (
    <ModalContext.Provider value={{ toggleModal }}>
      <Modal isVisible={isVisible}>{children}</Modal>
    </ModalContext.Provider>
  )
}

export default ModalProvider
