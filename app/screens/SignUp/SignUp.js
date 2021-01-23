import React, { useState } from 'react'
import { View, TouchableOpacity, Pressable, Image } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './styles'
import { emailRegex } from 'eLearn/app/constants/regex'
import { SignUpForm } from 'eLearn/app/constants/forms'
import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import { useAuth } from 'eLearn/app/contexts/AuthProvider'
import { TextInput } from 'eLearn/app/components'
import { useForm } from 'eLearn/app/contexts/FormAuthProvider'

import professorImage from 'eLearn/app/assets/undraw_professor.png'

const SignUp = ({ navigation }) => {
  const [formInput, setFormInput] = useState({})
  const { formErrors, setError, clearError, handleSubmit, reset } = useForm()
  const { theme } = useTheme()
  const { initializing, signUp } = useAuth()

  const onChangeText = (name, value) => {
    if (name === 'email') {
      !emailRegex.test(value) ? setError(name) : clearError(name)
    } else if (name === 'password') {
      value.length < 6 ? setError(name) : clearError(name)
    } else if (name === 'confirmPassword') {
      value !== formInput.password ? setError(name) : clearError(name)
    } else {
      value && clearError(name)
    }
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const callback = () => {
    !formInput.email && setError('email')
    !formInput.password && setError('password')
    !formInput.fullName && setError('fullName')
    !formInput.username && setError('username')
    !formInput.confirmPassword && setError('confirmPassword')

    return !!(
      formInput.email &&
      formInput.password &&
      formInput.fullName &&
      formInput.username &&
      formInput.confirmPassword
    )
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.root}
      scrollEnabled={true}
      enableAutomaticScroll={true}>
      <Image source={professorImage} style={styles.image} />
      <View style={styles.breakLine} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Create an Account</Text>
      </View>

      <View style={styles.breakLine} />

      {SignUpForm.map(({ name, label, secureTextEntry = false }) => (
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
      <Pressable
        style={[styles.button]}
        onPress={() => handleSubmit(signUp.bind(this, formInput), callback)}>
        <Text style={[styles.buttonText]}>Sign Up</Text>
      </Pressable>

      <View style={styles.breakLine} />
      <View style={styles.textContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignIn')
            reset()
          }}>
          <Text style={[styles.highLight, { color: theme.colors.primary }]}>
            Sign in
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

export default SignUp
