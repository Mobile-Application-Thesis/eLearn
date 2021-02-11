import React, { useState } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './styles'
import { emailRegex } from '../../constants/regex'
import { useTheme } from '../../contexts/ThemeProvider'
import { useAuth } from '../../contexts/AuthProvider'
import { useForm } from '../../contexts/FormAuthProvider'
import { TextInput, Button } from '../../components'
import { SignInForm } from '../../constants/forms'

const professorImage = require('../../assets/undraw_professor.png')

const SignIn: React.FC = () => {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  })
  const { navigate } = useNavigation()
  const { formErrors, setError, clearError, handleSubmit, reset } = useForm()
  const { theme } = useTheme()
  const { initializing, signIn } = useAuth()

  const onChangeText = (name: string, value: string) => {
    if (name === 'email') {
      emailRegex.test(value) ? clearError('email') : setError('email')
    }
    if (name === 'password') {
      value.length > 5 ? clearError('password') : setError('password')
    }
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const callback = () => {
    !formInput.email && setError('email')
    !formInput.password && setError('password')

    return !!(formInput.email && formInput.password)
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.root}>
      <Image source={professorImage} style={styles.image} />
      <View style={styles.breakLine} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>A Mobile Learning Platform</Text>
      </View>
      <View style={styles.breakLine} />
      <View style={styles.breakLine} />

      <View style={{ width: '100%' }}>
        {SignInForm.map(({ name, label, secureTextEntry = false }) => (
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
          />
        ))}

        <View style={styles.breakLine} />
        <View style={styles.breakLine} />
        <Button
          style={[styles.button]}
          onPress={() => handleSubmit(signIn.bind(this, formInput), callback)}>
          <Text style={[styles.buttonText]}>Sign In</Text>
        </Button>
      </View>

      <View style={styles.breakLine} />
      <View style={styles.textContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigate('SignUp')
            reset()
          }}>
          <Text style={[styles.highLight, { color: theme.colors.primary }]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.breakLine} />
      <ActivityIndicator
        animating={initializing}
        color={theme.colors.primary}
        size={24}
      />
    </KeyboardAwareScrollView>
  )
}

export default SignIn
