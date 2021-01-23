import React, { createContext, useContext, useState } from 'react'

const FormAuthContext = createContext({})

export const useForm = () => useContext(FormAuthContext)

const FormAuthProvider = ({ children }) => {
  const [formErrors, setFormErrors] = useState({})

  const setError = (name) => {
    setFormErrors((prevState) => ({ ...prevState, [name]: true }))
  }
  const clearError = (name) => {
    const data = formErrors
    delete data[name]
    setFormErrors(data)
  }

  const reset = () => setFormErrors({})

  const handleSubmit = (next, callback) => {
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
