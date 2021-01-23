import React, { useState } from 'react'
import { View, TouchableOpacity, Pressable, Image } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './styles'
import { emailRegex } from 'eLearn/app/constants/regex'
import { useTheme } from 'eLearn/app/contexts/ThemeProvider'
import { useAuth } from 'eLearn/app/contexts/AuthProvider'
import { useForm } from 'eLearn/app/contexts/FormAuthProvider'
import { TextInput } from 'eLearn/app/components'
import { SignInForm } from 'eLearn/app/constants/forms'

import professorImage from 'eLearn/app/assets/undraw_professor.png'

const SignIn = ({ navigation }) => {
  const [formInput, setFormInput] = useState({})
  const { formErrors, setError, clearError, handleSubmit, reset } = useForm()
  const { theme } = useTheme()
  const { initializing, signIn } = useAuth()

  const onChangeText = (name, value) => {
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
        <Pressable
          style={[styles.button]}
          onPress={() => handleSubmit(signIn.bind(this, formInput), callback)}>
          <Text style={[styles.buttonText]}>Sign In</Text>
        </Pressable>
      </View>

      <View style={styles.breakLine} />
      <View style={styles.textContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp')
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
