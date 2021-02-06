import React, { useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import SimpleToast from 'react-native-simple-toast'

import { FirebaseService } from 'eLearn/app/services/firebase.services'
import { useForm } from 'eLearn/app/contexts/FormAuthProvider'
import { useAuth } from 'eLearn/app/contexts/AuthProvider'
import { StackHeader } from 'eLearn/app/components'
import { TextInput, Button } from 'eLearn/app/components'
import { CreateClassForm } from 'eLearn/app/constants/forms'
import ErrorHandler from 'eLearn/app/utils/errorHandler'
import styles from './styles'

const CreateClass = () => {
  const [formInput, setFormInput] = useState({})
  const { goBack } = useNavigation()
  const { user } = useAuth()
  const { formErrors, setError, clearError, handleSubmit } = useForm()
  const onChangeText = (name, value) => {
    value && clearError(name)
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const submitCreateClass = async (data) => {
    const response = await FirebaseService.addFBDoc({
      docData: {
        ...data,
        classCode: Math.random().toString(36).substr(2, 8),
        teacher: [user.id],
        student: [],
        status: 'open',
      },
      collection: 'class',
    })

    if (!response.data) {
      return ErrorHandler(response)
    }
    SimpleToast.show(`Created class ${formInput.name}`)
    goBack()
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
