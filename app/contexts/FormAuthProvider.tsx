import React, { createContext, useContext, useState } from 'react'
import { FormAuthContextTypes } from './types'

const FormAuthContext = createContext<FormAuthContextTypes>({})

export const useForm = () => useContext(FormAuthContext)

const FormAuthProvider = ({ children }) => {
  const [formErrors, setFormErrors] = useState({})

  const setError = (name: string) => {
    setFormErrors((prevState) => ({ ...prevState, [name]: true }))
  }
  const clearError = (name: string) => {
    const data = formErrors
    delete data[name]
    setFormErrors(data)
  }

  const reset = () => setFormErrors({})

  const handleSubmit = (next: () => {}, callback: () => {}) => {
    if (callback() && JSON.stringify(formErrors) === JSON.stringify({})) {
      next()
    } else {
      callback()
    }
  }

  return (
    <FormAuthContext.Provider
      value={{ formErrors, setError, clearError, handleSubmit, reset }}>
      {children}
    </FormAuthContext.Provider>
  )
}

export default FormAuthProvider
