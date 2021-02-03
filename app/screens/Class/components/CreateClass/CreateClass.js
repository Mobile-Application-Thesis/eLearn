import React, { useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { useForm } from 'eLearn/app/contexts/FormAuthProvider'
import { StackHeader } from 'eLearn/app/components'
import { TextInput, Button } from 'eLearn/app/components'
import { CreateClassForm } from 'eLearn/app/constants/forms'
import styles from './styles'

const CreateClass = () => {
  const [formInput, setFormInput] = useState({})
  const { formErrors, setError, clearError, handleSubmit, reset } = useForm()
  const onChangeText = (name, value) => {
    value && clearError(name)
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const submitCreateClass = (data) => {
    console.log('pasok')
  }
  const callback = () => {
    !formInput.name && setError('name')
    !formInput.description && setError('description')

    return !!(formInput.name && formInput.description)
  }
  return (
    <View style={styles.root}>
      <StackHeader headerTitle="Create a Class" />
      <View style={styles.content}>
        {CreateClassForm.map(
          ({ name, label, secureTextEntry = false, ...rest }) => (
            <TextInput
              key={name}
              placeholder={label}
              secureTextEntry={secureTextEntry}
              value={formInput[name]}
              onChangeText={(value) => onChangeText(name, value)}
              rightIcon={
                !!formErrors[name] && {
                  type: 'material-community',
                  name: 'close-thick',
                  color: 'red',
                }
              }
              {...rest}
            />
          ),
        )}

        <Button
          style={[styles.button]}
          onPress={() =>
            handleSubmit(submitCreateClass.bind(this, formInput), callback)
          }>
          <Text style={[styles.buttonText]}>Create</Text>
        </Button>
      </View>
    </View>
  )
}

export default CreateClass
