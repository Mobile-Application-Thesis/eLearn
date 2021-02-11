import React, { useState } from 'react'
import { View, TouchableOpacity, Image, FlatList } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import styles from './styles'
import { emailRegex } from '../../constants/regex'
import { SignUpForm } from '../../constants/forms'
import { useTheme } from '../../contexts/ThemeProvider'
import { useAuth } from '../../contexts/AuthProvider'
import { TextInput, Button } from '../../components'
import { useForm } from '../../contexts/FormAuthProvider'

const professorImage = require('../../assets/undraw_professor.png')

const SignUp: React.FC = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    password: '',
    email: '',
    fullName: '',
    username: '',
    confirmPassword: '',
  })
  const { navigate } = useNavigation()
  const { formErrors, setError, clearError, handleSubmit, reset } = useForm()
  const { theme } = useTheme()
  const { initializing, signUp } = useAuth()

  const onChangeText = (name: string, value: string) => {
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
    <FlatList
      contentContainerStyle={styles.root}
      data={SignUpForm}
      scrollEnabled={true}
      removeClippedSubviews={false}
      ListHeaderComponent={
        <>
          <Image source={professorImage} style={styles.image} />
          <View style={styles.breakLine} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Create an Account</Text>
          </View>

          <View style={styles.breakLine} />
        </>
      }
      keyExtractor={({ name }) => name}
      renderItem={({ item: { name, label, secureTextEntry = false } }) => (
        <TextInput
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
      )}
      ListFooterComponent={
        <>
          <View style={styles.breakLine} />
          <View style={styles.breakLine} />
          <Button
            style={[styles.button]}
            onPress={() =>
              handleSubmit(signUp.bind(this, formInput), callback)
            }>
            <Text style={[styles.buttonText]}>Sign Up</Text>
          </Button>

          <View style={styles.breakLine} />
          <View style={styles.textContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigate('SignIn')
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
        </>
      }
    />
  )
}

export default SignUp
